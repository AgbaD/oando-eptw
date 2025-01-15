import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import Icon from "../../../ui/icon";
import Header from "../../../ui/page/header";
import Select from "../../../ui/form/select";
import Input from "../../../ui/form/input";
import useRequest from "../../../../hooks/use-request";
import { getSites, editCompany } from "../../../../assets/api/user";
import { toast } from "../../../ui/toast";
import { useState, useEffect } from "preact/hooks";
import { siteOptions } from "../../locations/data";
import { useIDContext } from "../../../../context/id.context";
import { createRequest } from "../../../../assets/api";

interface CompanyDetailsProps {
  id: number;
  name: string;
  location: {
    id: number;
    locationArea: string;
    site: string;
  };
  contractId: string;
  createdAt: string;
  createdBy: string | null;
  members: [];
}

export default function EditCompany({}: any) {
  const { valueID } = useIDContext();
  const { makeRequest, isLoading } = useRequest((data) =>
    editCompany(data, valueID)
  );
  const siteApi = useRequest(getSites, {}, true);

  const [company, setCompany] = useState<CompanyDetailsProps>({
    id: 0,
    name: "",
    location: {
      id: 0,
      locationArea: "",
      site: "",
    },
    contractId: "",
    createdAt: "",
    createdBy: null,
    members: [],
  });

  const [locationId, setLocationId] = useState(0);

  useEffect(() => {
    if (valueID) {
      async function getCompanyById() {
        const response = await createRequest(
          `/profile/company/${valueID}`,
          "GET"
        );
        const companyData = response[0]?.data;
        setCompany(companyData);
      }
      getCompanyById();
    }
  }, [valueID]);

  const { getFieldProps, handleSubmit, setFieldValue } = useForm({
    initialValues: {
      name: "",
      contractId: "",
      locationId: 0,
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (company) {
      setFieldValue("companyName", company.name);
      setFieldValue("contractID", company.contractId);
    }
  });

  const [siteName, setSiteName] = useState("--select site--");
  const [locationName, setLocationName] = useState("--select location--");
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];
      const locations = siteData
        ? siteData.map((location) => ({
            text: location.locationArea,
            value: location.id,
          }))
        : [{ text: "No location areas found", value: "" }];
      console.log(locations);
      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);

  async function onSubmit(data) {
    console.log(data);
    const requestData = {
      name: data.companyName ?? company.name,
      contractId: data.contractID ?? company.contractId,
      locationId: locationId ?? company.location.id,
    };

    const [_, error] = await makeRequest(requestData);
    if (error) {
      return toast({
        variant: "error",
        message: error?.message ?? "Failed to edit company, please try again.",
      });
    }

    toast({
      variant: "success",
      message: "Company updated successfully",
    });

    route("/users/company/details");
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
            <h3>Edit Company</h3>
            <p>Fill the fields below to edit an existing user</p>
          </div>
        </div>

        <div className="app-create__form">
          <form onSubmit={handleSubmit}>
            <p className="app-create__form__title">Company Name</p>
            <Input
              placeholder={company.name}
              {...getFieldProps("companyName")}
            />
            <p className="app-create__form__title">Contract ID</p>
            <Input
              placeholder={company.contractId}
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
              placeholder={locationName}
              options={locationOptions}
              onChange={(e) => {
                const selectedValue = Number(
                  (e.target as HTMLSelectElement).value
                );
                setFieldValue("locationId", selectedValue);
                setLocationId(selectedValue);
                console.log("Selected Location ID:", selectedValue);
                const selectedOption = locationOptions.find(
                  (option) => option.value === selectedValue
                );
                setLocationName(selectedOption?.text ?? "--select location--");
              }}
            />

            <Button variant="primary" {...{ isLoading }}>
              Edit Company
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({
  // companyName: Yup.string().required("Company name is required"),
  // contractID: Yup.string().required("Contract ID is required"),
  // locationId: Yup.number()
  //   .required("Location is required")
  //   .min(1, "Please select a valid location"),
});
