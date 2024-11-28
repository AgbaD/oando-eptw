import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Button from "../../../../ui/button";
import UploadDocument from "../../../../ui/form/upload";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";

export default function UploadPermitDocs() {
  const { state, send } = usePermitApprovalContext();
  const { handleSubmit, getFieldProps, setFieldValue } = useForm({
    initialValues: state.context.uploadPermitDocs,
    onSubmit,
    validationSchema,
  });

  function onSubmit(uploadPermitDocs) {
    send("submit", { data: {uploadPermitDocs} });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">
        Complementary Permits, Certificates / Documents
      </h3>

      <p className="app-create-permit__description">
        Ensure you upload authentic documents that are clear and visible.
      </p>

      <br />

      <div className="app-register__form-grid app-create-permit__docs">
        <UploadDocument
          label="Entry Certificate"
          {...getFieldProps("certificateDoc")}
          onChange={(v) => setFieldValue("certificateDoc", v)}
        />

        <UploadDocument
          label="Electronic Isolation Cert."
          {...getFieldProps("electronicIsolationCertDoc")}
          onChange={(v) => setFieldValue("electronicIsolationCertDoc", v)}
        />

        <UploadDocument
          label="Explosives Cert."
          {...getFieldProps("explosivesCertDoc")}
          onChange={(v) => setFieldValue("explosivesCertDoc", v)}
        />

        <UploadDocument
          label="Mechanical Isolation Cert."
          {...getFieldProps("mechanicalIsolationCertDoc")}
          onChange={(v) => setFieldValue("mechanicalIsolationCertDoc", v)}
        />

        <UploadDocument
          label="Gas Clearance Cert."
          {...getFieldProps("gasClearanceDoc")}
          onChange={(v) => setFieldValue("gasClearanceDoc", v)}
        />

        <UploadDocument
          label="Scaffolding Cert."
          {...getFieldProps("scaffoldingCertDoc")}
          onChange={(v) => setFieldValue("scaffoldingCertDoc", v)}
        />

        <UploadDocument
          label="MEWP Cert."
          {...getFieldProps("mewpCertDoc")}
          onChange={(v) => setFieldValue("mewpCertDoc", v)}
        />

        <UploadDocument
          label="Man Basket Cert."
          {...getFieldProps("manBasketCertDoc")}
          onChange={(v) => setFieldValue("manBasketCertDoc", v)}
        />

        <UploadDocument
          label="Work Near Powerlines Cert."
          {...getFieldProps("workNearPowerlineCertDoc")}
          onChange={(v) => setFieldValue("workNearPowerlineCertDoc", v)}
        />

        <UploadDocument
          label="Radiography cert."
          {...getFieldProps("radiographyCertDoc")}
          onChange={(v) => setFieldValue("radiographyCertDoc", v)}
        />

        <UploadDocument
          label="Excavation Cert."
          {...getFieldProps("excavationCertDoc")}
          onChange={(v) => setFieldValue("excavationCertDoc", v)}
        />

        <UploadDocument
          label="Lift Cert."
          {...getFieldProps("liftCertDoc")}
          onChange={(v) => setFieldValue("liftCertDoc", v)}
        />

        <UploadDocument
          label="Hot Tapping Cert."
          {...getFieldProps("hotTappingCertDoc")}
          onChange={(v) => setFieldValue("hotTappingCertDoc", v)}
        />

        <UploadDocument
          label="Diving / ROV Cert."
          {...getFieldProps("divingCertDoc")}
          onChange={(v) => setFieldValue("divingCertDoc", v)}
        />

        <UploadDocument
          label="Man Riding Cert."
          {...getFieldProps("manRidingCertDoc")}
          onChange={(v) => setFieldValue("manRidingCertDoc", v)}
        />
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("goBack")}
        >
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}
const validationSchema = Yup.object({});
