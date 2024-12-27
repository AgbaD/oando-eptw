import { Link, route } from "preact-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../../../ui/dropdown";
import { useEffect, useState } from "preact/hooks";
import Button from "../../../ui/button";
import Icon from "../../../ui/icon";
import { getProcessablePermits } from "../../../../assets/api/permit";
import useRequest from "../../../../hooks/use-request";
import { createRequest } from "../../../../assets/api";
import { useUserContext } from "../../../../context/user.context";
import { toast } from "../../../ui/toast";

export default function SelectPermitRole({}: any) {
  const { response, isLoading } = useRequest(getProcessablePermits, {}, true);
  const { profile } = useUserContext();
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [permissions, sertPermissions] = useState([]);

  useEffect(() => {
    async function getUserProfile() {
      const userResponse = await createRequest(
        `/profile/${profile?.id}`,
        "GET"
      );
      console.log(userResponse);
      setUserRoles(userResponse[0]?.data?.role?.authorities);
      sertPermissions(userResponse[0]?.data?.role?.permissions);
    }

    getUserProfile();
  }, [profile]);

  const handleRoleChange = (permitId, role) => {
    console.log(`Selected Role: ${role} for Permit ID: ${permitId}`); // Debug log
    setSelectedRoles((prevRoles) => {
      const updatedRoles = { ...prevRoles, [permitId]: role };
      console.log("Updated Roles State:", updatedRoles); // Debug log
      return updatedRoles;
    });
  };

  async function onSubmit() {
    const authorities = Object.entries(selectedRoles).map(
      ([permitId, authority]) => ({
        permitId: Number(permitId),
        authority,
      })
    );

    if (authorities.length === 0) {
      toast({
        variant: "error",
        message: "Please select a role for your permits.",
      });
      return;
    }

    try {
      const response: any = await createRequest(
        "/permit/profile/authority",
        "PUT",
        {
          authorities,
        }
      );
      console.log(response);

      if (response?.[0]?.success === true) {
        toast({
          variant: "success",
          message: "Permit roles updated successfully.",
        });
        if (permissions?.includes("FULL_ACCESS")) {
          route("/");
        } else {
          route("/permit-workflows");
        }
      } else if (response?.[1]?.success === false) {
        toast({
          variant: "error",
          message: "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      toast({
        variant: "error",
        message: "An unexpected error occurred, please try again later.",
      });
    }
  }

  return (
    <div className="app-create-permit app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <Link
            href={`${
              permissions?.includes("FULL_ACCESS") ? "/" : "/permit-workflows"
            }`}
          >
            <img
              src="/svgs/logo.eptw.svg"
              alt="eptw_logo"
              className={"permit-logo"}
            />
          </Link>
          <h5>Permit Role</h5>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <div className="app-register__content__header app-create-permit__header">
            <h3>Select Permit Role</h3>
          </div>

          <p>
            For each permit listed below, kindly select the roles you will be
            performing
          </p>
          <br />
          <br />

          <div className="app-section__lg-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PTW ID</TableCell>
                  <TableCell>Work Type</TableCell>
                  <TableCell>Work To Be Performed</TableCell>
                  <TableCell>Work Area</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Option</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {response?.data?.map((data) => (
                  <>
                    <TableRow key={data.publicId}>
                      <TableCell>{data.publicId}</TableCell>
                      <TableCell>{data?.type?.replace(/_/g, " ")}</TableCell>
                      <TableCell>
                        {`${data?.workDescription
                          .charAt(0)
                          .toUpperCase()}${data?.workDescription.slice(1)}`}
                      </TableCell>
                      <TableCell>
                        {data?.workArea} / {data?.location?.locationArea}
                      </TableCell>
                      <TableCell>
                        {data?.entrustedCompany?.name ||
                          data?.executingCompany?.name}
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            {/* Display the selected role or default text */}
                            {selectedRoles[data.id] || "-- select an option --"}
                          </DropdownTrigger>
                          <DropdownContent>
                            {userRoles?.map((role) => (
                              <div
                                className={"base-dropdown__option"}
                                onClick={() => handleRoleChange(data.id, role)}
                                key={role}
                              >
                                {role}
                              </div>
                            ))}
                          </DropdownContent>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                    <br />
                    <br />
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="app-section__sm-table">
            <Table>
              <TableBody>
                {response?.data?.map((dataItem) => (
                  <div key={dataItem.id} className="container">
                    <div className="location-flex">
                      <p>{dataItem.publicId}</p>
                      <h6 className={"gray"}>{dataItem.type}</h6>
                    </div>
                    <p>{dataItem.workDescription}</p>
                    <div className="location-flex">
                      <div className="">
                        <p className={"gray"}>Work Area :</p>
                        <h5>
                          {dataItem?.workArea} /{" "}
                          {dataItem?.location?.locationArea}
                        </h5>
                      </div>
                      <div className="">
                        <p className={"gray"}>Entrusted Company :</p>
                        <h5>
                          {dataItem?.entrustedCompany?.name ||
                            dataItem?.executingCompany?.name}{" "}
                        </h5>
                      </div>
                    </div>
                    <br />

                    <div className="">
                      <Dropdown>
                        <DropdownTrigger>
                          {selectedRoles[dataItem.publicId] ||
                            "-- select an option --"}
                        </DropdownTrigger>
                        <DropdownContent>
                          {userRoles?.map((role) => (
                            <div
                              className={"base-dropdown__option"}
                              onClick={() =>
                                handleRoleChange(dataItem.id, role)
                              }
                              key={role}
                            >
                              {role}
                            </div>
                          ))}
                        </DropdownContent>
                      </Dropdown>
                    </div>
                  </div>
                ))}
              </TableBody>
            </Table>
          </div>

          {!response?.data?.length && (
            <div className="base-empty">
              <img src="/svgs/document.svg" alt="no-data" />
              <div>
                {isLoading ? (
                  <>
                    <p>Fetching processable permits, please wait...</p>
                  </>
                ) : (
                  <div className="">
                    <p>No processable permits yet</p>
                    <Button onClick={() => route("/")} variant="primary">
                      Go to home page
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {response?.data?.length && (
            <div className="app-register__form-footer">
              <Button variant="primary" onClick={onSubmit}>
                Submit
                <Icon name="arrow-right" />
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  route(
                    `${
                      permissions?.includes("FULL_ACCESS")
                        ? "/"
                        : "/permit-workflows"
                    }`
                  )
                }
              >
                Home
              </Button>
            </div>
          )}
        </div>
        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}
