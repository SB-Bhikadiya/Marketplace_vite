import React, { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { fetchNftDetail } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import Clock from "../components/Clock";
import Footer from "../components/footer";
/*import Checkout from "../components/Checkout";
import Checkoutbid from "../components/Checkoutbid";*/
import moment from "moment";
import { useParams } from "react-router-dom";
import { getEtherFromWei, toWei } from "../../constants/utils";
import { MarketplaceContext } from "../../core/marketplace";
import { Swal } from "../../core/sweet-alert";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  .mr40{
    margin-right: 40px;
  }
  .mr15{
    margin-right: 15px;
  }
  .btn2{
    background: #f6f6f6;
    color: #8364E2 !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetailRedux = () => {
  let { nftId, tokenId } = useParams();

  const [openMenu0, setOpenMenu0] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick0 = () => {
    setOpenMenu0(!openMenu0);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn0").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu0(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn0").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    setOpenMenu0(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn0").classList.remove("active");
  };

  const dispatch = useDispatch();
  const nftDetailState = useSelector(selectors.nftDetailState);
  const nft = nftDetailState.data ? nftDetailState.data : [];
  const [bidValue, setBidValue] = useState(0);

  const [openCheckout, setOpenCheckout] = React.useState(false);
  const [openCheckoutbid, setOpenCheckoutbid] = React.useState(false);

  useEffect(() => {
    dispatch(fetchNftDetail(nftId, tokenId));
  }, [dispatch, nftId, tokenId]);

  const { provideNFTMarketplace } = useContext(MarketplaceContext);
  async function buyItem() {
    try {
      const marketplace = await provideNFTMarketplace();

      const tx = await marketplace.buyNFT(nftId, tokenId, {
        value: toWei(getEtherFromWei(nft.price)),
      });
      await tx.wait();
      setOpenCheckout(false);
      await Swal.fire("Bought Success", "The item is saved to your collection");
      dispatch(fetchNftDetail(nftId, tokenId));
    } catch (error) {
      Swal.fire("error", "Couldn't Buy" + error.message);
    }
  }

  async function placeBid() {
    try {
      if (bidValue > getEtherFromWei(nft.max_bid)) {
        const marketplace = await provideNFTMarketplace();

        const tx = await marketplace.bidPlace(nftId, tokenId, {
          value: toWei(bidValue),
        });
        await tx.wait();
        await Swal.fire(
          "Bid Place",
          "Bid Placed wait till auction result is announced"
        );
        setOpenCheckoutbid(false);
        dispatch(fetchNftDetail(nftId, tokenId));
      } else {
        Swal.fire("error", "Bid price should be greater than minimum bid");
      }
    } catch (error) {
      Swal.fire("error", "Couldn't Buy" + error.message);
    }
  }
  return (
    <div>
      <GlobalStyles />
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={nft.preview_image}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              {nft.status === "on_auction" ? (
                nft.start &&
                nft.deadline &&
                Date.parse(nft.start) > Date.now() ? (
                  <>
                    Auctions will start after
                    <div className="de_countdown">
                      {nft.start && Date.parse(nft.start) !== 0 ? (
                        <div className="de_countdown">
                          <Clock deadline={Date.parse(nft.start)} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    Auctions ends in
                    <div className="de_countdown">
                      {nft.deadline && Date.parse(nft.deadline) !== 0 ? (
                        <div className="de_countdown">
                          <Clock deadline={nft.deadline} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )
              ) : (
                <></>
              )}
              <h2>{nft.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>
                  {nft.category}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {nft.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {nft.likes}
                </div>
              </div>
              <p>{nft.description}</p>

              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={nft.author && nft.author.avatar}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>{nft.author && nft.author.username}</span>
                    </div>
                  </div>
                </div>
                <div className="mr40">
                  <h6>Collection</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <span>
                        <img
                          className="lazy"
                          src={
                            nft.hot_collections && nft.hot_collections.banner
                          }
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </span>
                    </div>
                    <div className="author_list_info">
                      <span>
                        {nft.hot_collections && nft.hot_collections.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spacer-40"></div>

              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn0" className="active">
                    <span onClick={handleBtnClick0}>Details</span>
                  </li>
                  <li id="Mainbtn">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {openMenu0 && (
                    <div className="tab-1 onStep fadeIn">
                      <div className="d-block mb-3">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src={nft.author && nft.owner.avatar}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="author_list_info">
                              <span>{nft.author && nft.owner.username}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-5">
                          {nft.metadata &&
                            nft.metadata.attributes.map((attriubute, index) => {
                              return (
                                <div
                                  className="col-lg-4 col-md-6 col-sm-6"
                                  key={index}
                                >
                                  <div className="nft_attr">
                                    <h5>{attriubute.trait_type}</h5>
                                    <h4>{attriubute.value}</h4>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  )}

                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      {nft.bids &&
                        nft.bids.map((bid, index) => (
                          <div className="p_list" key={index}>
                            <div className="p_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src={bid.author && bid.author.avatar}
                                  alt={bid.author && bid.author.avatar}
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="p_list_info">
                              Bid {bid.type.capitalize()}{" "}
                              <b>{getEtherFromWei(bid.value)} ETH</b>
                              <span>
                                by <b>{bid.author.username}</b> at{" "}
                                {moment(bid.created_at).format("L, LT")}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      {nft.history &&
                        nft.history.map((bid, index) => (
                          <div className="p_list" key={index}>
                            <div className="p_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src={bid.author && bid.author.avatar}
                                  alt={bid.author && bid.author.avatar}
                                />
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="p_list_info">
                              Bid {bid.type.capitalize()}{" "}
                              <b>{getEtherFromWei(bid.value)} ETH</b>
                              <span>
                                by <b>{bid.author.username}</b> at{" "}
                                {moment(bid.created_at).format("L, LT")}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    {nft.deadline && Date.parse(nft.deadline) !== 0 ? (
                      Date.parse(nft.start) > Date.now() ? (
                        <h3>Auction is not started Yet</h3>
                      ) : (
                        <button
                          className="btn-main btn2 lead mb-5"
                          onClick={() => setOpenCheckoutbid(true)}
                        >
                          Place Bid
                        </button>
                      )
                    ) : nft.status === "none" ? (
                      <h3>This item is not listed for purchase</h3>
                    ) : (
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={() => setOpenCheckout(true)}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {openCheckout && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckout(false)}
            >
              x
            </button>
            <div className="heading">
              <h3>Checkout</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">{nft.metadata.name}</span>
              <span className="bold">from {nft.author.username}</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>
                  Enter quantity
                  <span className="color"> 1 available</span>
                </h6>
              </div>
            </div>
            <div className="heading mt-3">
              <p>Required balance</p>
              <div className="subtotal">
                {(
                  getEtherFromWei(nft.price) -
                  getEtherFromWei(nft.price) * 0.02
                ).toFixed(5)}{" "}
                ETH
              </div>
            </div>
            <div className="heading">
              <p>Service fee 2%</p>
              <div className="subtotal">
                {getEtherFromWei(nft.price) * 0.02} ETH
              </div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">{getEtherFromWei(nft.price)} ETH</div>
            </div>
            <button className="btn-main lead mb-5" onClick={buyItem}>
              Checkout
            </button>
          </div>
        </div>
      )}
      {openCheckoutbid && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckoutbid(false)}
            >
              x
            </button>
            <div className="heading">
              <h3>Place a Bid</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">
                {nft.title} #{nft.tokenId}
              </span>{" "}
              from <span className="bold"> {nft.hot_collections.name}</span>
            </p>
            <p>
              Minimum bid should be
              <span className="bold"> {getEtherFromWei(nft.max_bid)}</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid (ETH)</h6>
                <input
                  type="number"
                  className="form-control"
                  min={getEtherFromWei(nft.max_bid)}
                  value={bidValue}
                  onChange={(event) => setBidValue(event.target.value)}
                />
              </div>
            </div>

            <div className="heading mt-3">
              <p>Your required balance for place bid</p>
              <div className="subtotal">{getEtherFromWei(nft.max_bid)} ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2%</p>
              <div className="subtotal">{bidValue * 0.02} ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">{bidValue} ETH</div>
            </div>
            <button className="btn-main lead mb-5" onClick={placeBid}>
              Place Bid
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ItemDetailRedux);
