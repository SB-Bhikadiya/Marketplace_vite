import { useFormik } from "formik";
import { createGlobalStyle } from "styled-components";
import * as Yup from "yup";
import { USER_ENDPOINT } from "../../constants/endpoints";
import { USER_KEY } from "../../constants/keys";
import { AxiosInstance } from "../../core/axios";
import { pinFileToIPFS } from "../../core/nft/pinata";
import { Swal } from "../../core/sweet-alert";
import { getHeaders } from "../../store/actions/helper";

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
function Profile() {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    wallet: Yup.string().required("Wallet is required"),
    social: Yup.string(),
    about: Yup.string(),
    avatar: Yup.string(),
    banner: Yup.string(),
  });

  const initialValues = {
    username: user.username,
    email: user.email,
    wallet: user.wallet,
    social: user.social || "",
    about: user.about || "",
    avatar: user.avatar,
    banner: user.banner || "",
  };
  const onSubmit = async (values) => {
    try {
      await AxiosInstance.put(USER_ENDPOINT, values, { ...getHeaders() });
      Swal.fire("Profile update", "Profile updated successfully");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! while update profile",
      });
    }
  };
  const onChangeImage = async (event, fieldName) => {
    try {
      const formData = new FormData();

      // Get the selected file from the file input
      const file = event.target.files[0];
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });

      formData.append("file", file);
      formData.append("pinataOptions", pinataOptions);

      const response = await pinFileToIPFS(formData);
      formik.setFieldValue(fieldName, response.pinataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>

      {/* <!-- section begin --> */}
      <GlobalStyles />

      {formik.values.banner && (
        <section
          id="profile_banner"
          className="jumbotron breadcumb no-bg"
          style={{ backgroundImage: `url(${formik.values.banner})` }}
        >
          <div className="mainbreadcumb"></div>
        </section>
      )}

      {formik.values.avatar && (
        <section className="container no-bottom">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img
                      src={formik.values.avatar}
                      alt={formik.values.avatar}
                    />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {formik.values.username}
                        <span className="profile_username">
                          {formik.values.social}
                        </span>
                        <span id="wallet" className="profile_wallet">
                          {formik.values.wallet}
                        </span>
                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex"></div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* <!-- section begin --> */}
      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <h5>Username</h5>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="error-message">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <h5>Email</h5>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <h5>Wallet</h5>
                  <input
                    className="form-control"
                    type="text"
                    name="wallet"
                    value={formik.values.wallet}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.wallet && formik.errors.wallet && (
                    <div className="error-message">{formik.errors.wallet}</div>
                  )}
                </div>

                <div className="form-group">
                  <h5>Social</h5>
                  <input
                    className="form-control"
                    type="text"
                    name="social"
                    value={formik.values.social}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* No validation for social */}
                </div>

                <div className="form-group">
                  <h5>About</h5>
                  <textarea
                    className="form-control"
                    name="about"
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* No validation for about */}
                </div>

                <div className="form-group">
                  <h5>Avatar</h5>
                  <input
                    className="form-control"
                    type="file"
                    name="avatar"
                    onChange={(event) => onChangeImage(event, "avatar")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.avatar && formik.errors.avatar && (
                    <div className="error-message">{formik.errors.avatar}</div>
                  )}
                </div>

                <div className="form-group">
                  <h5>Banner</h5>
                  <input
                    className="form-control"
                    type="file"
                    name="banner"
                    onChange={(event) => onChangeImage(event, "banner")}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.banner && formik.errors.banner && (
                    <div className="error-message">{formik.errors.banner}</div>
                  )}
                </div>

                <button className="btn-main" type="submit">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
