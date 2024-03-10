import { Location, Redirect, Router } from "@reach/router";
import React from "react";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Explore from "./pages/explore";
import Explore2 from "./pages/explore2";
import Explore2grey from "./pages/explore2Grey";
import Exploregrey from "./pages/exploreGrey";
import Home from "./pages/home";
import Home1 from "./pages/home1";
import Home1grey from "./pages/home1Grey";
import Home2 from "./pages/home2";
import Home2grey from "./pages/home2Grey";
import Home3 from "./pages/home3";
import HomeGrey from "./pages/homeGrey";
// import Rangking from './pages/rangking';
import Auction from "./pages/Auction";
import Auctiongrey from "./pages/AuctionGrey";
import RankingRedux from "./pages/RankingRedux";
import RankingReduxgrey from "./pages/RankingReduxGrey";
import Colection from "./pages/colection";
import Colectiongrey from "./pages/colectionGrey";
import Helpcenter from "./pages/helpcenter";
import Helpcentergrey from "./pages/helpcenterGrey";
// import ItemDetail from './pages/ItemDetail';
import Author from "./pages/Author";
import AuthorGrey from "./pages/AuthorGrey";
import ItemDetailRedux from "./pages/ItemDetailRedux";
import ItemDetailReduxgrey from "./pages/ItemDetailReduxGrey";
import Minter from "./pages/Minter";
import Mintergrey from "./pages/MinterGrey";
import Accordion from "./pages/accordion";
import Activity from "./pages/activity";
import Activitygrey from "./pages/activityGrey";
import Alerts from "./pages/alerts";
import Contact from "./pages/contact";
import Contactgrey from "./pages/contactGrey";
import Create from "./pages/create";
import Create2 from "./pages/create2";
import Create3 from "./pages/create3";
import Creategrey from "./pages/createGrey";
import Createoption from "./pages/createOptions";
import ElegantIcons from "./pages/elegantIcons";
import EtlineIcons from "./pages/etlineIcons";
import FontAwesomeIcons from "./pages/fontAwesomeIcons";
import Login from "./pages/login";
import Logingrey from "./pages/loginGrey";
import LoginTwo from "./pages/loginTwo";
import LoginTwogrey from "./pages/loginTwoGrey";
import News from "./pages/news";
import NewsSingle from "./pages/newsSingle";
import Price from "./pages/price";
import Progressbar from "./pages/progressbar";
import Register from "./pages/register";
import Registergrey from "./pages/registerGrey";
import Tabs from "./pages/tabs";
import Wallet from "./pages/wallet";
import Works from "./pages/works";

