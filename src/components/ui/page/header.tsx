import Icon from "../icon";
import Search from "./search";
import "./index.scss";
import { useUserContext } from "../../../context/user.context";

export default function Header({ title }: { title: string }) {
  const { profile } = useUserContext();

  return (
    <div className="app-page__header">
      <h3>{title}</h3>

      <Search />

      <span className="app-page__header__divider"></span>

      <div className="app-page__header__flag">
        <img src="/svgs/ng.svg" alt="flag" />
      </div>

      <div className="app-page__header__notification">
        <Icon name="notification" />
      </div>

      {/* <div className="app-page__header__profile">
        {profile.firstname[0]}
        {profile.lastname[0]}
      </div> */}
    </div>
  );
}
