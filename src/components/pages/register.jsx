
import { useFormik } from "formik";
import { createGlobalStyle } from "styled-components";
import * as Yup from "yup";
import { ADDRESS_KEY } from "../../constants/keys";
import { PAGE_ROUTES } from "../../constants/routes";
import { useAuth } from "../../core/auth";
import { pinFileToIPFS } from "../../core/nft/pinata";
import { Swal } from "../../core/sweet-alert";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

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

const Register = () => {
  const navigate = useNavigate();

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "video/mp4",
  ];
  const maxSizeInBytes = 20 * 1024 * 1024; // 200 MB
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      wallet: localStorage.getItem(ADDRESS_KEY),
      avatar: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      avatar: Yup.string().required("avatar is required"),
      wallet: Yup.string().required("Wallet is required"),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        await Swal.fire("Account created successfully");
        navigate(PAGE_ROUTES.LOGIN_PATH);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while creating account may user already exist with wallet address",
        });
      }
    },
  });

  const onChangeImage = async (e) => {
    try {
      if (
        allowedTypes.includes(e.target.files[0].type) &&
        e.target.files[0].size < maxSizeInBytes
      ) {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("file", file);

        const pinataOptions = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", pinataOptions);

        const response = await pinFileToIPFS(formData);
        formik.setFieldValue("avatar", response.pinataUrl);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File should be PNG, JPG, GIF, WEBP or MP4. Max 20mb.",
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
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Register</h1>
                <p>Anim pariatur cliche reprehenderit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3>Do not have an account? Register now.</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>

            <div className="spacer-10"></div>

            <form
              name="contactForm"
              id="contact_form"
              className="form-border"
              action="#"
            >
              <div className="row">
                <div className={`col-lg-12 col-md-12 col-sm-12`}>
                  <div className="field-set">
                    <h5>Upload file</h5>
                    <div className="d-create-file">
                      <p id="file_name">
                        PNG, JPG, GIF, WEBP or MP4. Max 20mb.
                      </p>
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
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {formik.values.avatar && (
                    <div className="nft_coll_pp">
                      <span>
                        <img
                          className="lazy"
                          src={formik.values.avatar}
                          alt=""
                        />
                      </span>
                      <i className="fa fa-check"></i>
                    </div>
                  )}
                </div>
                <div className="spacer-10"></div>

                <div className="spacer-10"></div>

                <div className="col-md-12">
                  <div className="field-set">
                    <label htmlFor="username">Choose a Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div>{formik.errors.username}</div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="field-set">
                    <label htmlFor="email">Email Address:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="field-set">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <div className="spacer-10"></div>
                <div className="col-md-12">
                  <div className="field-set">
                    <input
                      type="button"
                      id="submit"
                      className="btn-main"
                      onClick={formik.handleSubmit}
                      value="Register"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Register;
