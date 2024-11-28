import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import Header from "../../ui/page/header";
import Select from "../../ui/form/select";
import useRequest from "../../../hooks/use-request";
import { createNewLocation } from "../../../assets/api/user";
import { toast } from "../../ui/toast";

import { siteOptions } from "./data";

import Input from "../../ui/form/input";

export default function CreateLocation({}: any) {
  const { makeRequest, isLoading } = useRequest(createNewLocation);
  const { getFieldProps, handleSubmit, setFieldValue } = useForm({
    initialValues: {
      site: "",
      locationArea: "",
    },
    onSubmit,
    validationSchema,
  });

  async function onSubmit(data) {
    console.log(data);
    const [_, error] = await makeRequest(data);
    if (error) {
      return toast({
        variant: "error",
        message:
          error?.message ?? "Failed to create location, please try again.",
      });
    }

    route("/locations");
  }

  const handleLocationChange = (value) => {
    setFieldValue("locationArea", value);
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
            <h3>Add new location</h3>
            <p>Fill the fields below to add a new location</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Site Title</p>
            <Select
              placeholder={"--select site--"}
              options={siteOptions}
              {...getFieldProps("site")}
            />

            <p className="app-create__form__title">Location Area</p>
            <div className="location-fields">
              <Input
                placeholder="Enter Location Area"
                value={location}
                onChange={(e) =>
                  handleLocationChange((e.target as HTMLInputElement).value)
                }
                {...getFieldProps(`locationArea`)}
              />
            </div>

            <Button variant="primary" {...{ isLoading }}>
              Create Location Area
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  site: Yup.string().required("Site is required"),
  locationArea: Yup.string().required("Location area is required"),
});
