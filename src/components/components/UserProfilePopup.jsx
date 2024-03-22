import { useNavigate } from "react-router-dom";
import { ADDRESS_KEY, USER_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/routes";
import { useAuth } from "../../core/auth";

function UserProfilePopup() {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="popshow">
      <div className="d-name">
        {user && user.avatar ? (
          <img src={user.avatar} alt="" />
        ) : (
          <div className="de-menu-notification">
            <i className="fa fa-user" height={40} width={40}></i>
          </div>
        )}
        <h4>{user && user.username}</h4>
        <span className="name" onClick={() => window.open("", "_self")}>
          Set display name
        </span>
      </div>
      <div className="d-wallet">
        <h4>My Wallet</h4>
        <span id="wallet" className="d-wallet-address">
          {localStorage.getItem(ADDRESS_KEY)}
        </span>
        <button id="btn_copy" title="Copy Text">
          Copy
        </button>
      </div>
      <div className="d-line"></div>
      <ul className="de-submenu-profile">
        <li>
          <span>
            <i className="fa fa-user"></i> My profile
          </span>
        </li>
        <li
          onClick={() => {
            navigate(PAGE_ROUTES.PROFILE_PATH);
          }}
        >
          <span>
            <i className="fa fa-pencil"></i> Edit profile
          </span>
        </li>
        <li
          onClick={() => {
            logout();
            navigate(PAGE_ROUTES.LOGIN_PATH);
          }}
        >
          <span>
            <i className="fa fa-sign-out"></i> Sign out
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfilePopup;
