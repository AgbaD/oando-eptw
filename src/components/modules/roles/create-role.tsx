import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Checkbox from "../../ui/form/checkbox";
import Input from "../../ui/form/input";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import useRequest from "../../../hooks/use-request";
import { createNewRole } from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import { PERMISSIONS } from "../../../assets/utils";

export default function CreateRole({}: any) {
  const { makeRequest, isLoading } = useRequest(createNewRole);
  const { getFieldProps, values, setFieldValue, handleSubmit } = useForm({
    initialValues: { roleTitle: "", permissions: [] },
    validationSchema,
    onSubmit,
  });

  function togglePermission(value) {
    let permissions = [];
    const isNotValue = (p) => p !== value;
    if (values.permissions.every(isNotValue))
      permissions = [...values.permissions, value];
    else permissions = values.permissions.filter(isNotValue);
    setFieldValue("permissions", permissions);
  }

  async function onSubmit(data) {
    console.log(data);
    const [_, err] = await makeRequest({
      name: data.roleTitle,
      permissions: data.permissions,
      // permissions: data.permissions.map((permission) => ({ name: permission })),
    });

    if (err) {
      return toast({
        variant: "error",
        message: err?.message ?? "Failed to create role, please try again",
      });
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
            <h3>Create new role</h3>
            <p>Fill the fields below to create a new role</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Role Title</p>
            <Input
              placeholder="Enter role title"
              {...getFieldProps("roleTitle")}
            />

            <p className="app-create__form__title">Permissions</p>
            <div className="app-create__form__group">
              {PERMISSIONS.map(({ label, value }, i) => (
                <label className="base-checkbox-label" key={i}>
                  <Checkbox
                    checked={values.permissions.includes(value)}
                    onChange={() => togglePermission(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <Button variant="primary" {...{ isLoading }}>
              Create Role
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  roleTitle: Yup.string().required("Role title is required"),
});

//FULL_ACCESS
// PLATFORM_ACCESS
// CREATE_PERMIT
// PROCESS_PERMIT
// CREATE_USER
// CREATE_ROLE
// EDIT_USER
// EDIT_ROLE
// DELETE_USER_ROLE
// ATTACH_DOCUMENTS
// PTW_ACCESS
// PROCESS_EXISTING_PERMIT
// INTERNAL_TASK_RESPONSIBLE
// EXTERNAL_TASK_RESPONSIBLE
