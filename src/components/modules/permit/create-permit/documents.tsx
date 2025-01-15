import useForm from "../../../../hooks/use-form";
import * as Yup from "yup";
import { usePermitContext } from "../../../../context/permit.context";
import Button from "../../../ui/button";
import Checkbox from "../../../ui/form/checkbox";
import Select from "../../../ui/form/select";

export const documentOptions = [
  "Job Safety Analysis Doc / Risk Safety Analysis Doc",
  "Work Procedure Doc / Method Statement Doc",
  "Explosives Cert",
  "Mechanical Isolation Cert",
  "Gas Clearance Cert",
  "Scaffolding Cert",
  "MEWP Cert",
  "Man Basket Cert",
  "Near Powerlines Cert",
  "Radiography Cert",
  "Excavation Cert",
  "Lift Cert",
  "Hot Tapping Cert",
  "Diving or ROV Cert",
  "Man Riding Cert",
  "Other Cert",
];

export default function Documents() {
  const { state, send } = usePermitContext();

  const { setFieldValue, values, getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      documents: {
        [documentOptions[0]]: true,
        [documentOptions[1]]: true,
        ...state.context.selected_documents.documents,
      },
      document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc: "manual",
      document_WorkProcedureDocMethodStatementDoc: "manual",
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  const updateDocuments = (name, checked) => {
    const updatedDocuments = { ...values.documents, [name]: checked };
    setFieldValue("documents", updatedDocuments);

    if (!checked) {
      const selectName = `document_${name.replace(/ /g, "_")}`;
      setFieldValue(selectName, "");

      const updatedDocuments = { ...values.documents, [name]: checked };
      setFieldValue("documents", updatedDocuments);
    }
  };

  function onSubmit(selected_documents) {
    send("submit", { data: { selected_documents } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <p>Select the document you want to upload below</p>
      <div className="app-register__form-grid app-create-permit__docs">
        {documentOptions.map((document, index) => (
          <div key={index}>
            {values.documents[document] &&
              !values[`document_${document.replace(/ /g, "_")}`] && (
                <p className="error" style={{ color: "red" }}>
                  Please select an option for the selected document.
                </p>
              )}
            <br />
            <label className="app-register__attachment-form items-center">
              <Checkbox
                checked={!!values.documents[document]} // Ensure it reflects the actual state
                disabled={index < 2} // Disable first two checkboxes to prevent unchecking
                onChange={
                  () =>
                    index >= 2 &&
                    updateDocuments(document, !values.documents[document]) // Update only the specific document
                }
              />
              <span>{document}</span>
            </label>
            <Select
              {...getFieldProps(`document_${document.replace(/ /g, "_")}`)}
              options={[{ text: "Manual Upload", value: "manual" }]}
            />
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
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
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
      return selectedDocuments.every(([document]) => {
        const dropdownField =
          context.parent[`document_${document.replace(/ /g, "_")}`];
        return dropdownField !== undefined && dropdownField !== "";
      });
    }
  ),
  document_JobSafetyAnalysisDocRiskSafetyAnalysisDoc: Yup.string().required(
    "Selection is required for the first document."
  ),
  document_WorkProcedureDocMethodStatementDoc: Yup.string().required(
    "Selection is required for the second document."
  ),
});
