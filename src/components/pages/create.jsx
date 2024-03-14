import { navigate } from "@reach/router";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { createGlobalStyle } from "styled-components";
import * as Yup from "yup";
import { settings } from "../../constants";
import { COLLECTION_ENDPOINT } from "../../constants/endpoints";
import { ADDRESS_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/routes";
import { AxiosInstance } from "../../core/axios";
import { MarketplaceContext } from "../../core/marketplace";
import { pinFileToIPFS, pinJSONToIPFS } from "../../core/nft/pinata";
import Footer from "../components/footer";
import { Swal } from "../../core/sweet-alert";
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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().url("Please enter a valid URL for the image"),
    external_url: Yup.string().url(
      "Please enter a valid URL for the external link"
    ),
    // Add validation rules for other fields
    attributes: Yup.array().of(
      Yup.object().shape({
        trait_type: Yup.string().required("Trait Type is required"),
        value: Yup.string().required("Trait Value is required"),
      })
    ),
    animation_url: Yup.string().url(
      "Please enter a valid URL for the animation"
    ),
    background_color: Yup.string().matches(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      {
        message: "Please enter a valid hex color code",
      }
    ),
    collection_address: Yup.string().required("Collection Address is required"),
    collection_name: Yup.string().required("Collection Name is required"),
  });

  const { provideCollection } = useContext(MarketplaceContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      external_url: "",
      attributes: [{ trait_type: "", value: "" }],
      animation_url: "",
      background_color: "",
      collection_address: "",
      collection_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const collection = await provideCollection(values.collection_address);
        const { pinataUrl } = await pinJSONToIPFS(values);
        const tx = await collection.safeMint(
          localStorage.getItem(ADDRESS_KEY),
          pinataUrl
        );
        await tx.wait();
        Swal.fire("NFT minted");
        // navigate(PAGE_ROUTES.HOME_PATH)
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    },
  });

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getUsersCollections = async () => {
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
      const updatedAttributes = [...formik.values.attributes];
      updatedAttributes[index][name] = value;
      formik.setFieldValue("attributes", updatedAttributes);
    } else {
      formik.setFieldValue(name, value);
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
      formik.setFieldValue("image", response.pinataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAttribute = () => {
    formik.setFieldValue("attributes", [
      ...formik.values.attributes,
      { trait_type: "", value: "" },
    ]);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...formik.values.attributes];
    updatedAttributes.splice(index, 1);
    formik.setFieldValue("attributes", updatedAttributes);
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
            <form onSubmit={formik.handleSubmit}>
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

              {/* Other form fields */}
              <div className="form-group">
                <h5>Name</h5>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error-message">{formik.errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <h5>Description</h5>
                <textarea
                  className="form-control"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error-message">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="form-group">
                <h5>Image</h5>
                <input
                  className="form-control"
                  type="text"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="error-message">{formik.errors.image}</div>
                )}
              </div>

              <div className="form-group">
                <h5>External URL</h5>
                <input
                  className="form-control"
                  type="text"
                  name="external_url"
                  value={formik.values.external_url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.external_url && formik.errors.external_url && (
                  <div className="error-message">
                    {formik.errors.external_url}
                  </div>
                )}
              </div>

              {/* Attribute fields */}
              {formik.values.attributes.map((attribute, index) => (
                <div key={index}>
                  <div className="form-group">
                    <h5>Trait Type</h5>
                    <input
                      className="form-control"
                      type="text"
                      name={`attributes[${index}].trait_type`}
                      value={attribute.trait_type}
                      onChange={(e) => handleChange(e, index)}
                    />
                    {formik.touched.attributes &&
                      formik.errors.attributes &&
                      formik.errors.attributes[index] &&
                      formik.errors.attributes[index].trait_type && (
                        <div className="error-message">
                          {formik.errors.attributes[index].trait_type}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <h5>Trait Value</h5>
                    <input
                      className="form-control"
                      type="text"
                      name={`attributes[${index}].value`}
                      value={attribute.value}
                      onChange={(e) => handleChange(e, index)}
                    />
                    {formik.touched.attributes &&
                      formik.errors.attributes &&
                      formik.errors.attributes[index] &&
                      formik.errors.attributes[index].value && (
                        <div className="error-message">
                          {formik.errors.attributes[index].value}
                        </div>
                      )}
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
                  value={formik.values.animation_url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.animation_url &&
                  formik.errors.animation_url && (
                    <div className="error-message">
                      {formik.errors.animation_url}
                    </div>
                  )}
              </div>

              <div className="form-group">
                <h5>Background Color</h5>
                <input
                  className="form-control"
                  type="color"
                  name="background_color"
                  value={formik.values.background_color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.background_color &&
                  formik.errors.background_color && (
                    <div className="error-message">
                      {formik.errors.background_color}
                    </div>
                  )}
              </div>
              <div className="container">
                <div className="nft my-4">
                  <Slider {...settings}>
                    {collections &&
                      collections.map((collection, index) => {
                        return (
                          <div
                            className="itm"
                            onClick={() => {
                              formik.setValues({
                                ...formik.values,
                                collection_address: collection.nft,
                                collection_name: collection.name,
                              });
                            }}
                            key={index}
                          >
                            <div
                              className="nft_coll"
                              style={
                                formik.values.collection_name == collection.name
                                  ? { background: "#8364E2" }
                                  : {}
                              }
                            >
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
                                <span>
                                  <h4>{collection.name}</h4>
                                </span>
                                <span style={{ color: "black" }}>
                                  {collection.symbol}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>

              <button
                onClick={() => navigate(PAGE_ROUTES.CREATE_COLLECTION_PATH)}
                className="btn-main my-2"
                type="submit"
              >
                Create Collection
              </button>

              <button
                className="btn-main"
                onClick={formik.handleSubmit}
                type="submit"
              >
                Create NFT
              </button>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <NFTCard token={formik.values} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function NFTCard(props) {
  return (
    <div className="nft__item m-2" onClick={props.onClick}>
      {/* 
    <div className="de_countdown">
      <Clock deadline="December, 30, 2021" />
    </div>
      <div className="author_list_pp">
        <span>
          <img className="lazy" src="./img/author/author-1.jpg" alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div>
        */}
      <div className="nft__item_wrap">
        <span>
          {props.token.image && (
            <img
              src={props.token.image}
              id="get_file_2"
              className="lazy nft__item_preview"
              alt=""
            />
          )}
        </span>
      </div>
      <div className="nft__item_info">
        <span>
          <h4>{props.token.name}</h4>
        </span>
        <div className="nft__item_action">
          <span>{props.token.collection_name}</span>
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span></span>
        </div>
        {!props.disableAttribute && (
          <div className="row mt-5">
            {props.token.attributes.map((attribute, index) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                <div className="nft_attr">
                  <h5>{attribute.trait_type}</h5>
                  <h4>{attribute.value}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { NFTCard };

export default Createpage;
