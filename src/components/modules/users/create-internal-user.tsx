import * as Yup from "yup";
import { route } from "preact-router";
import { Fragment } from "preact/jsx-runtime";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Select from "../../ui/form/select";
import Input from "../../ui/form/input";
import useRequest from "../../../hooks/use-request";
import {
  createExternalUser,
  getSites,
  getRoles,
} from "../../../assets/api/user";
import { toast } from "../../ui/toast";

export default function CreateInternalUser({}: any) {
  const { makeRequest, isLoading } = useRequest(createExternalUser);
  const locationsApi = useRequest(getSites, {}, true);
  const rolesApi = useRequest(getRoles, {}, true);
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      //   userType: "",
      //   firstName: "",
      //   lastName: "",
      email: "",
      role: "",
      location: "",
    },
    onSubmit,
    validationSchema,
  });

  const roleOptions = rolesApi.response?.data?.map((role) => ({
    text: role.name,
    value: role.id,
  }));

  const locationOptions = locationsApi.response?.data?.map((location) => ({
    text: location.address,
    value: location.id,
  }));

  async function onSubmit(data) {
    const [_, error] = await makeRequest({
      // firstname: data.firstName,
      // lastname: data.lastName,
      email: data.email,
      roleId: Number(data.role),
      locationId: Number(data.location),
    });
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to create user, please try again.",
      });
    }
    // }

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
            <h3>Create new user</h3>
            <p>Fill the fields below to create a new user</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            {/* <p className="app-create__form__title">User Type</p>
            <Select
              placeholder="Select user type"
              {...getFieldProps("userType")}
              options={[
                { text: "External Type", value: "external_type" },
                { text: "Internal Type", value: "internal_type" },
              ]}
              required
            /> */}

            {/* {values.userType === "external_type" && ( */}
            {/* <>
                <p className="app-create__form__title">First Name</p>
                <Input
                  placeholder="Enter first name"
                  {...getFieldProps("firstName")}
                />

                <p className="app-create__form__title">Last Name</p>
                <Input
                  placeholder="Enter last name"
                  {...getFieldProps("lastName")}
                />
              </> */}
            {/* )} */}

            {/* {Boolean(values.userType) && ( */}
            <Fragment>
              <p className="app-create__form__title">Email Address</p>
              <Input
                placeholder="Enter email address"
                {...getFieldProps("email")}
              />

              <p className="app-create__form__title">Role</p>
              <Select
                placeholder="Select role"
                {...getFieldProps("role")}
                options={roleOptions}
                required
              />

              <p className="app-create__form__title">Location</p>
              <Select
                placeholder="Select location"
                {...getFieldProps("location")}
                options={locationOptions}
                required
              />
            </Fragment>
            {/* )} */}

            <Button variant="primary" {...{ isLoading }}>
              Create User
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const isExternalUser =
  (message) =>
  ([userType], schema) => {
    if (userType !== "external_type") return schema.optional();
    return schema.required(message);
  };

const validationSchema = Yup.object({
  firstName: Yup.string().when(
    "userType",
    isExternalUser("First name is required")
  ),
  lastName: Yup.string().when(
    "userType",
    isExternalUser("Last name is required")
  ),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  role: Yup.string().required("Role is required"),
  location: Yup.string().required("Location is required"),
});
