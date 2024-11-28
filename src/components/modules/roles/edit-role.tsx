import * as Yup from "yup";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Checkbox from "../../ui/form/checkbox";
import Input from "../../ui/form/input";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import useRequest from "../../../hooks/use-request";
import { toast } from "../../ui/toast";
import { useIDContext } from "../../../context/id.context";
import { createRequest } from "../../../assets/api";

import { editRole } from "../../../assets/api/user";

export default function EditRole({}: any) {
  const { valueID } = useIDContext();
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [roleResponseState, setRoleResponseState] = useState(null);

  useEffect(() => {
    async function getRoleByID() {
      const roleResponse = await createRequest(`/role/${valueID}`, "GET");
      const roleData = roleResponse[0].data;
      setRoleResponseState(roleData);
      setRoleName(roleData?.name);
      setPermissions(roleData?.permissions || []);
    }
    getRoleByID();
  }, [valueID]);

  const { makeRequest, isLoading } = useRequest(editRole);
  const { getFieldProps, values, setFieldValue, handleSubmit } = useForm({
    initialValues: { roleId: valueID, name: "", permissions: [] },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (roleResponseState) {
      setFieldValue("name", roleResponseState.name);
      setFieldValue("permissions", permissions);
    }
  }, [roleResponseState, permissions]);

  function togglePermission(value, isChecked) {
    const updatedPermissions = isChecked
      ? [...values.permissions, value]
      : values.permissions.filter((p) => p !== value);
    setFieldValue("permissions", updatedPermissions);
  }

  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      roleId: valueID,
      name: roleName,
      permissions: data.permissions,
    });

    if (err) {
      toast({
        variant: "error",
        message: err?.message || "Failed to update role, please try again",
      });
      return;
    }

    route("/roles");
  }

  return (
    <>
      <Header title="Roles & Permissions" />
      <div className="app-page">
        <div className="app-create__header">
          <button onClick={() => route("/roles")}>
            <Icon name="caret-left" />
          </button>
          <div>
            <h3>Edit role</h3>
            <p>Fill the fields below to edit a role</p>
          </div>
        </div>
        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Role Title</p>
            <Input placeholder={roleName} {...getFieldProps("name")} />

            <p className="app-create__form__title">Update Permissions</p>
            <div className="app-create__form__group">
              {PERMISSIONS.map(({ label, value }, i) => (
                <label className="base-checkbox-label" key={i}>
                  <Checkbox
                    checked={values.permissions.includes(value)}
                    onChange={(isChecked) => togglePermission(value, isChecked)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Edit Role
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const PERMISSIONS = [
  { label: "Full Access", value: "FULL_ACCESS" },
  { label: "Platform Access", value: "PLATFORM_ACCESS" },
  { label: "Create Permit", value: "CREATE_PERMIT" },
  { label: "Process Permit", value: "PROCESS_PERMIT" },
  { label: "Create User", value: "CREATE_USER" },
  { label: "Edit User", value: "EDIT_USER" },
  { label: "Create Role", value: "CREATE_ROLE" },
  { label: "Edit Role", value: "EDIT_ROLE" },
  { label: "Delete user Role", value: "DELETE_USER_ROLE" },
  { label: "PTW Access", value: "PTW_ACCESS" },
  { label: "Process Existing Permit", value: "PROCESS_EXISTING_PERMIT" },
  { label: "Internal Task Responsible", value: "INTERNAL_TASK_RESPONSIBLE" },
  { label: "External Task Responsible", value: "EXTERNAL_TASK_RESPONSIBLE" },
  { label: "Attach Documents", value: "ATTACH_DOCUMENTS" },
];

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Role name is required"),
  permissions: Yup.array().of(Yup.string()),
});
