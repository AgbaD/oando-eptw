import useForm from "../../../../../hooks/use-form";
import Button from "../../../../ui/button";
import Checkbox from "../../../../ui/form/checkbox";
import Select from "../../../../ui/form/select";

import { useIssuingSupervisorRevalidationContext } from "../../../../../context/issuing-supervisor-revalidation-context";

import * as Yup from "yup";

const documentOptions = [
  "Tool Box Stock Doc",
  "Radiography Cert",
  "Confined Space Cert",
  "Gas Testing Cert",
];

export default function IssuingSelectDocuments({}: any) {
  const { state, send } = useIssuingSupervisorRevalidationContext();

  const onSubmit = (selected_documents) => {
    send("submit", { data: { selected_documents } });
  };

  const { setFieldValue, values, getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      documents: {},
      ...state.context.selected_documents,
      // permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  const updateDocuments = (name: string, type: boolean) => {
    setFieldValue("documents", { ...values.documents, [name]: type });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p>Select the document you want to upload below</p>
        <div className="app-register__form-grid app-create-permit__docs">
          {documentOptions?.map((document, index) => (
            <div key={index} className="">
              <label className={"app-register__attachment-form items-center"}>
                <Checkbox
                  checked={!!(values.documents && values.documents[document])}
                  onChange={() =>
                    updateDocuments(document, !values.documents[document])
                  }
                />
                <span>{document}</span>
              </label>
              <Select
                {...getFieldProps(`document_${document}`)}
                options={[{ text: "Manual Upload", value: "manual" }]}
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
            variant="secondary"
            type="button"
            onClick={() => send("go_back")}
          >
            Back
          </Button>
          <Button variant="primary" onClick={() => handleSubmit}>
            Next
          </Button>
        </div>
      </form>
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
