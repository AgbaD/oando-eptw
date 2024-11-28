import useRequest from "../../../hooks/use-request";
import { getRole, getRoles } from "../../../assets/api/user";
import { useIDContext } from "../../../context/id.context";

const { valueID } = useIDContext();

async function getRoleByID() {
  const { response } = await useRequest(getRoles(), {}, true);
  console.log("my response is: ", response?.data);
}

export default getRoleByID;
