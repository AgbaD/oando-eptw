import useForm from "../../../../hooks/use-form";
import * as Yup from "yup";
import UploadDocument from "../../../ui/form/upload";
import { usePermitContext } from "../../../../context/permit.context";
import Button from "../../../ui/button";

import { useState } from "preact/hooks";

export default function Documents() {
  const { state, send } = usePermitContext();
  const { setFieldValue, getFieldProps, handleSubmit } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema,
  });

  const selectedPreviously: any = state.context.selected_documents;

  const [uploadedURLs, setUploadedURLs] = useState({});

  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({
      ...prev,
      [key]: url,
    }));
  }

  const excludedKeys = [
    "document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc",
    "document_WorkProcedureDocMethodStatementDoc",
  ];

  const onlineDocuments = Object.keys(selectedPreviously)
    .filter(
      (key) =>
        key.startsWith("document_") &&
        selectedPreviously[key] === "manual" &&
        !excludedKeys.includes(key)
    )
    .map((key) => ({
      key,
      label: key.replace("document_", "").replace(/_/g, " "), // Format label
    }));

  function onSubmit(document_uploads) {
    const formattedDocuments = Object.entries(uploadedURLs).reduce(
      (acc, [key, url]) => {
        const formattedKey = key.replace("document_", "");
        acc[formattedKey] = {
          type: "MANUAL",
          doc: url,
        };
        return acc;
      },
      {}
    );

    send("submit", {
      data: {
        document_uploads,
        formattedDocuments,
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p className="app-create-permit__description">
          Ensure you upload authentic documents that are clear and visible.
        </p>

        <div className="app-register__form-grid app-create-permit__docs">
          {onlineDocuments.map(({ key, label }) => (
            <UploadDocument
              label={label}
              key={key}
              {...getFieldProps(key)}
              onChange={(v) => setFieldValue(key, v)}
              onUploadComplete={(url) => onUploadComplete(key, url)}
            />
          ))}
        </div>

        <div className="app-register__form-footer">
          <Button
            variant="secondary"
            type="button"
            onClick={() => send("go_back")}
          >
            Previous
          </Button>
          <Button variant="primary">Next</Button>
        </div>
      </form>
    </>
  );
}

const validationSchema = Yup.object({});
