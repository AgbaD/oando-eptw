import { getOverview } from "../../../assets/api/overview";
import useRequest from "../../../hooks/use-request";
import Header from "../../ui/page/header";
import Drafts from "./drafts";
import "./index.scss";
import PendingActions from "./pending-actions";
import Permits from "./permits";
import Stats from "./stats";

export default function Overview({}: any) {
  const { response } = useRequest(getOverview, {}, true);
  const { metrics, drafts, approvedPermits } = response?.data ?? {};

  return (
    <>
      <Header title="Overview" />

      <div className="app-page app-overview__grid">
        <div>
          <Stats {...{ metrics }} />
          <Permits {...{ approvedPermits }} />
        </div>

        <div>
          <Drafts {...{ drafts }} />
          <PendingActions />
        </div>
      </div>
    </>
  );
}
