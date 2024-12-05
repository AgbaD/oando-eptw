import * as Yup from "yup";

import useForm from "../../../../../../../hooks/use-form";
import Button from "../../../../../../ui/button";
import UploadDocument from "../../../../../../ui/form/upload";

import { useState } from "preact/hooks";
import SendToAuthority from "../send-back-to-authority";
import { useIssuingSupervisorActivityContext } from "../../../../../../../context/issuing-supervisor-context";
export default function IssuSupervisorFinalUpload() {
  const { state, send } = useIssuingSupervisorActivityContext();
  const { setFieldValue, getFieldProps, handleSubmit } = useForm({
    initialValues: state.context.document_uploads,
    onSubmit,
    validationSchema,
  });

  const selectedPreviously: any = state.context.selected_documents;

  const [uploadedURLs, setUploadedURLs] = useState({});

  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({ ...prev, [key]: url }));
  }

  // Filter out online documents
  const onlineDocuments = Object.keys(selectedPreviously)
    .filter(
      (key) =>
        key.startsWith("document_") && selectedPreviously[key] === "manual"
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

    send("submit", { data: { document_uploads, formattedDocuments } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

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
            variant="danger"
            type="button"
            onClick={() => setModalOpen(true)}
          >
            Send Back To Authority
          </Button>
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

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}

const validationSchema = Yup.object({});
