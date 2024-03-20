import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, clearNfts } from "../../store/actions";
import * as actions from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import { shuffleArray } from "../../store/utils";
import NftCard from "./NftCard";

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  shuffle = false,
  authorId = null,
  collectionId = null,
}) => {
  const dispatch = useDispatch();
  const nftItems = useSelector(selectors.nftItems);
  const nfts = nftItems ? (shuffle ? shuffleArray(nftItems) : nftItems) : [];
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    dispatch(actions.fetchNftsBreakdown(authorId));

    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch, authorId]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(actions.fetchNftsBreakdown(authorId));
  };

  return (
    <div className="row">
      {nfts &&
        nfts.length &&
        nfts.map((nft, index) => (
          <NftCard
            nft={nft}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
          />
        ))}
      {showLoadMore && nfts.length <= 16 && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
