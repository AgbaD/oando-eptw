import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Input from "../../ui/form/input";
import useRequest from "../../../hooks/use-request";
import { createExternalUser, getRoles } from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import Select from "../../ui/form/select";
import { useIDContext } from "../../../context/id.context";

export default function CreateExternalUser({}: any) {
  const { makeRequest, isLoading } = useRequest(createExternalUser);
  const { valueID } = useIDContext();
  const rolesApi = useRequest(getRoles, {}, true);

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    roleId: Yup.number().required("A role must be selected"),
  });

  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      fullname: data.fullname,
      email: data.email,
      roleId: Number(data.roleId),
      companyId: Number(valueID),
    });
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to create user, please try again.",
      });
    }

    route("/users/company/details");
  }

  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      fullname: "",
      email: "",
      roleId: null,
    },
    onSubmit,
    validationSchema,
  });

  const roleOptions = rolesApi.response?.data
    ? rolesApi.response.data.map((role) => ({
        text: role.name,
        value: role.id,
      }))
    : [];

  return (
    <>
      <Header title="User" />

      <div className="app-page">
        <div className="app-create__header">
          <button onClick={() => route("/users")}>
            <Icon name="caret-left" />
          </button>
          <div>
            <h3>Create new user</h3>
            <p>Fill the fields below to create a new user</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Full Name</p>
            <Input
              placeholder="Enter full name"
              {...getFieldProps("fullname")}
            />

            <p className="app-create__form__title">Email Address</p>
            <Input
              placeholder="Enter email address"
              {...getFieldProps("email")}
            />

            <p className="app-create__form__title">Role</p>
            <Select
              {...getFieldProps("roleId")}
              placeholder="Select a role"
              options={roleOptions}
            />

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Create User
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
