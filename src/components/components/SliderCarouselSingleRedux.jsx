import { navigate } from "@reach/router";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { carouselCollectionSingle } from "../../constants";
import api from "../../core/api";
import { fetchNftShowcase } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";

const SliderCarouselSingleRedux = () => {
  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftShowcaseState);
  const nfts = nftsState.data ? nftsState.data : [];

  useEffect(() => {
    dispatch(fetchNftShowcase());
  }, [dispatch]);

  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <div className="nft-big">
      <Slider {...carouselCollectionSingle}>
        {nfts &&
          nfts.map((nft, index) => (
            <div
              onClick={() => navigateTo(nft.nft_link)}
              className="itm"
              index={index + 1}
              key={index}
            >
              <div className="nft_pic">
                <span>
                  <span className="nft_pic_info">
                    <span className="nft_pic_title">{nft.title}</span>
                    <span className="nft_pic_by">{nft.author.username}</span>
                  </span>
                </span>
                <div className="nft_pic_wrap">
                  <img
                    src={api.baseUrl + nft.preview_image.url}
                    className="lazy img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(SliderCarouselSingleRedux);
