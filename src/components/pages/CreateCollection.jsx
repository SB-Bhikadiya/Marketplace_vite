
import  { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import { ADDRESS_KEY, USER_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/routes";
import { MarketplaceContext } from "../../core/marketplace";
import { pinFileToIPFS } from "../../core/nft/pinata";
import Footer from "../components/footer";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Swal } from "../../core/sweet-alert";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  item_name: Yup.string().required('Collection Name is required'),
  item_symbol: Yup.string().required('Collection Symbol is required'),
  item_royalties: Yup.number()
    .required('Royalties is required')
    .min(0, 'Royalties must be at least 0')
    .max(9, 'Maximum royalties allowed is 9'),
  item_image: Yup.string().required('File is required'),
});

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
  const navigate = useNavigate();

  const { provideNFTFactory } = useContext(MarketplaceContext);
  const user = JSON.parse(localStorage.getItem(USER_KEY));


  const createCollection = async () => {
    try {
      const factory = await provideNFTFactory();
      if (factory) {
        const tx = await factory.createNFTCollection(
          formik.values.item_name,
          formik.values.item_symbol,
          formik.values.item_image,
          parseInt(formik.values.item_royalties) * 1000,
          localStorage.getItem(ADDRESS_KEY)
        );
        const receipt = await tx.wait();
        console.log(receipt);
        navigate(PAGE_ROUTES.CREATE_PATH);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'video/mp4'];
  const maxSizeInBytes = 20 * 1024 * 1024; // 200 MB
  const formik = useFormik({
    initialValues: {
      item_name: '',
      item_symbol: '',
      item_royalties: '',
      item_image: '',
    },
    validationSchema,
    onSubmit: createCollection,
  });

  const onChangeImage = async (e) => {
    try {
      if (allowedTypes.includes(e.target.files[0].type)  && e.target.files[0].size < maxSizeInBytes) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("file", file);

        const pinataOptions = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        const response = await pinFileToIPFS(formData);
        formik.setFieldValue('item_image', response.pinataUrl);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'File should be PNG, JPG, GIF, WEBP or MP4. Max 20mb.',
        });
      }
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
                <h1 className="text-center">Create Collection</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">

        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
          <form id="form-create-item" className="form-border" onSubmit={formik.handleSubmit}>
        <h5>Upload file</h5>
        <div className="d-create-file">
          <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 20mb.</p>
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

        {formik.touched.item_image && formik.errors.item_image && (
          <div className="error-message">{formik.errors.item_image}</div>
        )}
        <div className="spacer-10"></div>

        <h5>Name</h5>
        <input
          type="text"
          name="item_name"
          value={formik.values.item_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control"
          placeholder="Enter Your Collection Name"
        />
        {formik.touched.item_name && formik.errors.item_name && (
          <div className="error-message">{formik.errors.item_name}</div>
        )}
        <div className="spacer-10"></div>

        <h5>Symbol</h5>
        <input
          value={formik.values.item_symbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="item_symbol"
          className="form-control"
          placeholder="Enter your collection symbol"
        />
        {formik.touched.item_symbol && formik.errors.item_symbol && (
          <div className="error-message">{formik.errors.item_symbol}</div>
        )}
        <div className="spacer-10"></div>

        <h5>Royalties</h5>
        <input
          value={formik.values.item_royalties}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          name="item_royalties"
          className="form-control"
          placeholder="suggested: 0, 1%, 2%, 3%. Maximum is 9%"
        />
        {formik.touched.item_royalties && formik.errors.item_royalties && (
          <div className="error-message">{formik.errors.item_royalties}</div>
        )}
        <div className="spacer-10"></div>

        <input
          type="button"
          id="submit"
          className="btn-main"
          onClick={formik.handleSubmit}
          value="Create Collection"
        />
      </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <div className="itm">
              <div className="nft_coll">
                <div className="nft_wrap">
                  <span>
                    {formik.values.item_image && (
                      <img
                        src={formik.values.item_image}
                        className="lazy img-fluid"
                        alt=""
                      />
                    )}
                  </span>
                </div>
                <div className="nft_coll_pp">
                  <span>
                  {user && user.avatar ?
                  <img
                  src={user.avatar}
                  alt=""
                />:
                <div className="de-menu-notification">
                  <i className="fa fa-user" height={40} width={40}></i>
                </div>
                }
                  </span>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <span>
                    <h4>{formik.values.item_name}</h4>
                  </span>
                  <span className="me-3">{formik.values.item_symbol}</span>
                  <span>{formik.values.item_royalties || 0} %</span>
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
