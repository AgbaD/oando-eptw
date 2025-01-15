import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Input from "../../ui/form/input";
import useRequest from "../../../hooks/use-request";
import { editLocation, getSites } from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import { siteOptions } from "./data";
import Select from "../../ui/form/select";

import { useState, useEffect } from "preact/hooks";
import { useIDContext } from "../../../context/id.context";
import { createRequest } from "../../../assets/api";

export default function EditLocation({}: any) {
  const { valueID } = useIDContext();
  const siteApi = useRequest(getSites, {}, true);

  const [locationName, setLocationName] = useState("");
  const [locationResponseState, setLocationResponseState] = useState(null);

  const id = valueID;
  console.log(locationName, id);

  useEffect(() => {
    async function getLocationDetails() {
      const response = await createRequest(`/location/${id}`, "GET");
      const locationData = response[0].data;
      setLocationResponseState(locationData);
      setLocationName(locationData?.locationArea);
      setFieldValue("workArea", locationData?.workAreas || []);
    }

    getLocationDetails();
  }, [id]);

  useEffect(() => {
    if (locationResponseState) {
      setFieldValue("locationId", locationResponseState?.id);
      setFieldValue("locationArea", locationResponseState?.locationArea);
      setFieldValue("site", locationResponseState?.site);
    }
  });

  const { makeRequest, isLoading } = useRequest(editLocation);
  const { getFieldProps, handleSubmit, setFieldValue, values } = useForm({
    initialValues: {
      locationId: 0,
      site: "",
      locationArea: "",
      workArea: [],
    },
    onSubmit,
    validationSchema,
  });

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

  const [siteName, setSiteName] = useState("--select site--");
  const [locationOptions, setLocationOptions] = useState([]);

  console.log(locationOptions);
  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];

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
      locationId: Number(data.locationId) || locationResponseState?.id,
      site: data.site || locationResponseState?.site,
      locationArea: data.locationArea || locationResponseState?.locationArea,
      workArea: data.workArea.filter(Boolean),
    });
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to edit location, please try again.",
      });
    }

    toast({
      variant: "success",
      message: "Location area edited successfully",
    });

    route("/locations");
  }

  return (
    <>
      <Header title="Locations" />

      <div className="app-page">
        <div className="app-create__header">
          <button onClick={() => route("/locations")}>
            <Icon name="caret-left" />
          </button>
          <div>
            <h3>Edit location</h3>
            <p>Fill the fields below to edit the location</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Site Title</p>
            <Select
              placeholder={locationResponseState?.site}
              options={siteOptions}
              {...getFieldProps("site")}
              onChange={(e) =>
                setSiteName((e.target as HTMLSelectElement).value)
              }
            />

            <p className="app-create__form__title">Location Area</p>
            <div className="location-fields">
              <Input
                placeholder={locationResponseState?.locationArea}
                onChange={(e) =>
                  setFieldValue(
                    "locationArea",
                    (e.target as HTMLInputElement).value
                  )
                }
                {...getFieldProps(`locationArea`)}
              />
            </div>

            <p className="app-create__form__title">Work Area</p>
            {values.workArea.map((location, index) => (
              <div key={index} className="location-fields">
                <Input
                  placeholder="Enter Work Area"
                  value={location}
                  onChange={(e) =>
                    handleLocationChange(
                      index,
                      (e.target as HTMLInputElement).value
                    )
                  }
                  button={
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
              <span>Add Work Area</span>
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
  // Add validation rules as needed
});
