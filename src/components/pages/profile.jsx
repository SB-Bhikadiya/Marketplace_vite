import { ErrorMessage, Field, Form, Formik } from "formik";
import { createGlobalStyle } from "styled-components";
import * as Yup from "yup";

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
  const initialValues = {
    username: "",
    email: "",
    wallet: "",
    social: "",
    about: "",
    avatar: "",
    banner: "",
    custom_url: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    custom_url: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here, e.g., sending data to the server
    console.log(values);
    setSubmitting(false);
  };
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>

      {/* <!-- section begin --> */}
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/subheader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12 text-center">
                <h1>Edit Profile</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- section begin --> */}
      <section id="section-main" aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="spacer-20"></div>

                    <h5>Custom URL</h5>
                    <Field
                      type="text"
                      name="custom_url"
                      id="custom_url"
                      className="form-control"
                      placeholder="Enter your custom URL"
                    />
                    <ErrorMessage name="custom_url" component="div" />

                    <div className="spacer-20"></div>

                    <h5>Username</h5>
                    <Field
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter your username"
                    />
                    <ErrorMessage name="username" component="div" />

                    <div className="spacer-20"></div>

                    <h5>Password</h5>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="div" />

                    <div className="spacer-20"></div>

                    <h5>Email</h5>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" />

                    <div className="spacer-20"></div>

                    <h5>Social</h5>
                    <Field
                      type="text"
                      name="social"
                      className="form-control"
                      placeholder="Enter your social information"
                    />
                    <ErrorMessage name="social" component="div" />

                    <div className="spacer-20"></div>

                    <h5>About</h5>
                    <Field
                      type="text"
                      name="about"
                      className="form-control"
                      placeholder="Tell us about yourself"
                    />
                    <ErrorMessage name="about" component="div" />

                    <button
                      type="submit"
                      className="btn-main"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
