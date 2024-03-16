import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { createGlobalStyle } from "styled-components";
import { settings } from "../../constants";
import { TOKEN_ENDPOINT } from "../../constants/endpoints";
import { ADDRESS_KEY } from "../../constants/keys";
import { useAuth } from "../../core/auth";
import { AxiosInstance } from "../../core/axios";
import { MarketplaceContext } from "../../core/marketplace";
import { Swal } from "../../core/sweet-alert";
import Clock from "../components/Clock";
import Footer from "../components/footer";
import { NFTCard } from "./create";

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

const CreateListing = () => {
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
  const { provideNFTMarketplace, provideCollection } =
    useContext(MarketplaceContext);

  async function createListing() {
    try {
      const marketplace = await provideNFTMarketplace();
      const collection = await provideCollection(selectedToken.address);
      await collection.approve(marketplace.target, selectedToken.tokenId);
      const tx = await marketplace.listNft(
        selectedToken.address,
        selectedToken.tokenId,
        ethers.parseEther(selectedToken.price.toString())
      );
      await tx.wait();
      Swal.fire("Listed successfully");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! while fetching Tokens",
      });
    }
  }

  const { getHeaders } = useAuth();

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const response = await AxiosInstance.get(TOKEN_ENDPOINT, {
          params: { owner: localStorage.getItem(ADDRESS_KEY) },
          ...getHeaders(),
        });
        setTokens(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! while fetching Tokens",
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
          <div className="col-lg-12 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Select NFT to List</h5>
                <div className="container">
                  <div className="nft my-4">
                    <Slider
                      {...settings}
                      rows={1}
                      slidesPerRow={1}
                      slidesToShow={6}
                    >
                      {tokens &&
                        tokens.map((token, index) => {
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
                  </div>
                </div>

                <div className="spacer-single"></div>
                <div className="col-lg-3 col-sm-6 col-xs-12">
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

                <h5>Listing price</h5>
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
                </div>
                <div className="spacer-20"></div>

                <input
                  type="button"
                  id="submit"
                  onClick={createListing}
                  className="btn-main"
                  value="Create Listing"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CreateListing;
