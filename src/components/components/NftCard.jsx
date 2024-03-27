import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getEtherFromWei } from "../../constants/utils";
import Clock from "./Clock";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({
  nft,
  className = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4",
  clockTop = true,
  height,
  onImgLoad,
}) => {
  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(link);
  };

  useEffect(() => {
    return () => {};
  }, [nft]);

  return (
    <div className={className}>
      <div className="nft__item m-0">
        {nft.item_type === "single_items" ? (
          <div className="icontype">
            <i className="fa fa-bookmark"></i>
          </div>
        ) : (
          <div className="icontype">
            <i className="fa fa-shopping-basket"></i>
          </div>
        )}
        {nft.deadline &&
        nft.start &&
        clockTop &&
        Date.parse(nft.deadline) !== 0 &&
        Date.parse(nft.start) !== 0 ? (
          Date.parse(nft.start) > Date.now() ? (
            <div className="de_countdown">
              <div className="text-center">Will start in</div>
              <Clock deadline={nft.start} />
            </div>
          ) : Date.parse(nft.deadline) < Date.now() ? (
            <></>
          ) : (
            <div className="de_countdown">
              <Clock deadline={nft.deadline} />
            </div>
          )
        ) : (
          <></>
        )}
        <div className="author_list_pp">
          <span
            onClick={() => navigateTo(`/collection/${nft.hot_collections.id}`)}
          >
            <img
              className="lazy"
              src={nft.hot_collections.banner}
              alt={nft.hot_collections.banner}
            />
            <i className="fa fa-check"></i>
          </span>
        </div>
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={nft.preview_image}
                className="lazy nft__item_preview"
                alt={nft.preview_image}
              />
            </span>
          </Outer>
        </div>
        {nft.deadline &&
        nft.start &&
        !clockTop &&
        Date.parse(nft.deadline) !== 0 ? (
          <div className="de_countdown">
            <Clock deadline={nft.deadline} />
          </div>
        ) : (
          <></>
        )}
        <div className="nft__item_info">
          <span onClick={() => navigateTo(`${nft.nft_link}/${nft.id}`)}>
            <h4>{nft.title}</h4>
          </span>
          {nft.status === "has_offers" ? (
            <div className="has_offers">
              <span className="through">{nft.priceover}</span> {nft.price} ETH
            </div>
          ) : (
            <div className="nft__item_price">
              {getEtherFromWei(nft.price)} ETH
              {nft.status === "on_auction" && (
                <span>
                  {nft.bids && nft.bids.length}/{getEtherFromWei(nft.max_bid)}
                </span>
              )}
            </div>
          )}
          <div className="nft__item_action">
            <span onClick={() => navigateTo(nft.bid_link)}>
              {nft.status === "none"
                ? "View"
                : nft.status === "on_auction"
                ? "Place a bid"
                : "Buy Now"}
            </span>
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{nft.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
