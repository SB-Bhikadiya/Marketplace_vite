import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { PAGE_ROUTES } from "../../constants/routes";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function () {
  const [openHomeMenu, setOpenHomeMenu] = React.useState(false);
  const [openExploreMenu, setOpenExploreMenu] = React.useState(false);
  const [openPagesMenu, setOpenPagesMenu] = React.useState(false);
  const [openIconsMenu, setOpenIconsMenu] = React.useState(false);
  const handleHomeMenuBtnClick = () => {
    setOpenHomeMenu(!openHomeMenu);
  };
  const handleExploreMenuBtnClick = () => {
    setOpenExploreMenu(!openExploreMenu);
  };
  const handlePagesMenuBtnClick = () => {
    setOpenPagesMenu(!openPagesMenu);
  };
  const handleIconsMenuBtnClick = () => {
    setOpenIconsMenu(!openIconsMenu);
  };
  const closeHomeMenu = () => {
    setOpenHomeMenu(false);
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

  const refHomeMenu = useOnclickOutside(() => {
    closeHomeMenu();
  });
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
      if (window.pageYOffset > sticky) {
        closeHomeMenu();
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
                    <div ref={refHomeMenu}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleHomeMenuBtnClick}
                      >
                        Home
                      </div>
                      {openHomeMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeHomeMenu}>
                            <NavLink
                              to={PAGE_ROUTES.HOME_GREY_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage Grey
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_1_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 1
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_1_GREY_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 1 Grey
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_2_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 2
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_2_GREY_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 2 Grey
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.HOME_3_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Homepage 3
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
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
                              to={PAGE_ROUTES.EXPLORE_2_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Explore 2
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
                              to={`${PAGE_ROUTES.GET_ITEM_DETAIL_GREY_PATH(1)}`}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Items Details Grey
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.AUCTION_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Live Auction
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.AUCTION_GREY_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Live Auction Grey
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
                              to={`${PAGE_ROUTES.GET_AUTHOR_GREY_PATH(1)}`}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Author Grey
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
                              to={PAGE_ROUTES.CREATE_2_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create 2
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.CREATE_OPTIONS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Create options
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.MINT_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Nft Minting
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.MINTER_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Nft Minting Grey
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.NEWS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              News
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.GALLERY_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Gallery
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.LOGIN_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Login
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.LOGIN_2_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Login 2
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
                  <div className="navbar-item">
                    <div ref={refIconsMenu}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleIconsMenuBtnClick}
                      >
                        Element
                      </div>
                      {openIconsMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeIconsMenu}>
                            <NavLink
                              to={PAGE_ROUTES.ELEGANT_ICONS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Elegant Icon
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.ETLINE_ICONS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Etline Icon
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.FONT_AWESOME_ICONS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Font Awesome Icon
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.ACCORDION_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Accordion
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.ALERTS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Alerts
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.PRICE_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Pricing Table
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.PROGRESS_BAR_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Progress bar
                            </NavLink>
                            <NavLink
                              to={PAGE_ROUTES.TABS_PATH}
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Tabs
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <div ref={refHomeMenu}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleHomeMenuBtnClick}
                      onMouseLeave={closeHomeMenu}
                    >
                      Home
                      <span className="lines"></span>
                      {openHomeMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeHomeMenu}>
                            <NavLink to={PAGE_ROUTES.HOME_GREY_PATH}>
                              Homepage Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.ROOT_PATH}>
                              Homepage
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HOME_1_PATH}>
                              Homepage 1
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HOME_1_GREY_PATH}>
                              Homepage 1 Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HOME_2_PATH}>
                              Homepage 2
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HOME_2_GREY_PATH}>
                              Homepage 2 Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HOME_3_PATH}>
                              Homepage 3
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                            <NavLink to={PAGE_ROUTES.EXPLORE_GREY_PATH}>
                              Explore Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.EXPLORE_2_PATH}>
                              Explore 2
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.EXPLORE_2_GREY_PATH}>
                              Explore 2 Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.RANKING_PATH}>
                              Ranking
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.RANKING_GREY_PATH}>
                              Ranking Grey
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_COLLECTION_PATH(1)}`}
                            >
                              Collection
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_COLLECTION_GREY_PATH(1)}`}
                            >
                              Collection Grey
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_ITEM_DETAIL_PATH(1)}`}
                            >
                              Items Details
                            </NavLink>
                            <NavLink
                              to={`${PAGE_ROUTES.GET_ITEM_DETAIL_GREY_PATH(1)}`}
                            >
                              Items Details Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.AUCTION_PATH}>
                              Live Auction
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.AUCTION_GREY_PATH}>
                              Live Auction Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HELPCENTER_PATH}>
                              Help Center
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.HELPCENTER_GREY_PATH}>
                              Help Center Grey
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
                            <NavLink
                              to={`${PAGE_ROUTES.GET_AUTHOR_GREY_PATH(1)}`}
                            >
                              Author Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.WALLET_PATH}>
                              Wallet
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_PATH}>
                              Create
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_GREY_PATH}>
                              Create Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_2_PATH}>
                              Create 2
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.CREATE_OPTIONS_PATH}>
                              Create Option
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.MINTER_PATH}>
                              Nft Minting
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.MINTER_GREY_PATH}>
                              Nft Minting Grey
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.NEWS_PATH}>News</NavLink>
                            <NavLink to={PAGE_ROUTES.GALLERY_PATH}>
                              Gallery
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.LOGIN_PATH}>login</NavLink>
                            <NavLink to={PAGE_ROUTES.LOGIN_2_PATH}>
                              login 2
                            </NavLink>
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
                <div className="navbar-item">
                  <div ref={refIconsMenu}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleIconsMenuBtnClick}
                      onMouseLeave={closeIconsMenu}
                    >
                      Elements
                      <span className="lines"></span>
                      {openIconsMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeIconsMenu}>
                            <NavLink to={PAGE_ROUTES.ELEGANT_ICONS_PATH}>
                              Elegant Icon
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.ETLINE_ICONS_PATH}>
                              Etline Icon
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.FONTAWESOME_ICONS_PATH}>
                              Font Awesome Icon
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.ACCORDION_PATH}>
                              Accordion
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.ALERTS_PATH}>
                              Alerts
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.PRICE_PATH}>
                              Pricing Table
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.PROGRESSBAR_PATH}>
                              Progress Bar
                            </NavLink>
                            <NavLink to={PAGE_ROUTES.TABS_PATH}>Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                {showpop && (
                  <div className="popshow">
                    <div className="d-name">
                      <h4>Monica Lucas</h4>
                      <span
                        className="name"
                        onClick={() => window.open("", "_self")}
                      >
                        Set display name
                      </span>
                    </div>
                    <div className="d-balance">
                      <h4>Balance</h4>
                      12.858 ETH
                    </div>
                    <div className="d-wallet">
                      <h4>My Wallet</h4>
                      <span id="wallet" className="d-wallet-address">
                        DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME
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
                )}
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
