import dayjs from "dayjs";
import { useUserContext } from "../../../context/user.context";
import { Accordion, AccordionItem } from "../../ui/accordion";
import Header from "../../ui/page/header";
import "./index.scss";
import { getInitials } from "../../../assets/utils";
import { useEffect, useState } from "preact/hooks";

import { createRequest } from "../../../assets/api";

export default function Profile({}: any) {
  const { profile } = useUserContext();
  console.log(profile);

  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const getUserProfile = async () => {
      const userResponse = await createRequest(
        `/profile/${profile?.id}`,
        "GET"
      );
      console.log(userResponse);
      setUserDetails(userResponse[0].data);
    };
    if (profile) {
      getUserProfile();
    }
  }, []);

  return (
    <>
      <Header title="Profile" />

      <div className="app-page">
        <Accordion title="Personal Details" show>
          <AccordionItem
            title="Profile Photo"
            value={
              <div className="app-profile__avatar ">
                {getInitials(profile.fullname)}
              </div>
            }
          />
          <AccordionItem title="Full Name" value={`${profile.fullname}`} />
          <AccordionItem title="Email Address" value={profile.email} />
        </Accordion>

        <Accordion title="Role Details" show>
          <AccordionItem title="Role" value={userDetails.role?.name ?? "---"} />
          <AccordionItem
            title="Location"
            value={`${userDetails.location?.locationArea}, ${userDetails.location?.site}`}
          />
          <AccordionItem
            title="Date Joined"
            value={dayjs(profile.createdAt).format("MMM DD, YYYY  HH:mm A")}
          />
        </Accordion>
      </div>
    </>
  );
}
