import * as Yup from "yup";

import { useState } from "preact/hooks";
import SendToAuthority from "../send-back-to-authority";
import { documentOptions } from "../../../../create-permit/documents";

import Select from "../../../../../../ui/form/select";
import Button from "../../../../../../ui/button";
import useForm from "../../../../../../../hooks/use-form";
import Checkbox from "../../../../../../ui/form/checkbox";
import { useIssuingSupervisorActivityContext } from "../../../../../../../context/issuing-supervisor-context";

export default function IssuSupervisorDocuments() {
  const { state, send } = useIssuingSupervisorActivityContext();

  const { setFieldValue, values, getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.selected_documents,
    },
    onSubmit,
  });

  const updateDocuments = (name: string, type: boolean) => {
    setFieldValue("documents", { ...values.documents, [name]: type });
  };

  function onSubmit(selected_documents) {
    send("submit", { data: { selected_documents } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p>Select the document you want to upload below</p>
        <div className="app-register__form-grid app-create-permit__docs">
          {documentOptions.map((document, index) => (
            <div key={index} className="">
              <label className={"app-register__attachment-form items-center"}>
                <Checkbox
                  checked={!!values.documents[document]}
                  onChange={() =>
                    updateDocuments(document, !values.documents[document])
                  }
                />
                <span>{document}</span>
              </label>
              <Select
                {...getFieldProps(`document_${document}`)}
                options={[
                  { text: "Manual Upload", value: "manual" },
                  { text: "Online", value: "online" },
                ]}
              />
              {values.documents[document] &&
                !values[`document_${document}`] && (
                  <p className="error" style={{ color: "red" }}>
                    Please select an option for the selected document.
                  </p>
                )}
            </div>
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
            Back
          </Button>
          <Button variant="primary" onClick={() => handleSubmit}>
            Next
          </Button>

          {/* <button onClick={onSubmit}>Next</button> */}
        </div>
      </form>

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}

const validationSchema = Yup.object().shape({
  documents: Yup.object().test(
    "document-selection-validation",
    "Please select a corresponding dropdown option for all selected documents.",
    (documents, context) => {
      const selectedDocuments = Object.entries(documents || {}).filter(
        ([_, checked]) => checked
      );
      return selectedDocuments.every(
        ([document]) => !!context.parent[`document_${document}`]
      );
    }
  ),
});
