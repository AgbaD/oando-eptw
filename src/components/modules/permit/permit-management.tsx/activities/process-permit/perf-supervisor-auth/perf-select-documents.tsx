import * as Yup from "yup";

import Select from "../../../../../../ui/form/select";
import Button from "../../../../../../ui/button";
import useForm from "../../../../../../../hooks/use-form";
import Checkbox from "../../../../../../ui/form/checkbox";
import { usePerfSupervisorActivityContext } from "../../../../../../../context/perf-supervisor-activity.context";

export default function PerfSupervisorDocuments() {
  const { state, send } = usePerfSupervisorActivityContext();

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

  const documentOptions = [
    "Tool Box Stock Doc",
    "Radiography Cert",
    "Confined Space Cert",
    "Gas Testing Cert",
  ];

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
            onClick={() => {
              window.location.href = "/permit-activities";
            }}
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
