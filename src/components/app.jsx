import React from "react";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Explore from "./pages/explore";
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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { PAGE_ROUTES } from "../constants/routes";
import { AuthProvider } from "../core/auth";
import { MarketplaceProvider } from "../core/marketplace";
import Web3ModalProvider from "../core/modal";
import "../core/sweet-alert";
import CreateCollection from "./pages/CreateCollection";
import CreateAuction from "./pages/createAuction";
import CreateListing from "./pages/createListing";
import Profile from "./pages/profile";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

const App = () => {
  return (
    <div className="wraper">
      <BrowserRouter basename="/">
        <Web3ModalProvider>
          <AuthProvider>
            <MarketplaceProvider>
              <GlobalStyles />
              <Header />
              <ScrollTop path={PAGE_ROUTES.ROOT_PATH}>
                <Routes>
                  <Route
                    exact
                    path={PAGE_ROUTES.ROOT_PATH}
                    element={<Home />}
                  />
                  <Route path={PAGE_ROUTES.LOGIN_PATH} element={<Login />} />
                  <Route
                    path={PAGE_ROUTES.PROFILE_PATH}
                    element={<Profile />}
                  />

                  <Route
                    path={PAGE_ROUTES.REGISTER_PATH}
                    element={<Register />}
                  />
                  <Route path={PAGE_ROUTES.HOME_1_PATH} element={<Home1 />} />
                  <Route path={PAGE_ROUTES.HOME_2_PATH} element={<Home2 />} />
                  <Route path={PAGE_ROUTES.HOME_3_PATH} element={<Home3 />} />
                  <Route
                    exact
                    path={PAGE_ROUTES.EXPLORE_PATH}
                    element={<Explore />}
                  />

                  <Route
                    path={PAGE_ROUTES.RANKING_PATH}
                    element={<RankingRedux />}
                  />
                  <Route
                    path={PAGE_ROUTES.AUCTION_PATH}
                    element={<Auction />}
                  />
                  <Route
                    path={PAGE_ROUTES.HELPCENTER_PATH}
                    element={<Helpcenter />}
                  />
                  <Route
                    path={PAGE_ROUTES.COLLECTION_PATH}
                    element={<Collection />}
                  />
                  <Route
                    path={PAGE_ROUTES.ITEM_DETAIL_PATH}
                    element={<ItemDetailRedux />}
                  />
                  <Route path={PAGE_ROUTES.AUTHOR_PATH} element={<Author />} />
                  <Route path={PAGE_ROUTES.WALLET_PATH} element={<Wallet />} />
                  <Route
                    path={PAGE_ROUTES.LOGIN_2_PATH}
                    element={<LoginTwo />}
                  />
                  <Route path={PAGE_ROUTES.PRICE_PATH} element={<Price />} />
                  <Route path={PAGE_ROUTES.NEWS_PATH} element={<News />} />
                  <Route
                    path={PAGE_ROUTES.NEWS_SINGLE_PATH}
                    element={<NewsSingle />}
                  />
                  <Route path={PAGE_ROUTES.CREATE_PATH} element={<Create />} />
                  <Route
                    path={PAGE_ROUTES.CREATE_COLLECTION_PATH}
                    element={<CreateCollection />}
                  />
                  <Route
                    path={PAGE_ROUTES.CREATE_LISTING_PATH}
                    element={<CreateListing />}
                  />
                  <Route
                    path={PAGE_ROUTES.CREATE_AUCTION_PATH}
                    element={<CreateAuction />}
                  />
                  <Route
                    path={PAGE_ROUTES.CREATE_3_PATH}
                    element={<Create3 />}
                  />
                  <Route
                    path={PAGE_ROUTES.CREATE_OPTIONS_PATH}
                    element={<Createoption />}
                  />
                  <Route
                    path={PAGE_ROUTES.ACTIVITY_PATH}
                    element={<Activity />}
                  />
                  <Route
                    path={PAGE_ROUTES.CONTACT_PATH}
                    element={<Contact />}
                  />
                  <Route
                    path={PAGE_ROUTES.ELEGANT_ICONS_PATH}
                    element={<ElegantIcons />}
                  />
                  <Route
                    path={PAGE_ROUTES.ETLINE_ICONS_PATH}
                    element={<EtlineIcons />}
                  />
                  <Route
                    path={PAGE_ROUTES.FONTAWESOME_ICONS_PATH}
                    element={<FontAwesomeIcons />}
                  />
                  <Route
                    path={PAGE_ROUTES.ACCORDION_PATH}
                    element={<Accordion />}
                  />
                  <Route path={PAGE_ROUTES.ALERTS_PATH} element={<Alerts />} />
                  <Route
                    path={PAGE_ROUTES.PROGRESSBAR_PATH}
                    element={<Progressbar />}
                  />
                  <Route path={PAGE_ROUTES.TABS_PATH} element={<Tabs />} />
                  <Route path={PAGE_ROUTES.MINTER_PATH} element={<Minter />} />
                </Routes>
              </ScrollTop>
              <ScrollToTopBtn />
            </MarketplaceProvider>
          </AuthProvider>
        </Web3ModalProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
