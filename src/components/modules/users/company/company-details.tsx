import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import Icon from "../../../ui/icon";
import Header from "../../../ui/page/header";

import "./index.scss";
import ExternalUsers from "../external-users";
import { useIDContext } from "../../../../context/id.context";
import { createRequest } from "../../../../assets/api";

import dayjs from "dayjs";
import PopupModal from "../../../ui/popup";

interface CompanyDetailsProps {
  id: number;
  name: string;
  location: {
    locationArea: string;
    site: string;
  };
  contractId: string;
  createdAt: string;
  createdBy: string | null;
  members: [];
}
export default function CompanyDetails({}: any) {
  const { valueID, setID } = useIDContext();

  const [company, setCompany] = useState<CompanyDetailsProps>({
    id: 0,
    name: "",
    location: {
      locationArea: "",
      site: "",
    },
    contractId: "",
    createdAt: "",
    createdBy: null,
    members: [],
  });

  const [users, setUsers] = useState("");

  useEffect(() => {
    if (valueID) {
      // Ensure valueID is defined before making the request
      async function getCompanyById() {
        const response = await createRequest(
          `/profile/company/${valueID}`,
          "GET"
        );
        const roleData = response[0]?.data;
        setCompany(roleData);
        setUsers(roleData?.name);
      }
      getCompanyById();
    }
  }, []);

  {
  }
  const companyInfo = [
    {
      id: 1,
      name: "Contract ID:",
      details: company?.contractId,
    },
    {
      id: 2,
      name: "Date Created:",
      details: dayjs(company?.createdAt).format("MMM DD, YYYY • HH:mm A"),
    },
    {
      id: 3,
      name: "Created By:",
      details: company?.createdBy,
    },
    {
      id: 4,
      name: "Total Members:",
      details: company?.members?.length,
    },
    {
      id: 5,
      name: "Location:",
      details: `${company?.location?.locationArea}, ${company?.location?.site}`,
    },
  ];

  const navigateEditCompany = (id: number) => {
    setID(id);
    route("/users/edit-company");
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleBlockRole = async () => {
    const id = valueID;

    const response = await createRequest(`profile/company/block/${id}`, "PUT");
    console.log(response);

    setModalOpen(false);
  };

  return (
    <>
      <Header title="User" />

      <div className="app-page">
        <div className="flex-between">
          <div className="app-create__header">
            <button onClick={() => route("/users")}>
              <Icon name="caret-left" />
            </button>
            <div>
              <h3>{company?.name} </h3>
              <p>All company members are listed below</p>
            </div>
          </div>

          <div className="grid-cols-2 sm-grid-cols-2">
            <button
              className="app-modal__btn--red"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Block
            </button>
            <button
              className="app-modal__btn--yellow"
              onClick={() => {
                navigateEditCompany(company.id);
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="company-header">
          {companyInfo.map((info) => (
            <div className="container" key={info.id}>
              <p>{info.name}</p>
              <span
                className={`${info.name === "Created By:" ? "created" : ""}`}
              >
                {info.details}
              </span>
            </div>
          ))}
        </div>

        <ExternalUsers company={company?.members} />
      </div>

      <div className="">
        {isModalOpen && (
          <PopupModal
            icon={<img src="/svgs/delete_img.png" />} // Pass your custom icon here
            title="Block Company"
            message="Are you sure you want to block this company? This action cannot be undone."
            onClose={() => setModalOpen(false)}
            primaryButton={{
              label: "Delete",
              onClick: handleBlockRole,
              color: "#D30021",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => setModalOpen(false),
              color: "#E86E18",
            }}
          />
        )}
      </div>
    </>
  );
}
