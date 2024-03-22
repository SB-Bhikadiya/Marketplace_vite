import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const CustomSlide = ({
  index,
  avatar,
  banner,
  username,
  uniqueId,
  collectionId,
}) => {
  const navigate = useNavigate();

  const navigateTo = (link) => {
    navigate(link);
    
  };
  return (
    <div className="itm" index={index}>
      <div className="nft_coll">
        <div className="nft_wrap">
          <span>
            <img src={banner} className="lazy img-fluid" alt="" />
          </span>
        </div>
        <div className="nft_coll_pp">
          <span
            onClick={() => navigateTo(`/collection/${collectionId}`)}
          >
            <img className="lazy" src={avatar} alt="" />
          </span>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <span
            onClick={() => navigateTo(`/collection/${collectionId}`)}
          >
            <h4>{username}</h4>
          </span>
          
        </div>
      </div>
    </div>
  );
};

export default memo(CustomSlide);
