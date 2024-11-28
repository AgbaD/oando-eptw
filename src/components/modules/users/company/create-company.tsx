import * as Yup from "yup";
import { route } from "preact-router";
import { useState, useEffect } from "preact/hooks";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import Icon from "../../../ui/icon";
import Header from "../../../ui/page/header";
import Select from "../../../ui/form/select";
import Input from "../../../ui/form/input";
import useRequest from "../../../../hooks/use-request";
import { createNewCompany, getSites } from "../../../../assets/api/user";
import { toast } from "../../../ui/toast";
import { siteOptions } from "../../locations/data";

import { Fragment } from "preact/jsx-runtime";

export default function CreateCompany({}: any) {
  const { makeRequest, isLoading } = useRequest(createNewCompany);
  const siteApi = useRequest(getSites, {}, true);
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      name: "",
      contractId: "",
      locationId: 0,
    },
    onSubmit,
    validationSchema,
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
      name: data.companyName,
      contractId: data.contractID,
      locationId: Number(data.locationId),
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
            <h3>Create new company</h3>
            <p>Fill the fields below to create a new company</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Company Name</p>
            <Input
              placeholder="Enter company name"
              {...getFieldProps("companyName")}
            />

            <Fragment>
              <p className="app-create__form__title">Contract ID</p>
              <Input
                placeholder="Enter contract ID"
                {...getFieldProps("contractID")}
              />

              <p className="app-create__form__title">Site</p>
              <Select
                placeholder={siteName}
                options={siteOptions}
                {...getFieldProps("siteName")}
                onChange={(e) =>
                  setSiteName((e.target as HTMLSelectElement).value)
                }
              />

              <p className="app-create__form__title">Location Area</p>
              <Select
                placeholder="--select location--"
                options={locationOptions}
                {...getFieldProps("locationId")}
                required
              />
            </Fragment>

            <Button variant="primary" {...{ isLoading }}>
              Create Company
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  contractID: Yup.string().required("Contract ID is required"),
  locationId: Yup.number()
    .required("Location is required")
    .min(1, "Please select a valid location"),
});
