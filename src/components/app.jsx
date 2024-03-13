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
import Works from "./pages/works";

import { createGlobalStyle } from "styled-components";
import { PAGE_ROUTES } from "../constants/routes";
import { AuthProvider } from "../core/auth";
import { MarketplaceProvider } from "../core/marketplace";
import Web3ModalProvider from "../core/modal";
import useAlert from "./components/Alert";
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
  const { AlertComponent } = useAlert();

  return (
    <div className="wraper">
      <Web3ModalProvider>
        <MarketplaceProvider>
          <GlobalStyles />
          <Header />
          {AlertComponent && <AlertComponent />}
          <AuthProvider>
            <PosedRouter>
              <ScrollTop path={PAGE_ROUTES.ROOT_PATH}>
                <Home exact path={PAGE_ROUTES.ROOT_PATH}>
                  <Redirect to={PAGE_ROUTES.HOME_PATH} />
                </Home>
                <Home1 path={PAGE_ROUTES.HOME_1_PATH} />
                <Home2 path={PAGE_ROUTES.HOME_2_PATH} />
                <Home3 path={PAGE_ROUTES.HOME_3_PATH} />
                <Explore path={PAGE_ROUTES.EXPLORE_PATH} />
                <Explore2 path={PAGE_ROUTES.EXPLORE_2_PATH} />
                <RankingRedux path={PAGE_ROUTES.RANKING_PATH} />
                <Auction path={PAGE_ROUTES.AUCTION_PATH} />
                <Helpcenter path={PAGE_ROUTES.HELPCENTER_PATH} />
                <Collection path={PAGE_ROUTES.COLLECTION_PATH} />
                <ItemDetailRedux path={PAGE_ROUTES.ITEM_DETAIL_PATH} />
                <Author path={PAGE_ROUTES.AUTHOR_PATH} />
                <Wallet path={PAGE_ROUTES.WALLET_PATH} />
                <Login path={PAGE_ROUTES.LOGIN_PATH} />
                <LoginTwo path={PAGE_ROUTES.LOGIN_2_PATH} />
                <Register path={PAGE_ROUTES.REGISTER_PATH} />
                <Price path={PAGE_ROUTES.PRICE_PATH} />
                <Works path={PAGE_ROUTES.WORKS_PATH} />
                <News path={PAGE_ROUTES.NEWS_PATH} />
                <NewsSingle path={PAGE_ROUTES.NEWS_SINGLE_PATH} />
                <Create path={PAGE_ROUTES.CREATE_PATH} />
                <CreateCollection path={PAGE_ROUTES.CREATE_COLLECTION_PATH} />
                <CreateListing path={PAGE_ROUTES.CREATE_LISTING_PATH} />
                <CreateAuction path={PAGE_ROUTES.CREATE_AUCTION_PATH} />
                <Create3 path={PAGE_ROUTES.CREATE_3_PATH} />
                <Createoption path={PAGE_ROUTES.CREATE_OPTIONS_PATH} />
                <Activity path={PAGE_ROUTES.ACTIVITY_PATH} />
                <Contact path={PAGE_ROUTES.CONTACT_PATH} />
                <ElegantIcons path={PAGE_ROUTES.ELEGANT_ICONS_PATH} />
                <EtlineIcons path={PAGE_ROUTES.ETLINE_ICONS_PATH} />
                <FontAwesomeIcons path={PAGE_ROUTES.FONTAWESOME_ICONS_PATH} />
                <Accordion path={PAGE_ROUTES.ACCORDION_PATH} />
                <Alerts path={PAGE_ROUTES.ALERTS_PATH} />
                <Progressbar path={PAGE_ROUTES.PROGRESSBAR_PATH} />
                <Tabs path={PAGE_ROUTES.TABS_PATH} />
                <Minter path={PAGE_ROUTES.MINTER_PATH} />
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
