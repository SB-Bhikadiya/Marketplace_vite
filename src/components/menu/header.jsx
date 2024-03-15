import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { NavLink as Link } from "react-router-dom";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { PAGE_ROUTES } from "../../constants/routes";
import UserProfilePopup from "../components/UserProfilePopup";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link {...props} activeClassName="active" className="non-active" />
);

const Header = function () {
  const [openExploreMenu, setOpenExploreMenu] = React.useState(false);
  const [openPagesMenu, setOpenPagesMenu] = React.useState(false);
  const [openIconsMenu, setOpenIconsMenu] = React.useState(false);

  const handleExploreMenuBtnClick = () => {
    setOpenExploreMenu(!openExploreMenu);
  };
  const handlePagesMenuBtnClick = () => {
    setOpenPagesMenu(!openPagesMenu);
  };
  const handleIconsMenuBtnClick = () => {
    setOpenIconsMenu(!openIconsMenu);
  };

  const closeExploreMenu = () => {
    setOpenExploreMenu(false);
  };
  const closePagesMenu = () => {
    setOpenPagesMenu(false);
  };
  const closeIconsMenu = () => {
    setOpenIconsMenu(false);
  };

  const refExploreMenu = useOnclickOutside(() => {
    closeExploreMenu();
  });
  const refPagesMenu = useOnclickOutside(() => {
    closePagesMenu();
  });
  const refIconsMenu = useOnclickOutside(() => {
    closeIconsMenu();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header id="myHeader" className="navbar white">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to={PAGE_ROUTES.ROOT_PATH}>
                <img
                  src="/img/logo.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img src="/img/logo-2.png" className="img-fluid d-3" alt="#" />
                <img src="/img/logo-3.png" className="img-fluid d-4" alt="#" />
                <img
                  src="/img/logo-light.png"
                  className="img-fluid d-none"
                  alt="#"
                />
              </NavLink>
            </div>
          </div>

          <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to={PAGE_ROUTES.HOME_PATH}>
                      <div>
                        <div className="dropdown-custom btn">Home</div>
                      </div>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <div ref={refExploreMenu}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleExploreMenuBtnClick}
                      >
                        Explore
                      </div>
                      {openExploreMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeExploreMenu}>
                            <NavLink
                              to={PAGE_ROUTES.EXPLORE_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Explore
                            </NavLink>

                            <NavLink
                              to={PAGE_ROUTES.RANKING_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Ranking
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_COLLECTION_PATH(1)}`}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Collection
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_ITEM_DETAIL_PATH(1)}`}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Items Details
                            </NavLink>

                            <NavLink
                              to={PAGE_ROUTES.AUCTION_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Live Auction
                            </NavLink>

                            <NavLink
                              to={PAGE_ROUTES.HELPCENTER_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Help Center
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div ref={refPagesMenu}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handlePagesMenuBtnClick}
                      >
                        Pages
                      </div>
                      {openPagesMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closePagesMenu}>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_AUTHOR_PATH(1)}`}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Author
                            </NavLink>

                            <NavLink
                              to={PAGE_ROUTES.WALLET_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Wallet
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.CREATE_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.CREATE_LISTING_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create Listing
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.CREATE_OPTIONS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create options
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.NEWS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              News
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.LOGIN_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Login
                            </NavLink>

                            <NavLink
                              to={PAGE_ROUTES.REGISTER_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Register
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.CONTACT_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Contact Us
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink
                      to={PAGE_ROUTES.ACTIVITY_PATH}
                      onClick={() => btn_icon(!showmenu)}
                    >
                      Activity
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <NavLink to={PAGE_ROUTES.HOME_PATH}>
                    <div>
                      <div className="dropdown-custom btn">
                        Home
                        <span className="lines"></span>
                      </div>
                    </div>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <div ref={refExploreMenu}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleExploreMenuBtnClick}
                      onMouseLeave={closeExploreMenu}
                    >
                      Explore
                      <span className="lines"></span>
                      {openExploreMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeExploreMenu}>
                            <NavLink to={PAGE_ROUTES.EXPLORE_PATH}>
                              Explore
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.RANKING_PATH}>
                              Ranking
                            </NavLink>

                            <NavLink
                              to={`${PAGE_ROUTES.GET_COLLECTION_PATH(1)}`}
                            >
                              Collection
                            </NavLink>

                            <NavLink
                              to={`${PAGE_ROUTES.GET_ITEM_DETAIL_PATH(1)}`}
                            >
                              Items Details
                            </NavLink>

                            <NavLink to={PAGE_ROUTES.AUCTION_PATH}>
                              Live Auction
                            </NavLink>

                            <NavLink to={PAGE_ROUTES.HELPCENTER_PATH}>
                              Help Center
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <div ref={refPagesMenu}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handlePagesMenuBtnClick}
                      onMouseLeave={closePagesMenu}
                    >
                      Pages
                      <span className="lines"></span>
                      {openPagesMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closePagesMenu}>
                            <NavLink to={`${PAGE_ROUTES.GET_AUTHOR_PATH(1)}`}>
                              Author
                            </NavLink>

                            <NavLink to={PAGE_ROUTES.WALLET_PATH}>
                              Wallet
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_PATH}>
                              Create
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_COLLECTION_PATH}>
                              Create Collection
                            </NavLink>

                            <NavLink to={PAGE_ROUTES.CREATE_LISTING_PATH}>
                              Create Listing
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_OPTIONS_PATH}>
                              Create Option
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.NEWS_PATH}>News</NavLink>

                            <NavLink to={PAGE_ROUTES.LOGIN_PATH}>Login</NavLink>

                            <NavLink to={PAGE_ROUTES.REGISTER_PATH}>
                              Register
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CONTACT_PATH}>
                              Contact Us
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink to={PAGE_ROUTES.ACTIVITY_PATH}>
                    Activity
                    <span className="lines"></span>
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            <div className="connect-wal">
              <NavLink to={PAGE_ROUTES.WALLET_PATH}>Connect Wallet</NavLink>
            </div>
            <div className="logout">
              <NavLink to={PAGE_ROUTES.CREATE_OPTIONS_PATH}>Create</NavLink>
              <div
                id="de-click-menu-notification"
                className="de-menu-notification"
                onClick={() => btn_icon_not(!shownot)}
                ref={refpopnot}
              >
                <div className="d-count">8</div>
                <i className="fa fa-bell"></i>
                {shownot && (
                  <div className="popshow">
                    <div className="de-flex">
                      <h4>Notifications</h4>
                      <span className="viewaall">Show all</span>
                    </div>
                    <ul>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-2.jpg"
                            alt=""
                          />

                          <div className="d-desc">
                            <span className="d-name">
                              <b>Mamie Barnett</b> started following you
                            </span>
                            <span className="d-time">1 hour ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-3.jpg"
                            alt=""
                          />

                          <div className="d-desc">
                            <span className="d-name">
                              <b>Nicholas Daniels</b> liked your item
                            </span>
                            <span className="d-time">2 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-4.jpg"
                            alt=""
                          />

                          <div className="d-desc">
                            <span className="d-name">
                              <b>Lori Hart</b> started following you
                            </span>
                            <span className="d-time">18 hours ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-5.jpg"
                            alt=""
                          />

                          <div className="d-desc">
                            <span className="d-name">
                              <b>Jimmy Wright</b> liked your item
                            </span>
                            <span className="d-time">1 day ago</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="mainnot">
                          <img
                            className="lazy"
                            src="../../img/author/author-6.jpg"
                            alt=""
                          />

                          <div className="d-desc">
                            <span className="d-name">
                              <b>Karla Sharp</b> started following you
                            </span>
                            <span className="d-time">3 days ago</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div
                id="de-click-menu-profile"
                className="de-menu-profile"
                onClick={() => btn_icon_pop(!showpop)}
                ref={refpop}
              >
                <img
                  src="../../img/author_single/author_thumbnail.jpg"
                  alt=""
                />
                {showpop && <UserProfilePopup />}
              </div>
            </div>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
