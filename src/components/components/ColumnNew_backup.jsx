import React, { useState } from "react";
import styled from "styled-components";
import Clock from "./Clock";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

const Responsive = () => {
  const [nfts, setNfts] = useState([
    {
      deadline: "January, 10, 2022",
      authorImg: "./img/author/author-1.jpg",
      previewImg: "./img/items/static-1.jpg",
      title: "Pinky Ocean",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    // Add other initial NFTs here
  ]);

  const loadMore = () => {
    setNfts((prevNfts) => [
      ...prevNfts,
      {
        deadline: "January, 10, 2022",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/items/static-1.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50,
      },
      {
        deadline: "January, 10, 2022",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/items/static-1.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50,
      },
      {
        deadline: "January, 10, 2022",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/items/static-1.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50,
      },
      {
        deadline: "January, 10, 2022",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/items/static-1.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50,
      },
      {
        deadline: "January, 10, 2022",
        authorImg: "./img/author/author-1.jpg",
        previewImg: "./img/items/static-1.jpg",
        title: "Pinky Ocean",
        price: "0.08 ETH",
        bid: "1/20",
        likes: 50,
      },
    ]);
  };

  return (
    <div className="row">
      {nfts.map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft__item">
            <div className="de_countdown">
              <Clock deadline={nft.deadline} />
            </div>
            <div className="author_list_pp">
              <span onClick={() => window.open("/#", "_self")}>
                <img className="lazy" src={nft.authorImg} alt="" />
                <i className="fa fa-check"></i>
              </span>
            </div>
            <div className="nft__item_wrap">
              <Outer>
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    src={nft.previewImg}
                    className="lazy nft__item_preview"
                    alt={nft.previewImg}
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span onClick={() => window.open("/#", "_self")}>
                <h4>{nft.title}</h4>
              </span>
              <div className="nft__item_price">
                {nft.price}
                <span>{nft.bid}</span>
              </div>
              <div className="nft__item_action">
                <span onClick={() => window.open("/#", "_self")}>
                  Place a bid
                </span>
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-lg-12">
        <span onClick={() => loadMore()} className="btn-main lead m-auto">
          Load More
        </span>
      </div>
    </div>
  );
};

export default Responsive;
