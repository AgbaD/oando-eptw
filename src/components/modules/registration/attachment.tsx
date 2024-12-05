import * as Yup from "yup";
import { route, useRouter } from "preact-router";
import { useRegistrationContext } from "../../../context/registration.context";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Checkbox from "../../ui/form/checkbox";
import useRequest from "../../../hooks/use-request";
import {
  onboardContractor,
  verifyContractorOnboarding,
} from "../../../assets/api/auth";
import { toast } from "../../ui/toast";

export default function Attachment() {
  const [
    {
      matches: { token },
    },
  ] = useRouter();
  const { makeRequest, isLoading } = useRequest(onboardContractor);
  const verifyOtpApi = useRequest(verifyContractorOnboarding);
  const { send, state } = useRegistrationContext();
  const { setFieldValue, values, handleSubmit } = useForm({
    initialValues: state.context.attachment,
    onSubmit,
    validationSchema,
  });

  async function onSubmit() {
    const payload = {
      token,
      title: state.context.personal_details.title,
      firstname: state.context.personal_details.first_name,
      lastname: state.context.personal_details.last_name,
      email: state.context.personal_details.email,
      gender: state.context.personal_details.gender,
      nationality: state.context.personal_details.nationality,
      icOrPassport: state.context.personal_details.passport,
      phone: state.context.personal_details.contact_number,
      // supportingDoc: data.supportingDoc,
      // profileImg: state.context.personal_details.profileImg,
      division: state.context.company_details.division,
      department: state.context.company_details.department,
      companyId: Number(state.context.company_details.company),
      hasWorkVisa: !state.context.isResident,
      supportingDoc: "https://image.png",
      profileImg: "https://image.png",
    };

    let [res, err] = await makeRequest(payload);
    if (err) return toast({ variant: "error", message: err.message });

    [res, err] = await verifyOtpApi.makeRequest({
      email: payload.email,
      otp: res?.data,
    });
    if (err) return toast({ variant: "error", message: err.message });

    route("/users");
    toast({
      variant: "success",
      message: "Contractor onboarding successful!",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      {/* <UploadDocument
        {...getFieldProps("supportingDoc")}
        onChange={(v) => setFieldValue("supportingDoc", v)}
      /> */}

      <p>
        Please upload LOA PTW letter, supporting certification such as AGT LOA
        and VISA'
      </p>

      <label>
        <Checkbox
          checked={values.isCorrect}
          onChange={(v) => setFieldValue("isCorrect", v)}
        />
        <p>I Hereby Confirm That All Information Provided Is Correct.</p>
      </label>

      <label>
        <Checkbox
          checked={values.consentGiven}
          onChange={(v) => setFieldValue("consentGiven", v)}
        />
        <p>
          I Hereby Authorise, Agree And Consent To Oando's Consent Statement
          Below:
        </p>
      </label>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send({ type: "go_back" })}
          disabled={isLoading || verifyOtpApi.isLoading}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          disabled={!values.isCorrect || !values.consentGiven}
          isLoading={isLoading || verifyOtpApi.isLoading}
        >
          Next
        </Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  supportingDoc: Yup.mixed().required("Document is required"),
  isCorrect: Yup.boolean().oneOf([true], "confirm all information is correct"),
  consentGiven: Yup.boolean().oneOf(
    [true],
    "Please give your consent to proceed"
  ),
});
