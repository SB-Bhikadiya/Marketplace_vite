import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { fetchAuthorList } from "../../store/actions/thunks";
import * as selectors from "../../store/selectors";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import { AxiosInstance } from "../../core/axios";
import { USER_ENDPOINT } from "../../constants/endpoints";
import { Swal } from "../../core/sweet-alert";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
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
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = () => {
  const { authorId } = useParams();
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };

  const dispatch = useDispatch();
  const authorsState = useSelector(selectors.authorsState);
  const author = authorsState.data || {};
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    dispatch(fetchAuthorList(authorId));
  }, [dispatch, authorId]);

  async function followUser() {
    try {
      await AxiosInstance.post(
        USER_ENDPOINT, {},
        {params:{ from : address,to:authorId}}
        );
        dispatch(fetchAuthorList(authorId));

      } catch (error) {
        Swal.fire('Follow', `Something went wrong while following ${author.username}`)
      }
  }

  return (
    <div>
      <GlobalStyles />
      {author.banner && (
        <section
          id="profile_banner"
          className="jumbotron breadcumb no-bg"
          style={{ backgroundImage: `url(${author.banner})` }}
        >
          <div className="mainbreadcumb"></div>
        </section>
      )}

      <section className="container no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  {author.avatar && (
                    <img src={author.avatar} alt={author.avatar} />
                  )}
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      {author.username}
                      <span className="profile_username">{author.social}</span>
                      <span id="wallet" className="profile_wallet">
                        {author.wallet}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">
                    {author.followers && author.followers.length} followers
                  </div>
                </div>
                <div className="de-flex-col" onClick={followUser}>
                  <span className="btn-main">{  author&& author.followers && author.followers.some(item => item.toLowerCase() === address.toLowerCase()) ? "Unfollow" : "Follow"} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Created</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>Liked</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && author.wallet && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} authorId={author.wallet} />
          </div>
        )}
        {openMenu1 && author.wallet && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} authorId={author.wallet} />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);
