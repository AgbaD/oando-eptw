import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Checkbox from "../../../../../ui/form/checkbox";
import Select from "../../../../../ui/form/select";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import { documentOptions } from "../../../create-permit/documents";

import { useState } from "preact/hooks";
import SendToAuthority from "./send-back-to-authority";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

import { toOriginalFormat } from "../../../../../../assets/utils";
import Section from "../../../../../ui/sections";

export default function Documents() {
  const { state, send } = useIssuingActivityContext();

  const { permit } = usePermitDetails();
  const details = permit;

  const documents =
    details?.permitDocuments && permit.permitDocuments.length > 0
      ? details.permitDocuments[0].document
      : [];

  const reversedDocuments = toOriginalFormat(documents);

  // const excludedDocuments = [
  //   "Job Safety Analysis Doc / Risk Safety Analysis Doc",
  //   "Work Procedure Doc / Method Statement Doc",
  // ];

  const notSelected = documentOptions.filter((doc) => {
    // if (excludedDocuments.includes(doc)) return false;

    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);

    return !reversedDoc;
  });

  const selected = documentOptions.filter((doc) => {
    const reversedDoc = reversedDocuments.filter((rd) => rd.name === doc);

    return reversedDoc;
  });

  const validationSchema = Yup.object().shape({
    // documents: Yup.object().test(
    //   "document-selection-validation",
    //   "Please select a corresponding dropdown option for all selected documents.",
    //   (documents) => {
    //     // Skip validation if no documents need to be selected
    //     if (notSelected.length === 0) return true;
    //     // Check that all selected documents have valid dropdown options
    //     const selectedDocuments = Object.entries(documents || {}).filter(
    //       ([_, checked]) => checked
    //     );
    //     if (selectedDocuments.length === 0) return false;
    //     return selectedDocuments.every(
    //       ([document]) => !!documents[`document_${document}`]
    //     );
    //   }
    // ),
  });

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
    console.log(selected_documents);
    send("submit", { data: { selected_documents } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const renderDocuments = () => {
    const documentEntries = selected;

    return documentEntries.map((doc) => {
      return (
        <div key={doc} className="document-item">
          <div className="">
            <p className="document grid-cols-2">
              <span>{doc}</span>
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <div className="">
          <Section
            type="Secondary"
            header="Uploaded Documents"
            children={documents[0]}
            section={documents[0]?.section}
          />

          <div className="section">
            <div className="">
              <p className="info">
                {Object.keys(selected).length > 0 ? (
                  renderDocuments()
                ) : (
                  <p>No documents uploaded.</p>
                )}
              </p>
            </div>
          </div>
        </div>
        <h3>Select the document you want to upload below</h3>
        <br />
        <div className="app-register__form-grid app-create-permit__docs">
          {notSelected?.length > 0 ? (
            <>
              {notSelected.map((document, index) => (
                <div key={index} className="">
                  <label
                    className={"app-register__attachment-form items-center"}
                  >
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
            </>
          ) : (
            <>
              <p>No documents need to be uploaded</p>
            </>
          )}
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
          <Button variant="primary" type="submit" onClick={() => handleSubmit}>
            Next
          </Button>
        </div>
      </form>

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}
