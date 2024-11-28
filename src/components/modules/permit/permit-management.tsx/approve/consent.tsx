import * as Yup from "yup";
import Button from "../../../../ui/button";
import useForm from "../../../../../hooks/use-form";
import Checkbox from "../../../../ui/form/checkbox";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";
import useRequest from "../../../../../hooks/use-request";
// import { approveHotWork } from "../../../../../assets/api/permit";
import { toast } from "../../../../ui/toast";
import { useRouter } from "preact-router";

export default function Consent() {
  const { state, send } = usePermitApprovalContext();
  const [
    {
      matches: { id },
    },
  ] = useRouter();
  // const { makeRequest, isLoading } = useRequest(approveHotWork)
  const { handleSubmit, values, setFieldValue } = useForm({
    initialValues: state.context.consent,
    onSubmit,
    validationSchema,
  });

  async function onSubmit() {
    // const [_, err] = await makeRequest({
    //   "permitId": +id,
    //   "notes": "Sample note",
    //   "measuresOnEquipment": Object.keys(state.context.measuresOnEquipments).filter(e => state.context.measuresOnEquipments[e]),
    //   "precautions": Object.keys(state.context.precautions).filter(e => state.context.precautions[e]),
    //   "firefightingPrecautions": Object.keys(state.context.fireFighting).filter(e => state.context.fireFighting[e]),
    //   "protectiveEquipment": Object.keys(state.context.personalEquipments).filter(e => state.context.personalEquipments[e]),
    //   "entryCertNo": state.context.permitCerts.certificateNo,
    //   // "entryCert": state.context.uploadPermitDocs.certificateDoc ?? "https://image.png",
    //   // "electronicIsolationCert": state.context.uploadPermitDocs.electronicIsolationCertDoc ?? "https://image.png",
    //   // "explosivesCert": state.context.uploadPermitDocs.explosivesCertDoc ?? "https://image.png",
    //   // "MechanicalIsolationCert": state.context.uploadPermitDocs.mechanicalIsolationCertDoc ?? "https://image.png",
    //   // "gasClearanceCert": state.context.uploadPermitDocs.gasClearanceDoc ?? "https://image.png",
    //   // "scaffoldingCert": state.context.uploadPermitDocs.scaffoldingCertDoc ?? "https://image.png",
    //   // "mewpCert": state.context.uploadPermitDocs.mewpCertDoc ?? "https://image.png",
    //   // "manBasketCert": state.context.uploadPermitDocs.manBasketCertDoc ?? "https://image.png",
    //   // "nearPowerlinesCert": state.context.uploadPermitDocs.workNearPowerlineCertDoc ?? "https://image.png",
    //   // "excavationCert": state.context.uploadPermitDocs.excavationCertDoc ?? "https://image.png",
    //   // "radiographyCert": state.context.uploadPermitDocs.radiographyCertDoc ?? "https://image.png",
    //   // "liftCert": state.context.uploadPermitDocs.liftCertDoc ?? "https://image.png",
    //   // "hotTappingCert": state.context.uploadPermitDocs.hotTappingCertDoc ?? "https://image.png",
    //   // "manRidingCert": state.context.uploadPermitDocs.manRidingCertDoc ?? "https://image.png",
    //   // "divingOrRovCert": state.context.uploadPermitDocs.divingCertDoc ?? "https://image.png",
    //   "entryCert": "https://image.png",
    //   "electronicIsolationCert": "https://image.png",
    //   "explosivesCert": "https://image.png",
    //   "MechanicalIsolationCert": "https://image.png",
    //   "gasClearanceCert": "https://image.png",
    //   "scaffoldingCert": "https://image.png",
    //   "mewpCert": "https://image.png",
    //   "manBasketCert": "https://image.png",
    //   "nearPowerlinesCert": "https://image.png",
    //   "excavationCert": "https://image.png",
    //   "radiographyCert": "https://image.png",
    //   "liftCert": "https://image.png",
    //   "hotTappingCert": "https://image.png",
    //   "manRidingCert": "https://image.png",
    //   "divingOrRovCert": "https://image.png",
    //   "electronicIsolationCertNo": state.context.permitCerts.electronicIsolationCert,
    //   "explosivesCertNo": state.context.permitCerts.explosivesCert,
    //   "MechanicalIsolationCertNo": state.context.permitCerts.mechanicalIsolationCert,
    //   "gasClearanceCertNo": state.context.permitCerts.gasClearance,
    //   "scaffoldingCertNo": state.context.permitCerts.scaffoldingCert,
    //   "mewpCertNo": state.context.permitCerts.mewpCert,
    //   "manBasketCertNo": state.context.permitCerts.manBasketCert,
    //   "nearPowerlinesCertNo": state.context.permitCerts.workNearPowerlineCert,
    //   "radiographyCertNo": state.context.permitCerts.radiographyCert,
    //   "excavationCertNo": state.context.permitCerts.excavationCert,
    //   "liftCertNo": state.context.permitCerts.liftCert,
    //   "hotTappingCertNo": state.context.permitCerts.hotTappingCert,
    //   "divingOrRovCertNo": state.context.permitCerts.divingCert,
    //   "manRidingCertNo": state.context.permitCerts.manRidingCert,
    // })
    // if (err) return toast({ variant: "error", message: err.message ?? "Failed to approve permit, please try again" })
    // send("submit");
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <label>
        <Checkbox
          checked={values.consentGiven}
          onChange={(v) => setFieldValue("consentGiven", v)}
        />
        <p>
          I hereby certify that the listed unit / facility on this permit should
          be released for work commence, after I have reviewed the worksite with
          the PA.
        </p>
      </label>

      <label>
        <Checkbox
          checked={values.isReviewed}
          onChange={(v) => setFieldValue("isReviewed", v)}
        />
        <p>
          I hereby confirm that i have properly reviewed all the details and
          documents provided for this permit
        </p>
      </label>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("goBack")}
          // disabled={isLoading}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          disabled={!values.consentGiven || !values.isReviewed}
          // isLoading={isLoading}
        >
          Next
        </Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({});
