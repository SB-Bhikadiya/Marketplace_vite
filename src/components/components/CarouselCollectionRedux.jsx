import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { settings } from "../../constants";
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
        {hotCollections && hotCollections.length &&
      <Slider {...settings} slidesToShow={5}>
          {hotCollections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={item.author.avatar}
              banner={item.banner}
              username={item.name}
              collectionId={item.id}
            />
          ))}
      </Slider>
          }
    </div>
  );
};

export default memo(CarouselCollectionRedux);
