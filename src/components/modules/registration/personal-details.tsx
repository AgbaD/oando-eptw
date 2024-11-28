import { useRegistrationContext } from "../../../context/registration.context";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Input from "../../ui/form/input";
import * as Yup from "yup";
import Select from "../../ui/form/select";
import UploadDocument from "../../ui/form/upload";

export default function PersonalDetails() {
  const { send, state } = useRegistrationContext();
  const { getFieldProps, handleSubmit, setFieldValue } = useForm({
    initialValues: state.context.personal_details,
    onSubmit,
    validationSchema,
  });

  function onSubmit(data) {
    send("submit", { data });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <div className="app-register__form-grid">
        <Select
          required
          label="Title"
          {...getFieldProps("title")}
          options={[
            { text: "Mr", value: "Mr" },
            { text: "Mrs", value: "Mrs" },
            { text: "Miss", value: "Miss" },
          ]}
        />

        <Input label="First name" {...getFieldProps("first_name")} />
        <Input label="Last name" {...getFieldProps("last_name")} />
        <Input label="Email address" {...getFieldProps("email")} />

        <Select
          required
          label="Gender"
          {...getFieldProps("gender")}
          options={[
            { text: "Male", value: "Male" },
            { text: "Female", value: "Female" },
          ]}
        />

        <Select
          required
          label="Nationality"
          {...getFieldProps("nationality")}
          options={[{ text: "Nigeria", value: "Nigeria" }]}
        />

        <Input label="IC/Passport" {...getFieldProps("passport")} />
        <Input label="Contact number" {...getFieldProps("contact_number")} />

        <UploadDocument
          label="Profile Image"
          {...getFieldProps("profileImg")}
          onChange={(v) => setFieldValue("profileImg", v)}
        />
      </div>

      <div className="app-register__form-footer">
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email address is required"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  passport: Yup.string().required("Passport is required"),
  contact_number: Yup.string().required("Contact number is required"),
  profileImg: Yup.string().required("Profile image is required"),
});
