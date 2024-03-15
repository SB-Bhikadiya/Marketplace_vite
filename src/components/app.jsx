import { Location, Redirect, Router } from "@reach/router";
import React from "react";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Explore from "./pages/explore";
import Explore2 from "./pages/explore2";
import Home from "./pages/home";
import Home1 from "./pages/home1";
import Home2 from "./pages/home2";
import Home3 from "./pages/home3";
// import Rangking from './pages/rangking';
import Auction from "./pages/Auction";
import RankingRedux from "./pages/RankingRedux";
import Collection from "./pages/collection";
import Helpcenter from "./pages/helpcenter";
// import ItemDetail from './pages/ItemDetail';
import Author from "./pages/Author";
import ItemDetailRedux from "./pages/ItemDetailRedux";
import Minter from "./pages/Minter";
import Accordion from "./pages/accordion";
import Activity from "./pages/activity";
import Alerts from "./pages/alerts";
import Contact from "./pages/contact";
import Create from "./pages/create";
import Create3 from "./pages/create3";
import Createoption from "./pages/createOptions";
import ElegantIcons from "./pages/elegantIcons";
import EtlineIcons from "./pages/etlineIcons";
import FontAwesomeIcons from "./pages/fontAwesomeIcons";
import Login from "./pages/login";
import LoginTwo from "./pages/loginTwo";
import News from "./pages/news";
import NewsSingle from "./pages/newsSingle";
import Price from "./pages/price";
import Progressbar from "./pages/progressbar";
import Register from "./pages/register";
import Tabs from "./pages/tabs";
import Wallet from "./pages/wallet";

import { createGlobalStyle } from "styled-components";
import { PAGE_ROUTES } from "../constants/routes";
import { AuthProvider } from "../core/auth";
import { MarketplaceProvider } from "../core/marketplace";
import Web3ModalProvider from "../core/modal";
import PrivateRoute from "../core/private-route";
import CreateCollection from "./pages/CreateCollection";
import CreateAuction from "./pages/createAuction";
import CreateListing from "./pages/createListing";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location}>{children}</Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  return (
    <div className="wraper">
      <Web3ModalProvider>
        <MarketplaceProvider>
          <AuthProvider>
            <GlobalStyles />
            <Header />
            <PosedRouter>
              <ScrollTop path={PAGE_ROUTES.ROOT_PATH}>
                <Home exact path={PAGE_ROUTES.ROOT_PATH}>
                  <Redirect to={PAGE_ROUTES.HOME_PATH} />
                </Home>
                <Login path={PAGE_ROUTES.LOGIN_PATH} />
                <Register path={PAGE_ROUTES.REGISTER_PATH} />
                <PrivateRoute
                  path={PAGE_ROUTES.HOME_1_PATH}
                  component={Home1}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.HOME_2_PATH}
                  component={Home2}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.HOME_3_PATH}
                  component={Home3}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.EXPLORE_PATH}
                  component={Explore}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.EXPLORE_2_PATH}
                  component={Explore2}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.RANKING_PATH}
                  component={RankingRedux}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.AUCTION_PATH}
                  component={Auction}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.HELPCENTER_PATH}
                  component={Helpcenter}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.COLLECTION_PATH}
                  component={Collection}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ITEM_DETAIL_PATH}
                  component={ItemDetailRedux}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.AUTHOR_PATH}
                  component={Author}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.WALLET_PATH}
                  component={Wallet}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.LOGIN_2_PATH}
                  component={LoginTwo}
                />
                <PrivateRoute path={PAGE_ROUTES.PRICE_PATH} component={Price} />
                <PrivateRoute path={PAGE_ROUTES.NEWS_PATH} component={News} />
                <PrivateRoute
                  path={PAGE_ROUTES.NEWS_SINGLE_PATH}
                  component={NewsSingle}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_PATH}
                  component={Create}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_COLLECTION_PATH}
                  component={CreateCollection}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_LISTING_PATH}
                  component={CreateListing}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_AUCTION_PATH}
                  component={CreateAuction}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_3_PATH}
                  component={Create3}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CREATE_OPTIONS_PATH}
                  component={Createoption}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ACTIVITY_PATH}
                  component={Activity}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.CONTACT_PATH}
                  component={Contact}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ELEGANT_ICONS_PATH}
                  component={ElegantIcons}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ETLINE_ICONS_PATH}
                  component={EtlineIcons}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.FONTAWESOME_ICONS_PATH}
                  component={FontAwesomeIcons}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ACCORDION_PATH}
                  component={Accordion}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.ALERTS_PATH}
                  component={Alerts}
                />
                <PrivateRoute
                  path={PAGE_ROUTES.PROGRESSBAR_PATH}
                  component={Progressbar}
                />
                <PrivateRoute path={PAGE_ROUTES.TABS_PATH} component={Tabs} />
                <PrivateRoute
                  path={PAGE_ROUTES.MINTER_PATH}
                  component={Minter}
                />
              </ScrollTop>
            </PosedRouter>
          </AuthProvider>
          <ScrollToTopBtn />
        </MarketplaceProvider>
      </Web3ModalProvider>
    </div>
  );
};

export default App;
