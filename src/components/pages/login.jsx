import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { PAGE_ROUTES } from "../../constants/routes";
import { useAuth } from "../../core/auth";
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

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        Swal.fire("Logged In successfully");
        navigate(PAGE_ROUTES.ROOT_PATH);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials",
        });
      }
    },
  });
  return (
    <div>
      <GlobalStyles />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-lg-5 text-light wow fadeInRight"
                data-wow-delay=".5s"
              >
                <div className="spacer-10"></div>
                <h1>Create, sell or collect digital items.</h1>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  ut enim.
                </p>
              </div>
              <div
                className="col-lg-4 offset-lg-2 wow fadeIn"
                data-wow-delay=".5s"
              >
                <div className="box-login">
                  <h3 className="mb10">Sign In</h3>
                  <p>
                    Login using an existing account or create a new account{" "}
                    <span>here</span>.
                  </p>
                  <form
                    name="contactForm"
                    id="contact_form"
                    className="form-border"
                    action="#"
                  >
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
                          value="Login"
                        />
                      </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="spacer-single"></div>
                  </form>
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
export default LoginPage;
