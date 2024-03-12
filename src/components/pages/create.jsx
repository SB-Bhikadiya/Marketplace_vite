import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { createGlobalStyle } from "styled-components";
import { settings } from "../../constants";
import { COLLECTION_ENDPOINT } from "../../constants/endpoints";
import { ADDRESS_KEY } from "../../constants/keys";
import { AxiosInstance } from "../../core/axios";
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

const Createpage = () => {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    image: "",
    external_url: "",
    attributes: [],
    animation_url: "",
    background_color: "",
    collection_address: "",
    collection_name: "",
  });
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getUsersCollections = () => {
      AxiosInstance.get(COLLECTION_ENDPOINT, {
        params: { creator: localStorage.getItem(ADDRESS_KEY) },
      }).then((response) => {
        setCollections(response.data || []);
      });
    };
    getUsersCollections();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "trait_type" || name === "value") {
      const updatedAttributes = [...metadata.attributes];
      updatedAttributes[index][name] = value;
      setMetadata({ ...metadata, attributes: updatedAttributes });
    } else {
      setMetadata({ ...metadata, [name]: value });
    }
  };
  const onChangeImage = async (e) => {
    try {
      const formData = new FormData();

      // Get the selected file from the file input
      const file = e.target.files[0];
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });

      formData.append("file", file);
      formData.append("pinataOptions", pinataOptions);

      const response = await pinFileToIPFS(formData);
      setMetadata({ ...metadata, image: response.pinataUrl });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAttribute = () => {
    setMetadata({
      ...metadata,
      attributes: [...metadata.attributes, { trait_type: "", value: "" }],
    });
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...metadata.attributes];
    updatedAttributes.splice(index, 1);
    setMetadata({ ...metadata, attributes: updatedAttributes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", metadata);
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
            <form onSubmit={handleSubmit}>
              {/* Metadata fields */}
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
              </div>
              <div className="form-group">
                <h5>Name</h5>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={metadata.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <h5>Description</h5>
                <textarea
                  className="form-control"
                  name="description"
                  value={metadata.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <h5>Image</h5>
                <input
                  className="form-control"
                  type="text"
                  name="image"
                  value={metadata.image}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <h5>External URL</h5>
                <input
                  className="form-control"
                  type="text"
                  name="external_url"
                  value={metadata.external_url}
                  onChange={handleChange}
                />
              </div>
              {/* Attribute fields */}
              {metadata.attributes.map((attribute, index) => (
                <div key={index}>
                  <div className="form-group">
                    <h5>Trait Type</h5>
                    <input
                      className="form-control"
                      type="text"
                      name="trait_type"
                      value={attribute.trait_type}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="form-group">
                    <h5>Trait Value</h5>
                    <input
                      className="form-control"
                      type="text"
                      name="value"
                      value={attribute.value}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <button
                    className="btn-main m-2"
                    type="button"
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              ))}
              <button
                className="btn-main m-2"
                type="button"
                onClick={handleAddAttribute}
              >
                <i className="fa fa-plus"></i>
              </button>
              {/* Other fields */}
              <div className="form-group">
                <h5>Animation URL</h5>
                <input
                  className="form-control"
                  type="text"
                  name="animation_url"
                  value={metadata.animation_url}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <h5>Background Color</h5>
                <input
                  className="form-control"
                  type="color"
                  name="background_color"
                  value={metadata.background_color}
                  onChange={handleChange}
                />
              </div>
              <div className="nft">
                <Slider {...settings}>
                  {collections &&
                    collections.map((collection, index) => {
                      return (
                        <div className="itm" key={index}>
                          <div className="nft_coll">
                            <div className="nft_wrap">
                              <span>
                                <img
                                  src={collection.image}
                                  className="lazy img-fluid"
                                  alt=""
                                />
                              </span>
                            </div>
                            <div className="nft_coll_info py-2">
                              <span onClick={() => {}}>
                                <h4>{collection.name}</h4>
                              </span>
                              <span>{collection.symbol}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>

              <button className="btn-main" type="submit">
                Create NFT
              </button>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div
              className="nft__item m-0"
              style={
                metadata.background_color
                  ? { backgroundColor: metadata.background_color }
                  : {}
              }
            >
              {/* 
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
               */}
              <div className="author_list_pp">
                <span>
                  <img
                    className="lazy"
                    src="./img/author/author-1.jpg"
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  {metadata.image && (
                    <img
                      src={metadata.image}
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  )}
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>{metadata.name}</h4>
                </span>
                <div className="nft__item_price">
                  0.08 ETH<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>

                <div className="row mt-5">
                  {metadata.attributes.map((attribute, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                      <div className="nft_attr">
                        <h5>{attribute.trait_type}</h5>
                        <h4>{attribute.value}</h4>
                      </div>
                    </div>
                  ))}
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

export default Createpage;
