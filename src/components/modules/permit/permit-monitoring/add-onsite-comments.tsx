import { Accordion, AccordionGap, AccordionItem } from "../../../ui/accordion";
import Button from "../../../ui/button";
import Icon from "../../../ui/icon";

export default function AddOnsiteComments() {
  const permit = [];
  if (permit.length === 0) {
    return (
      <div className="base-empty">
        <img src="/svgs/comments.svg" />
        <p>
          No notes or comments yet.
          <br />
          Click the button below to add a note
        </p>

        <Button variant="primary" dimension="md" href={`/add-onsite-comments`}>
          <Icon name="plus" />
          Add Onsite Note
        </Button>
      </div>
    );
  }

  return (
    <div className="app-section">
      <Button variant="primary" dimension="md" href={`/add-onsite-comments`}>
        <Icon name="plus" />
        Add Onsite Note
      </Button>
      <br />
      <br />

      <Accordion show title="All Notes">
        <AccordionItem title="Date" value={""} />
        <AccordionItem title="Posted by" value={""} />
        <AccordionItem title="Note / Comments" value={""} />

        <AccordionGap />

        <AccordionItem title="Date" value={""} />
        <AccordionItem title="Posted by" value={""} />
        <AccordionItem title="Note / Comments" value={""} />

        <AccordionGap />

        <AccordionItem title="Date" value={""} />
        <AccordionItem title="Posted by" value={""} />
        <AccordionItem title="Note / Comments" value={""} />
      </Accordion>
    </div>
  );
}
