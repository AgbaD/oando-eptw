import dayjs from "dayjs";
import { useUserContext } from "../../../context/user.context";
import { Accordion, AccordionItem } from "../../ui/accordion";
import Header from "../../ui/page/header";
import "./index.scss";

export default function Profile({}: any) {
  const { profile } = useUserContext();
  console.log(profile);

  return (
    <>
      <Header title="Profile" />

      <div className="app-page">
        <Accordion title="Personal Details" show>
          <AccordionItem
            title="Profile Photo"
            value={<div className="app-profile__avatar ">{profile.firstname[0]}</div>}
          />
          <AccordionItem
            title="Full Name"
            value={`${profile.firstname} ${profile.lastname}`}
          />
          <AccordionItem title="Email Address" value={profile.email} />
        </Accordion>

        <Accordion title="Role Details" show>
          <AccordionItem title="Role" value={profile.role?.name ?? "---"} />
          <AccordionItem
            title="Location"
            value={profile.location?.address ?? "---"}
          />
          <AccordionItem
            title="Date Joined"
            value={dayjs(profile.createdAt).format(
              "MMM DD, YYYY  HH:mm A"
            )}
          />
        </Accordion>
      </div>
    </>
  );
}
