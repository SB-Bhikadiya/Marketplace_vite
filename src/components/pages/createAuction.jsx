import { useEffect, useState } from "react";
import Slider from "react-slick";
import { createGlobalStyle } from "styled-components";
import {  TOKEN_ENDPOINT } from "../../constants/endpoints";
import { ADDRESS_KEY } from "../../constants/keys";
import { useAuth } from "../../core/auth";
import { AxiosInstance } from "../../core/axios";
import { Swal } from "../../core/sweet-alert";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { NFTCard } from "./create";
import { settings } from "../../constants";
import { DateRangePicker } from "react-date-range";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const CreateAuction = () => {
  const [isActive, setIsActive] = useState(false);
 
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState({
    address: "",
    creator: "",
    owner: "",
    tokenId: 0,
    price: 0,
    metadata: {
      name: "",
      description: "",
      image: "",
      external_url: "",
      tokenId: 0,
      attributes: [],
      animation_url: "",
      background_color: "#ffffff",
      collection_address: "",
      collection_name: "",
    },
    tokenURI: "",
  });
  const { getHeaders } = useAuth();
  
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  function handleSelectDate(ranges) {
    setSelectionRange(ranges.selection);
  }

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const response = await AxiosInstance.get(TOKEN_ENDPOINT, {
          params: { owner: localStorage.getItem(ADDRESS_KEY),status:'none' },
          ...getHeaders(),
        });
        setTokens(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! while fetching NFTs",
        });
      }
    }
    fetchNFTs();
  }, []);

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create Listing</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Select NFT to List</h5>
                <div className="container">
                  <div className="nft my-4">
                    {tokens && tokens.length && (
                      <Slider {...settings}>
                        {tokens.map((token, index) => {
                          return (
                            <NFTCard
                              onClick={() => {
                                setSelectedToken(tokens[index]);
                              }}
                              key={index}
                              token={token.metadata}
                              disableAttribute={true}
                            />
                          );
                        })}
                      </Slider>
                    )}
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Select method</h5>
                <div className="de_tab tab_methods">
                      <span>
                        <i className="fa fa-hourglass-1"></i>Timed auction
                      </span>
     

                  <div className="de_tab_content pt-3">
                    <div id="tab_opt_1">
                      <h5>Price</h5>
                      <input
                        type="number"
                        name="item_price"
                        value={selectedToken.price}
                        id="item_price"
                        onChange={(e) =>
                          setSelectedToken({
                            ...selectedToken,
                            price: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="enter price for one item (ETH)"
                      />
                      {!selectedToken.price && (
                        <div className="error-message"></div>
                      )}
                    </div>

                    <div id="tab_opt_2" className="hide">
                      <h5>Minimum bid</h5>
                      <input
                        type="number"
                        name="item_price_bid"
                        id="item_price_bid"
                        value={selectedToken.price}
                        onChange={(event)=>setSelectedToken({...selectedToken,price:event.target.value})}
                        className="form-control"
                        placeholder="enter minimum bid"
                      />

                      <div className="spacer-20"></div>

                      <div className="d-flex card justify-content-center align-content-center align-items-center">
                        <div className="p-3">
                          <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelectDate}
                          />
                        </div>
                      </div>
                    </div>

                    <div id="tab_opt_3"></div>
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="switch-with-title">
                  <h5>
                    <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
                    Unlock once purchased
                  </h5>
                  <div className="de-switch">
                    <input
                      type="checkbox"
                      id="switch-unlock"
                      className="checkbox"
                    />
                  </div>
                  <div className="clearfix"></div>
                  <p className="p-info pb-3">
                    Unlock content after successful transaction.
                  </p>
                  {isActive ? (
                    <div id="unlockCtn" className="hide-content">
                      <input
                        type="text"
                        name="item_unlock"
                        id="item_unlock"
                        className="form-control"
                        placeholder="Access key, code to redeem or link to a file..."
                      />
                    </div>
                  ) : null}
                </div>

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                />
              </div>
            </form>
          </div>

          
                <div className="col-lg-3 col-sm-6 col-xs-12">
          <div className="spacer-single"></div>
                  <h5>Preview item</h5>
                  <div className="nft__item m-0">
                    <div className="de_countdown">
                      <Clock deadline="December, 30, 2024" />
                    </div>

                    {selectedToken &&
                      selectedToken.metadata &&
                      selectedToken.metadata.image && (
                        <div className="nft__item_wrap">
                          <span>
                            <img
                              src={selectedToken.metadata.image}
                              id="get_file_2"
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </span>
                        </div>
                      )}
                    <div className="nft__item_info">
                      <span>
                        <h4>
                          {selectedToken &&
                            selectedToken.metadata &&
                            selectedToken.metadata.name}
                        </h4>
                        <h5>
                          {selectedToken &&
                            selectedToken.metadata &&
                            selectedToken.metadata.collection_name}
                        </h5>
                      </span>
                      <div className="nft__item_price">
                        {selectedToken && selectedToken.price} ETH
                      </div>
                      <div className="nft__item_price text-break">
                        {selectedToken &&
                          selectedToken.metadata &&
                          selectedToken.metadata.collection_address}
                        <br />
                        Token Id
                        <span>
                          {selectedToken &&
                            selectedToken.metadata &&
                            selectedToken.metadata.tokenId}
                        </span>
                      </div>
                      <div className="nft__item_action">
                        <span>Place a bid</span>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="spacer-single"></div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CreateAuction;