import { createGlobalStyle } from "styled-components";
import { PAGE_ROUTES } from "../constants/routes";
import { MarketplaceProvider } from "../core/marketplace";
import Web3ModalProvider from "../core/modal";

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
          <GlobalStyles />
          <Header />
          <PosedRouter>
            <ScrollTop path={PAGE_ROUTES.ROOT_PATH}>
              <Home exact path={PAGE_ROUTES.ROOT_PATH}>
                <Redirect to={PAGE_ROUTES.HOME_PATH} />
              </Home>
              <HomeGrey path={PAGE_ROUTES.HOME_GREY_PATH} />
              <Home1 path={PAGE_ROUTES.HOME_1_PATH} />
              <Home1grey path={PAGE_ROUTES.HOME_1_GREY_PATH} />
              <Home2 path={PAGE_ROUTES.HOME_2_PATH} />
              <Home2grey path={PAGE_ROUTES.HOME_2_GREY_PATH} />
              <Home3 path={PAGE_ROUTES.HOME_3_PATH} />
              <Explore path={PAGE_ROUTES.EXPLORE_PATH} />
              <Exploregrey path={PAGE_ROUTES.EXPLORE_GREY_PATH} />
              <Explore2 path={PAGE_ROUTES.EXPLORE_2_PATH} />
              <Explore2grey path={PAGE_ROUTES.EXPLORE_2_GREY_PATH} />
              <RankingRedux path={PAGE_ROUTES.RANKING_PATH} />
              <RankingReduxgrey path={PAGE_ROUTES.RANKING_GREY_PATH} />
              <Auction path={PAGE_ROUTES.AUCTION_PATH} />
              <Auctiongrey path={PAGE_ROUTES.AUCTION_GREY_PATH} />
              <Helpcenter path={PAGE_ROUTES.HELPCENTER_PATH} />
              <Helpcentergrey path={PAGE_ROUTES.HELPCENTER_GREY_PATH} />
              <Colection path={PAGE_ROUTES.COLLECTION_PATH} />
              <Colectiongrey path={PAGE_ROUTES.COLLECTION_GREY_PATH} />
              <ItemDetailRedux path={PAGE_ROUTES.ITEM_DETAIL_PATH} />
              <ItemDetailReduxgrey path={PAGE_ROUTES.ITEM_DETAIL_GREY_PATH} />
              <Author path={PAGE_ROUTES.AUTHOR_PATH} />
              <AuthorGrey path={PAGE_ROUTES.AUTHOR_GREY_PATH} />
              <Wallet path={PAGE_ROUTES.WALLET_PATH} />
              <Login path={PAGE_ROUTES.LOGIN_PATH} />
              <Logingrey path={PAGE_ROUTES.LOGIN_GREY_PATH} />
              <LoginTwo path={PAGE_ROUTES.LOGIN_2_PATH} />
              <LoginTwogrey path={PAGE_ROUTES.LOGIN_2_GREY_PATH} />
              <Register path={PAGE_ROUTES.REGISTER_PATH} />
              <Registergrey path={PAGE_ROUTES.REGISTER_GREY_PATH} />
              <Price path={PAGE_ROUTES.PRICE_PATH} />
              <Works path={PAGE_ROUTES.WORKS_PATH} />
              <News path={PAGE_ROUTES.NEWS_PATH} />
              <NewsSingle path={PAGE_ROUTES.NEWS_SINGLE_PATH} />
              <Create path={PAGE_ROUTES.CREATE_PATH} />
              <Creategrey path={PAGE_ROUTES.CREATE_GREY_PATH} />
              <Create2 path={PAGE_ROUTES.CREATE_2_PATH} />
              <Create3 path={PAGE_ROUTES.CREATE_3_PATH} />
              <Createoption path={PAGE_ROUTES.CREATE_OPTIONS_PATH} />
              <Activity path={PAGE_ROUTES.ACTIVITY_PATH} />
              <Activitygrey path={PAGE_ROUTES.ACTIVITY_GREY_PATH} />
              <Contact path={PAGE_ROUTES.CONTACT_PATH} />
              <Contactgrey path={PAGE_ROUTES.CONTACT_GREY_PATH} />
              <ElegantIcons path={PAGE_ROUTES.ELEGANT_ICONS_PATH} />
              <EtlineIcons path={PAGE_ROUTES.ETLINE_ICONS_PATH} />
              <FontAwesomeIcons path={PAGE_ROUTES.FONTAWESOME_ICONS_PATH} />
              <Accordion path={PAGE_ROUTES.ACCORDION_PATH} />
              <Alerts path={PAGE_ROUTES.ALERTS_PATH} />
              <Progressbar path={PAGE_ROUTES.PROGRESSBAR_PATH} />
              <Tabs path={PAGE_ROUTES.TABS_PATH} />
              <Minter path={PAGE_ROUTES.MINTER_PATH} />
              <Mintergrey path={PAGE_ROUTES.MINTER_GREY_PATH} />
            </ScrollTop>
          </PosedRouter>
          <ScrollToTopBtn />
        </MarketplaceProvider>
      </Web3ModalProvider>
    </div>
  );
};

export default App;
