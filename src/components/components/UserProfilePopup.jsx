import { ADDRESS_KEY } from "../../constants/keys";
import { useAuth } from "../../core/auth";

function UserProfilePopup() {
  const { user } = useAuth();

  return (
    <div className="popshow">
      <div className="d-name">
        <h4>{user.username}</h4>
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
        <li>
          <span>
            <i className="fa fa-pencil"></i> Edit profile
          </span>
        </li>
        <li>
          <span>
            <i className="fa fa-sign-out"></i> Sign out
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfilePopup;
