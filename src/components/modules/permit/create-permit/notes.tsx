import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";
import useRequest from "../../../../hooks/use-request";
import { createPermit } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";
import Section from "../../../ui/sections";

import { HAZARDS } from "./work-hazards";
import { formatDateForBackend } from "../permit-management.tsx/activities/process-permit/auth-submit";

import { Link } from "preact-router";
import dayjs from "dayjs";

export default function AdditionalNotes() {
  const { state, send } = usePermitContext();
  const { makeRequest, isLoading } = useRequest(createPermit);
  const { handleSubmit } = useForm({
    initialValues: state.context.additional_values || {},
    onSubmit,
    validationSchema,
  });

  // Permit Summary Items
  const items = [
    {
      section: "A",
      header: "Work Type",
      content: [
        {
          id: 1,
          title: "Permit Type",
          info: state.context.permit_type,
        },
      ],
    },
    {
      section: "B",
      header: "Work Description",
      content: [
        { id: 1, title: "Role", info: state.context.work_description?.role },
        {
          id: 2,
          title: "Performing Person / Person In Charge",
          info: state.context.work_description?.performer,
        },
        {
          id: 3,
          title: "Work Details",
          info: state.context.work_description?.work_description,
        },
        {
          id: 4,
          title: "Equipment / Tools / Materials",
          info: state.context.work_description?.equipment_to_be_worked,
        },
        {
          id: 5,
          title: "Environmental Considerations",
          info: state.context.work_description?.environmental_issues,
        },
        {
          id: 6,
          title: "Work Location / Work Area",
          info: state.context.work_description?.locationId,
        },
        {
          id: 7,
          title: "Permit Valid From - To (Date & Time)",
          info: `${dayjs(state.context.work_description?.from_date).format(
            "dddd, MMM D YYYY"
          )} : ${state.context.work_description?.from_time}- ${dayjs(
            state.context.work_description?.to_date
          ).format("dddd, MMM D YYYY")} : ${
            state.context.work_description?.to_time
          }`,
        },
      ],
    },
    {
      section: "C",
      header: "Company Details",
      content: [
        {
          id: 1,
          title: "Entrusted Company",
          info: state.context.company_details?.entrusted_company,
        },
        {
          id: 2,
          title: "Executing Company",
          info: state.context.company_details?.executing_company,
        },
        {
          id: 3,
          title: "Performing Department",
          info: state.context.company_details?.performing_department,
        },
        {
          id: 4,
          title: "Contact Phone Number",
          info: state.context.company_details?.company_contact_phone,
        },
      ],
    },
    {
      section: "D",
      header: "Hazard Identification",
      content: [
        {
          id: 1,
          title: "Describe the potential hazards",
          info: state.context.work_hazards?.potentialHazardDescription,
        },
      ],
    },
  ];
  const selectedHazards = state.context.work_hazards?.hazards || {};
  const renderHazards = () => {
    return HAZARDS.filter(
      (hazard) =>
        selectedHazards.hasOwnProperty(hazard.value) &&
        selectedHazards[hazard.value] !== undefined &&
        selectedHazards[hazard.value] !== null
    ) // Only include hazards that are defined and not null
      .map((hazard) => (
        <div key={hazard.value} className="hazard-item">
          <p>
            <span className="hazard-value">
              {selectedHazards[hazard.value] ? "YES" : "NO"}
            </span>{" "}
            - {hazard.text}
          </p>
        </div>
      ));
  };

  const documents = [
    {
      section: "E",
      header: "Document Uploads",
      content: [],
    },
  ];

  const selectedDocuments = Array.isArray(state.context.formattedDocuments)
    ? state.context.formattedDocuments
    : Object.entries(state.context.formattedDocuments || {}).map(
        ([name, value]) => ({
          name,
          type: (value as { type: string }).type || "MANUAL",
          doc: (value as { doc: string }).doc || "",
        })
      );

  console.log(state.context);

  async function onSubmit(data) {
    console.log(data);

    console.log("selectedHazards", selectedHazards);
    const filteredHazards = {};

    Object.entries(selectedHazards).forEach(([key, value]) => {
      console.log(key, value);
      if (value !== undefined) {
        filteredHazards[key] = value;
      }
    });

    const toCamelCase = (str) => {
      return str
        .replace(/\/.*|\(.*?\)/g, "") // Remove anything starting with `/` or inside brackets
        .trim() // Remove leading and trailing spaces
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ""); // Remove all spaces
    };

    const documents = selectedDocuments.reduce((acc, doc) => {
      const camelCaseName = toCamelCase(doc.name);
      acc[`${camelCaseName}Type`] = doc.type;
      acc[`${camelCaseName}Doc`] = doc.doc;
      return acc;
    }, {});

    const payload = {
      type: state.context.permit_type.toUpperCase(),
      workArea: state.context.work_description?.work_area,
      locationId: Number(state.context.work_description?.locationId),
      performerRole: state.context.work_description?.role,
      performerPersonInCharge: state.context.work_description?.performer,
      workDescription: state.context.work_description?.work_description,
      equipmentToolsMaterials:
        state.context.work_description?.equipment_to_be_worked,
      environmentalConsideration:
        state.context.work_description?.environmental_issues,
      fromDate: state.context.work_description?.from_date,
      fromTime: formatDateForBackend(
        state.context.work_description?.from_date,
        state.context.work_description?.from_time
      ),
      toDate: state.context.work_description?.to_date,
      toTime: formatDateForBackend(
        state.context.work_description?.to_date,
        state.context.work_description?.to_time
      ),
      entrustedCompanyId: Number(
        state.context.company_details?.entrusted_company
      ),
      executingCompanyId: Number(
        state.context.company_details?.executing_company
      ),
      performingDepartment:
        state.context.company_details?.performing_department,
      contractorPhoneNumber:
        state.context.company_details?.company_contact_phone,
      hazard: {
        potentialHazardDescription:
          state.context.work_hazards?.potentialHazardDescription || "",
        ...filteredHazards,
      },
      documents,
    };

    console.log(payload);

    const [_, error] = await makeRequest(payload);
    if (error) {
      return toast({
        variant: "error",
        message: error.message ?? "Failed to create permit, please try again",
      });
    }
    route("/");
    toast({
      variant: "success",
      message: "Permit created successfully",
    });
  }

  function extractFileName(data) {
    const url = data;

    if (!url) {
      throw new Error("URL is required.");
    }

    const segments = url.split("/");
    const fileName = segments[segments.length - 1];

    const name = fileName.split("-").slice(1).join("-");

    return name;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="app-register__form app-register__attachment-form"
    >
      <div className="app-register__content__header app-create-permit__header">
        <h3>Permit Summary</h3>
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Back
        </Button>
      </div>
      <p>Review your permit to work before final submission.</p>
      <div></div>
      {items.map((item) => (
        <Section
          type="Primary"
          header={item.header}
          children={item.content}
          section={item.section}
        />
      ))}

      <div className="section">
        <div className="section__content">
          <p className="title">Identification of potential hazards</p>
          <p className="info">
            {Object.keys(selectedHazards).length > 0 ? (
              renderHazards()
            ) : (
              <p>No hazards selected.</p>
            )}
          </p>
        </div>
      </div>

      <Section
        type="Secondary"
        header="Documents"
        children={documents[0]}
        section={documents[0]?.section}
      />

      {selectedDocuments?.length > 0 ? (
        selectedDocuments.map((item, index) => (
          <div key={index} className="section__content__document_section">
            <p className="section__header">{item.name}</p>
            <div className="section__content">
              <p className="document">
                <span>Upload Option</span>
              </p>
              <p>{item.type}</p>
              <p className="document">
                <span>Document</span>
              </p>
              <p className="document_item">
                <Link className="app-link" href={item.doc}>
                  {" "}
                  {extractFileName(`${item.doc}`)}
                </Link>
                <span>
                  <img src="/svgs/document_download.svg" alt="" />
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No documents uploaded.</p>
      )}

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Previous
        </Button>
        <Button variant="primary" isLoading={isLoading}>
          SUBMIT
        </Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  // additional_notes: Yup.string().optional(),
});
