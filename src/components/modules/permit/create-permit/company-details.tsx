import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import Input from "../../../ui/form/input";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";
import useRequest from "../../../../hooks/use-request";
import { getAllCompanies } from "../../../../assets/api/user";
import { useEffect, useState } from "preact/hooks";

import Select from "../../../ui/form/select";

export default function CompanyDetails() {
  const companyApi = useRequest(getAllCompanies, {}, true);
  const [companyName, setCompanyName] = useState(
    "--select entrusted company--"
  );

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (companyName && companyApi?.response) {
      const companyData = companyApi.response.data;

      const items = companyData
        ? companyData.map((company) => ({
            text: company.name,
            value: company.id,
          }))
        : [{ text: "No company found", value: "" }];

      setOptions(items);
      console.log(companyData);
    }
  }, [companyName, companyApi.response]);

  const { send, state } = usePermitContext();
  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.company_details,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  function onSubmit(company_details) {
    send("submit", { data: { company_details } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-register__form">
        <div className="app-register__form-grid">
          <Select
            label="Entrusted Company (Optional)"
            placeholder={companyName}
            {...getFieldProps("entrusted_company")}
            options={options}
            onChange={(e) => {
              const value = Number((e.target as HTMLSelectElement).value);
              getFieldProps("locationId").onChange(e);
              console.log(`Selected company: ${value}`);
            }}
            // required
          />

          <Select
            label="Executing Company (Optional)"
            placeholder="Write here..."
            {...getFieldProps("executing_company")}
            options={options}
            onChange={(e) => {
              const value = Number((e.target as HTMLSelectElement).value);
              getFieldProps("locationId").onChange(e);
              console.log(`Selected company: ${value}`);
            }}
          />
          <Input
            label="Performing Department"
            placeholder="Enter performing Dept."
            {...getFieldProps("performing_department")}
            // required
          />
          <Input
            label="Contact Phone Number (Optional)"
            placeholder="Enter contact number"
            type="text"
            {...getFieldProps("company_contact_phone")}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  // performance_department: Yup.string().required(
  //   "Performance Dept. is required"
  // ),
});
