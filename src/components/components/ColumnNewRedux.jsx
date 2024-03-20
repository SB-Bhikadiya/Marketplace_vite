import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, clearNfts } from "../../store/actions";
import * as actions from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import { shuffleArray } from "../../store/utils";
import NftCard from "./NftCard";
import NotFound from "./NotFound";

//react functional component
const ColumnNewRedux = ({
  showLoadMore = true,
  shuffle = false,
  explore = false,
  authorId = null,
  collectionId = null,
  pageNo = 1
}) => {

  const dispatch = useDispatch();
  const nftItems = useSelector(selectors.nftItems);
  const nfts = nftItems ? (shuffle ? shuffleArray(nftItems) : nftItems) : [];
  const [height, setHeight] = useState(0);
  const [page, setPage] = useState(pageNo)

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    if (explore) {
      dispatch(actions.fetchNftsBreakdown(pageNo));
      dispatch(actions.fetchNftsBreakdown(pageNo+1));
      dispatch(actions.fetchNftsBreakdown(pageNo+2));
      setPage(pageNo+2)
    }
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch, pageNo,explore]);

  useEffect(() => {
    if (authorId) {
      dispatch(actions.fetchNftsAuthorBreakdown(authorId));
    }
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch, authorId]);

  useEffect(() => {
    if (collectionId) {
      dispatch(actions.fetchNftsCollectionBreakdown(collectionId));
    }
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch, collectionId]);

  //will run when component unmounted
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
      dispatch(clearNfts());
    };
  }, [dispatch]);

  const loadMore = () => {
    dispatch(actions.fetchNftsBreakdown(page+1));
    setPage(page+1)
  };

  return (
    <div className="row">
      {nfts &&
        nfts.length > 0  ?
        nfts.map((nft, index) => (
          <NftCard
            nft={nft}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
          />
        )):<NotFound/>}
      {showLoadMore && nfts.length <= page*16 && (
        
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
