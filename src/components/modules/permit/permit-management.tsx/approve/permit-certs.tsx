import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Input from "../../../../ui/form/input";
import Button from "../../../../ui/button";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";

export default function PersonalCerts() {
  const { state, send } = usePermitApprovalContext();
  const { handleSubmit, getFieldProps } = useForm({
    initialValues: state.context.permitCerts,
    onSubmit,
    validationSchema,
  });

  function onSubmit(permitCerts) {
    send("submit", { data: {permitCerts} });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">
        Complementary Permits, Certificates / Documents
      </h3>

      <div className="app-register__form-grid">
        <Input label="Entry Certificate" {...getFieldProps("certificateNo")} />
        <Input label="Electronic Isolation Cert." {...getFieldProps("electronicIsolationCert")} />
        <Input label="Explosives Cert." {...getFieldProps("explosivesCert")} />
        <Input label="Mechanical isolation Cert." {...getFieldProps("mechanicalIsolationCert")} />
        <Input label="Gas Clearance" {...getFieldProps("gasClearance")} />
        <Input label="Scaffolding Cert." {...getFieldProps("scaffoldingCert")} />
        <Input label="MEWP Cert." {...getFieldProps("mewpCert")} />
        <Input label="Man Basket Cert." {...getFieldProps("manBasketCert")} />
        <Input label="Work Near Powerlines Cert." {...getFieldProps("workNearPowerlineCert")} />
        <Input label="Radiography cert." {...getFieldProps("radiographyCert")} />
        <Input label="Excavation Cert." {...getFieldProps("excavationCert")} />
        <Input label="Lift Cert." {...getFieldProps("liftCert")} />
        <Input label="Hot Tapping Cert." {...getFieldProps("hotTappingCert")} />
        <Input label="Diving / ROV Cert." {...getFieldProps("divingCert")} />
        <Input label="Man Riding Cert." {...getFieldProps("manRidingCert")} />
        <Input label="Others" {...getFieldProps("others")} />
      </div>

      <div className="app-register__form-footer">
        <Button variant="secondary" type="button" onClick={() => send("goBack")}>
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}
const validationSchema = Yup.object({
  certificateNo: Yup.string().required("This field is required"),
  electronicIsolationCert: Yup.string().required("This field is required"),
  explosivesCert: Yup.string().required("This field is required"),
  mechanicalIsolationCert: Yup.string().required("This field is required"),
  gasClearance: Yup.string().required("This field is required"),
  scaffoldingCert: Yup.string().required("This field is required"),
  mewpCert: Yup.string().required("This field is required"),
  manBasketCert: Yup.string().required("This field is required"),
  workNearPowerlineCert: Yup.string().required("This field is required"),
  radiographyCert: Yup.string().required("This field is required"),
  excavationCert: Yup.string().required("This field is required"),
  liftCert: Yup.string().required("This field is required"),
  hotTappingCert: Yup.string().required("This field is required"),
  divingCert: Yup.string().required("This field is required"),
  manRidingCert: Yup.string().required("This field is required"),
});
