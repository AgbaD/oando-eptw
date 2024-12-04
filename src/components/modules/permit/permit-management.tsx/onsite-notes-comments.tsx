import { usePermitDetails } from "../../../../context/permit-details.context";

export default function OnsiteNotes() {
  const { permit } = usePermitDetails();
  const onsiteNotes = permit?.onsiteNotes;
  return (
    <>
      <div className="">
        {onsiteNotes?.length === 0 ? (
          <div className="base-empty">
            <img src="/svgs/checklist.png" />
            <p>
              Onsite notes & comments will be active once the permit has been
              approved and now on-site.
            </p>
          </div>
        ) : (
          <>
            {onsiteNotes?.map((note) => (
              <p>{note}</p>
            ))}
          </>
        )}
      </div>
    </>
  );
}
