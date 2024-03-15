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

import { createGlobalStyle } from "styled-components";
import { PAGE_ROUTES } from "../constants/routes";
import { AuthProvider } from "../core/auth";
import { MarketplaceProvider } from "../core/marketplace";
import Web3ModalProvider from "../core/modal";
import PrivateRoute from "../core/private-route";
import CreateCollection from "./pages/CreateCollection";
import CreateAuction from "./pages/createAuction";
import CreateListing from "./pages/createListing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <MarketplaceProvider>
            <AuthProvider>
              <GlobalStyles />
              <Header />
              <ScrollTop path={PAGE_ROUTES.ROOT_PATH}>
                <Routes>
                  <Route exact path={PAGE_ROUTES.HOME_PATH} element={<Home/>} />
                  <Route path={PAGE_ROUTES.LOGIN_PATH} element={<Login/>} />
                  <Route path={PAGE_ROUTES.REGISTER_PATH} element={<Register/>} />
                  <PrivateRoute
                    path={PAGE_ROUTES.HOME_1_PATH}
                    element={<Home1/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.HOME_2_PATH}
                    element={<Home2/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.HOME_3_PATH}
                    element={<Home3/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.EXPLORE_PATH}
                    element={<Explore/>}
                  />

                  <PrivateRoute
                    path={PAGE_ROUTES.RANKING_PATH}
                    element={<RankingRedux/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.AUCTION_PATH}
                    element={<Auction/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.HELPCENTER_PATH}
                    element={<Helpcenter/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.COLLECTION_PATH}
                    element={<Collection/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ITEM_DETAIL_PATH}
                    element={<ItemDetailRedux/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.AUTHOR_PATH}
                    element={<Author/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.WALLET_PATH}
                    element={<Wallet/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.LOGIN_2_PATH}
                    element={<LoginTwo/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.PRICE_PATH}
                    element={<Price/>}
                  />
                  <PrivateRoute path={PAGE_ROUTES.NEWS_PATH} element={<News/>} />
                  <PrivateRoute
                    path={PAGE_ROUTES.NEWS_SINGLE_PATH}
                    element={<NewsSingle/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_PATH}
                    element={<Create/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_COLLECTION_PATH}
                    element={<CreateCollection/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_LISTING_PATH}
                    element={<CreateListing/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_AUCTION_PATH}
                    element={<CreateAuction/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_3_PATH}
                    element={<Create3/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CREATE_OPTIONS_PATH}
                    element={<Createoption/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ACTIVITY_PATH}
                    element={<Activity/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.CONTACT_PATH}
                    element={<Contact/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ELEGANT_ICONS_PATH}
                    element={<ElegantIcons/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ETLINE_ICONS_PATH}
                    element={<EtlineIcons/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.FONTAWESOME_ICONS_PATH}
                    element={<FontAwesomeIcons/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ACCORDION_PATH}
                    element={<Accordion/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.ALERTS_PATH}
                    element={<Alerts/>}
                  />
                  <PrivateRoute
                    path={PAGE_ROUTES.PROGRESSBAR_PATH}
                    element={<Progressbar/>}
                  />
                  <PrivateRoute path={PAGE_ROUTES.TABS_PATH} element={<Tabs/>} />
                  <PrivateRoute
                    path={PAGE_ROUTES.MINTER_PATH}
                    element={<Minter/>}
                  />
                </Routes>
              </ScrollTop>
            </AuthProvider>
            <ScrollToTopBtn />
          </MarketplaceProvider>
        </Web3ModalProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
