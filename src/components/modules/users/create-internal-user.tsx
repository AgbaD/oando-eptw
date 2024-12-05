import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Input from "../../ui/form/input";
import useRequest from "../../../hooks/use-request";
import {
  createInternalUser,
  getRoles,
  getSites,
} from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import Checkbox from "../../ui/form/checkbox";
import Select from "../../ui/form/select";

import { siteOptions } from "../locations/data";

import { useState, useEffect } from "preact/hooks";

export default function CreateInternalUser({}: any) {
  const { makeRequest, isLoading } = useRequest(createInternalUser);
  const rolesApi = useRequest(getRoles, {}, true);
  const siteApi = useRequest(getSites, {}, true);

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    roleIds: Yup.array().min(1, "At least one role must be selected"),
    locationId: Yup.number().min(1, "Select a location"),
  });

  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];

      // Map locations for the selected site, or show "No locations found"
      const locations = siteData
        ? siteData.map((location) => ({
            text: location.locationArea,
            value: location.id,
          }))
        : [{ text: "No location areas found", value: "" }];

      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);

  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      email: data.email,
      roleIds: data.roleIds,
      locationId: Number(data.locationId),
    });
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to create user, please try again.",
      });
    } else {
      toast({
        variant: "success",
        message: "User created successfully",
      });
    }

    route("/users");
  }

  const { getFieldProps, values, handleSubmit, setFieldValue } = useForm({
    initialValues: {
      email: "",
      roleIds: [],
      locationId: 0,
    },
    onSubmit,
    validationSchema,
  });

  const roleOptions = rolesApi.response?.data
    ? rolesApi.response.data.map((role) => ({
        label: role.name,
        value: role.id,
      }))
    : [];

  function toggleRole(value) {
    const roleIds = values.roleIds ?? [];
    const updatedRolesId = roleIds.includes(value)
      ? roleIds.filter((r) => r !== value)
      : [...roleIds, value];
    setFieldValue("roleIds", updatedRolesId);
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
            <h3>Create new user</h3>
            <p>Fill the fields below to create a new user</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Email Address</p>
            <Input
              placeholder="Enter email address"
              {...getFieldProps("email")}
            />

            <p className="app-create__form__title">Role</p>
            {roleOptions?.map(({ label, value }, i) => (
              <label className="base-checkbox-label" key={i}>
                <Checkbox
                  checked={values.roleIds.includes(value)}
                  onChange={() => toggleRole(value)}
                />
                <span>{label}</span>
              </label>
            ))}

            <p className="app-create__form__title">Site Title</p>
            <Select
              placeholder={siteName}
              options={siteOptions}
              {...getFieldProps("siteName")}
              onChange={(e) =>
                setSiteName((e.target as HTMLInputElement).value)
              }
            />

            <p className="app-create__form__title">Location Area</p>
            <Select
              placeholder="--select location--"
              options={locationOptions}
              {...getFieldProps("locationId")}
              required
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
