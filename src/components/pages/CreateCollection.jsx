import { navigate } from "@reach/router";
import React, { useContext, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { ADDRESS_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/routes";
import { MarketplaceContext } from "../../core/marketplace";
import { pinFileToIPFS } from "../../core/nft/pinata";
import Footer from "../components/footer";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
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
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const CreateCollection = () => {
  const { provideNFTFactory } = useContext(MarketplaceContext);
  const [data, setData] = useState({
    item_name: "",
    item_symbol: "",
    item_royalties: "",
    item_image: "",
  });
  const createCollection = async () => {
    const factory = await provideNFTFactory();
    if (factory) {
      const tx = await factory.createNFTCollection(
        data.item_name,
        data.item_symbol,
        data.item_image,
        parseInt(data.item_royalties) * 1000,
        localStorage.getItem(ADDRESS_KEY)
      );
      const receipt = await tx.wait();
      console.log(receipt);
      navigate(PAGE_ROUTES.CREATE_PATH);
    }
  };
  const onChangeName = (e) => {
    setData({ ...data, item_name: e.target.value });
  };

  const onChangeSymbol = (e) => {
    setData({ ...data, item_symbol: e.target.value });
  };

  const onChangeRoyalty = (e) => {
    setData({ ...data, item_royalties: e.target.value });
  };

  const onChangeImage = async (e) => {
    try {
      const formData = new FormData();

      // Get the selected file from the file input
      const file = e.target.files[0];
      formData.append("file", file);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", pinataOptions);

      const response = await pinFileToIPFS(formData);
      setData({ ...data, item_image: response.pinataUrl });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>
                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>

                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={onChangeImage}
                    />
                  </div>
                </div>
                <div className="spacer-10"></div>

                <h5>Name</h5>
                <input
                  type="text"
                  name="item_name"
                  value={data.item_name}
                  onChange={onChangeName}
                  id="item_name"
                  className="form-control"
                  placeholder="Enter Your Collection Name"
                />
                <div className="spacer-10"></div>

                <h5>Symbol</h5>
                <input
                  value={data.item_symbol}
                  onChange={onChangeSymbol}
                  type="text"
                  name="item_symbol"
                  id="item_symbol"
                  className="form-control"
                  placeholder="Enter your collection symbol"
                />

                <div className="spacer-10"></div>

                <h5>Royalties</h5>
                <input
                  value={data.item_royalties}
                  onChange={onChangeRoyalty}
                  type="text"
                  name="item_royalties"
                  id="item_royalties"
                  className="form-control"
                  placeholder="suggested: 0, 1%, 2%, 3%. Maximum is 9%"
                />

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  onClick={createCollection}
                  value="Create Collection"
                />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <div className="itm">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <span>
                    {data.item_image && (
                      <img
                        src={data.item_image}
                        className="lazy img-fluid"
                        alt=""
                      />
                    )}
                  </span>
                </div>
                <div className="nft_coll_pp">
                  <span>
                    <img
                      className="lazy"
                      src={"./img/author/author-1.jpg"}
                      alt=""
                    />
                  </span>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <span>
                    <h4>{data.item_name}</h4>
                  </span>
                  <span>{data.item_symbol}</span>
                  <span>{data.item_royalties || 0} %</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateCollection;
