import * as Yup from "yup";

import { route } from "preact-router";

import { documentOptions } from "../../../../create-permit/documents";
import { useAuthorizingActivityContext } from "../../../../../../../context/authorizing-activity-context";
import Select from "../../../../../../ui/form/select";
import Button from "../../../../../../ui/button";
import useForm from "../../../../../../../hooks/use-form";
import Checkbox from "../../../../../../ui/form/checkbox";

export default function AuthDocuments() {
  const { state, send } = useAuthorizingActivityContext();

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
            </div>
          ))}
        </div>
        <div className="app-register__form-footer">
          <Button
            variant="danger"
            type="button"
            onClick={() => route("/process-permits")}
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
    </>
  );
}

const validationSchema = Yup.object({});
