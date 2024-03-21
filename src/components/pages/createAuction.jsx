import { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import Slider from "react-slick";
import { createGlobalStyle } from "styled-components";
import { settings } from "../../constants";
import { TOKEN_ENDPOINT } from "../../constants/endpoints";
import { ADDRESS_KEY, THEME_COLOR } from "../../constants/keys";
import { getEtherFromWei, toWei } from "../../constants/utils";
import { useAuth } from "../../core/auth";
import { AxiosInstance } from "../../core/axios";
import { MarketplaceContext } from "../../core/marketplace";
import { Swal } from "../../core/sweet-alert";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { NFTCard } from "./create";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/routes";

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
  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(link);
  };
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState({
    address: "",
    creator: "",
    owner: "",
    tokenId: 0,
    price: 0,
    minimumBid: 0,
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
  const { provideNFTMarketplace, provideCollection } =
    useContext(MarketplaceContext);

  const [selectionRange, setSelectionRange] = useState({
    startDate: Date.now(),
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
          params: { owner: localStorage.getItem(ADDRESS_KEY), status: "none" },
          ...getHeaders(),
        });
        setTokens(response.data.map(token => {
          token.price = getEtherFromWei(token.price);
          return token;
        }));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! while fetching NFTs",
        });
      }
    }
    fetchNFTs();
  }, [getHeaders]);

  async function createAuction() {
    try {
      console.log(
        selectedToken.address,
        selectedToken.tokenId,
        toWei(selectedToken.price),
        toWei(selectedToken.minimumBid),
        Number(selectionRange.startDate.getTime() / 1000),
        Number(selectionRange.endDate.getTime() / 1000)
      );

      const marketplace = await provideNFTMarketplace();
      const collection = await provideCollection(selectedToken.address);
      await collection.approve(marketplace.target, selectedToken.tokenId);
      const tx = await marketplace.createAuction(
        selectedToken.address,
        selectedToken.tokenId,
        toWei(selectedToken.price),
        toWei(selectedToken.minimumBid),
        selectionRange.startDate.getTime() / 1000,
        selectionRange.endDate.getTime() / 1000
      );
      await tx.wait();
      Swal.fire({
        icon: "info",
        title: "Auction Created",
        text: "Auction Created Successfully",
      });
      navigateTo(PAGE_ROUTES.EXPLORE_PATH)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! while creating auction",
      });
    }
  }

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
                <h1 className="text-center">Create Auction</h1>
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
                                setSelectedToken({
                                  ...tokens[index],
                                  minimumBid: 0,
                                });
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

                <h5>
                  <span>
                    <i className="fa fa-hourglass-1"></i> Timed auction
                  </span>
                </h5>
                <div className="de_tab tab_methods">
                  <div className="de_tab_content pt-3">
                    <h5>Price</h5>
                    <input
                      type="number"
                      name="item_price_bid"
                      id="item_price_bid"
                      value={selectedToken.price}
                      onChange={(event) =>
                        setSelectedToken({
                          ...selectedToken,
                          price: event.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="enter minimum bid"
                    />
                    <div className="spacer-20"></div>

                    <h5>Minimum bid</h5>
                    <input
                      type="number"
                      name="item_price_bid"
                      id="item_price_bid"
                      value={selectedToken.minimumBid}
                      onChange={(event) =>
                        setSelectedToken({
                          ...selectedToken,
                          minimumBid: event.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="enter minimum bid"
                    />

                    <div className="spacer-20"></div>

                    <div className="d-flex card justify-content-center align-content-center align-items-center">
                      <div className="p-3">
                        <DateRangePicker
                          minDate={new Date()}
                          color={THEME_COLOR}
                          rangeColors={[THEME_COLOR]}
                          ranges={[selectionRange]}
                          onChange={handleSelectDate}
                        />
                      </div>
                    </div>

                    <div id="tab_opt_3"></div>
                  </div>
                </div>

                <div className="spacer-20"></div>

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  onClick={createAuction}
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
                <Clock deadline={selectionRange.endDate} />
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
