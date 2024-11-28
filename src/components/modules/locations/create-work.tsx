import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Select from "../../ui/form/select";
import Input from "../../ui/form/input";
import { useEffect, useState } from "preact/hooks";
import { toast } from "../../ui/toast";
import { createNewWorkArea, getSites } from "../../../assets/api/user";
import useRequest from "../../../hooks/use-request";

import { siteOptions } from "./data";

interface Props {
  path: string;
}

export default function CreateWork({ path }: Props) {
  const siteApi = useRequest(getSites, {}, true);
  const { makeRequest, isLoading } = useRequest(createNewWorkArea);
  const { getFieldProps, handleSubmit, setFieldValue, values } = useForm({
    initialValues: {
      locationId: 0,
      workArea: [], // Start with an empty array for workArea
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
    console.log(data);
    // Send filtered workArea array (removing empty entries)
    const [_, error] = await makeRequest({
      locationId: Number(data.locationId),
      workArea: data.workArea.filter(Boolean),
    });
    if (error) {
      return toast({
        variant: "error",
        message:
          error?.message ?? "Failed to create location, please try again.",
      });
    }
    route("/locations");
  }

  const addNewLocationField = () => {
    setFieldValue("workArea", [...values.workArea, ""]);
  };

  const handleLocationChange = (index, value) => {
    const updatedWorkArea = [...values.workArea];
    updatedWorkArea[index] = value;
    setFieldValue("workArea", updatedWorkArea);
  };

  const removeLocationField = (index) => {
    const updatedWorkArea = values.workArea.filter((_, i) => i !== index);
    setFieldValue("workArea", updatedWorkArea);
  };

  return (
    <>
      <Header title="Locations" />
      <div className="app-page">
        <div className="app-create__header">
          <button onClick={() => route("/locations")}>
            <Icon name="caret-left" />
          </button>
          <div>
            <h3>Add new work area</h3>
            <p>Fill the fields below to add a new location</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Site Title</p>
            <Select
              placeholder={siteName}
              options={siteOptions}
              {...getFieldProps("siteName")}
              onChange={(e) => setSiteName(e.target.value)}
            />

            <p className="app-create__form__title">Location Area</p>
            <Select
              placeholder="--select location--"
              options={locationOptions}
              {...getFieldProps("locationId")}
              required
            />

            <p className="app-create__form__title">Work Area</p>
            {values.workArea.map((location, index) => (
              <div key={index} className="location-fields">
                <Input
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                  deleteButton={
                    <img
                      src="/svgs/delete_icon.svg"
                      alt="Delete"
                      onClick={() => removeLocationField(index)}
                    />
                  }
                />
              </div>
            ))}

            <div
              className="app-create__edit-location"
              style={{ cursor: "pointer" }}
              onClick={addNewLocationField}
            >
              <img src="/svgs/location-add.svg" width={16} height={16} />
              <span>Add Location</span>
            </div>

            <Button variant="primary" {...{ isLoading }}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  locationId: Yup.string().required("Location is required"),
  workArea: Yup.array().of(Yup.string().required("Add at least one work area")),
});
