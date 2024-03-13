import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { settings } from "../../constants";
import api from "../../core/api";
import { fetchHotCollections } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import CustomSlide from "./CustomSlide";

const CarouselCollectionRedux = () => {
  const dispatch = useDispatch();
  const hotCollectionsState = useSelector(selectors.hotCollectionsState);
  const hotCollections = hotCollectionsState.data
    ? hotCollectionsState.data
    : [];

  useEffect(() => {
    dispatch(fetchHotCollections());
  }, [dispatch]);

  return (
    <div className="nft">
      <Slider {...settings}>
        {hotCollections &&
          hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={api.baseUrl + item.author.avatar}
              banner={api.baseUrl + item.banner}
              username={item.name}
              uniqueId={item.unique_id}
              collectionId={item.id}
            />
          ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselCollectionRedux);
