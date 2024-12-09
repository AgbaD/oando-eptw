import { useEffect } from "preact/hooks";
import { getOverview } from "../../../assets/api/overview";
import useRequest from "../../../hooks/use-request";
import Header from "../../ui/page/header";
import Drafts from "./drafts";
import "./index.scss";
import Permits from "./permits";
import Stats from "./stats";

import { useDraftDetails } from "../../../context/draft-details.context";

export default function Overview({}: any) {
  const { response } = useRequest(getOverview, {}, true);

  const metrics = response?.data;
  const closedPermits = response?.data?.closedPermits;
  const drafts = response?.data?.drafts;

  const { updateIsDraft } = useDraftDetails();

  useEffect(() => {
    updateIsDraft(false);
  }, []);

  return (
    <>
      <Header title="Overview" />

      <div className="app-page app-overview__grid">
        <div>
          <Stats {...{ metrics }} />

          <div className="hide-display-web">
            <Drafts {...{ drafts }} />
          </div>

          <Permits {...{ closedPermits }} />
        </div>

        <div className="hide-display-mobile">
          <Drafts {...{ drafts }} />
        </div>
      </div>
    </>
  );
}
