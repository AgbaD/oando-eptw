import useForm from "../../../../hooks/use-form";
import * as Yup from "yup";

import { usePermitContext } from "../../../../context/permit.context";
import Button from "../../../ui/button";
import Checkbox from "../../../ui/form/checkbox";
import Select from "../../../ui/form/select";

export const documentOptions = [
  "Job Safety Analysis (JSA) / Risk Safety Analysis (RSA)",
  "Work Procedure",
  "Explosives Certificate",
  "Mechanical Isolation Cert.",
  "Gas Clearance",
  "Scaffolding Cert.",
  "MEWP Cert.",
  "Man Basket Cert.",
  "Work Near Powerlines Cert.",
  "Radiography Cert.",
  "Excavation Cert.",
  "Lift Cert.",
  "Hot Tapping Cert.",
  "Diving / ROV Cert.",
  "Man Riding Cert.",
  "Others",
];

export default function Documents() {
  const { state, send } = usePermitContext();

  const { setFieldValue, values, getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.selected_documents,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  const updateDocuments = (name: string, type: boolean) => {
    setFieldValue("documents", { ...values.documents, [name]: type });
  };

  function onSubmit(selected_documents) {
    send("submit", { data: { selected_documents } });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p>Select the document you want to upload below</p>
        <div className="app-register__form-grid app-create-permit__docs">
          {documentOptions.map((document, index) => (
            <div key={index} className="">
              <label className={"app-register__attachment-form items-center"}>
                <Checkbox
                  checked={!!values.documents[document]} // Ensure the value is always a boolean
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

const validationSchema = Yup.object({});
