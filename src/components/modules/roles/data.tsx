import useRequest from "../../../hooks/use-request";
import { getRoles } from "../../../assets/api/user";

async function getRoleByID() {
  const { response } = await useRequest(getRoles(), {}, true);
  console.log("my response is: ", response?.data);
}

export default getRoleByID;
