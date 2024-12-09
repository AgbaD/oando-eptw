import useForm from "../../../../../hooks/use-form";
import * as Yup from "yup";

import UploadDocument from "../../../../ui/form/upload";
import { useState } from "preact/hooks";
import { usePerfRevalidationContext } from "../../../../../context/perf-revalidation-context";

import Button from "../../../../ui/button";

export default function ClosureUploadDocuments({}: any) {
  const { send, state } = usePerfRevalidationContext();
  const { setFieldValue, getFieldProps, handleSubmit } = useForm({
    initialValues: state.context.document_uploads,
    validationSchema,
    onSubmit,
  });

  const [uploadedURLs, setUploadedURLs] = useState({});

  function onUploadComplete(key, url) {
    setUploadedURLs((prev) => ({ ...prev, [key]: url }));
  }

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

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p className="app-create-permit__description">
          Ensure you upload authentic documents that are clear and visible.
        </p>

        <div className="app-register__form-grid app-create-permit__docs">
          <UploadDocument
            label="Tool Box Stock Doc"
            key="toolbox"
            {...getFieldProps("toolbox")}
            onChange={(v) => setFieldValue("toolbox", v)}
            onUploadComplete={(url) => onUploadComplete("toolbox", url)}
          />
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
