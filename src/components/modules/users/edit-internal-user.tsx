import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Input from "../../ui/form/input";
import useRequest from "../../../hooks/use-request";
import { editInternalUser, getRoles } from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import Select from "../../ui/form/select";

import { useIDContext } from "../../../context/id.context";

import { useState, useEffect } from "preact/hooks";

import { createRequest } from "../../../assets/api";

export default function EditInternalUser({}: any) {
  const { makeRequest, isLoading } = useRequest(editInternalUser);

  const { valueID } = useIDContext();
  const [user, setUser] = useState({
    email: "",
    roleId: 0,
    fullname: "",
    role: {
      name: "",
    },
    locationId: 0,
  });

  useEffect(() => {
    async function getUserByID() {
      const userResponse = await createRequest(`/profile/${valueID}`, "GET");
      const userData = userResponse[0].data;
      setUser(userData);
      console.log("user data", userData);
    }
    getUserByID();
  }, [valueID]);

  const rolesApi = useRequest(getRoles, {}, true);
  const { getFieldProps, handleSubmit, setFieldValue } = useForm({
    initialValues: {
      email: "",
      roleId: null,
      fullname: "",
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (user) {
      setFieldValue("email", user.email);
      setFieldValue("roleId", user.roleId);
      setFieldValue("fullname", user.fullname);
    }
  }, [user]);

  const roleOptions = rolesApi.response?.data
    ? rolesApi.response.data.map((role) => ({
        text: role.name,
        value: role.id,
      }))
    : [];

  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      fullname: data.fullname,
      email: data.email || user?.email,
      roleId: Number(data.roleId) || user?.roleId,
      locationId: Number(user?.locationId),
      internalUserId: Number(valueID),
    });
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to create user, please try again.",
      });
    }

    route("/users");
  }

  return (
    <>
      <Header title="User" />

      <div className="app-page">
        <div className="app-create__header">
          <button onClick={() => route("/users")}>
            <Icon name="caret-left" />
          </button>
          <div>
            <h3>Edit existing user</h3>
            <p>Fill the fields below to edit an existing user</p>
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
              placeholder={`${user.email ? user.email : "Enter email address"}`}
              {...getFieldProps("email")}
            />

            <p className="app-create__form__title">Role</p>
            <Select
              {...getFieldProps("roleId")}
              placeholder={`${
                user.roleId ? user.role.name : "--select role--"
              }`}
              options={roleOptions}
            />

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Edit User
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  // firstName: Yup.string().when(
  //   "userType",
  //   isExternalUser("First name is required")
  // ),
  // lastName: Yup.string().when(
  //   "userType",
  //   isExternalUser("Last name is required")
  // ),
  //   email: Yup.string().email("Email is invalid").required("Email is required"),
  //   role: Yup.string().required("Role is required"),
  //   location: Yup.string().required("Location is required"),
});
