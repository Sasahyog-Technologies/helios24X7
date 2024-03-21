import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { useSession } from "../../../Hook/useSession";
import strapi from "../../../strapi";

const TestLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfoToCookies } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      await strapi.login({
        identifier,
        password,
      });
      setUserInfoToCookies(strapi.user);
      setIdentifier("");
      setPassword("");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log("Login Error", error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link>
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="/admin-dashboard">
                  <img src={Applogo} alt="Dreamguy's Technologies" />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Client Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Phone Number</label>
                        <input
                          className={`form-control`}
                          type="text"
                          onChange={(e) => setIdentifier(e.target.value)}
                          value={identifier}
                          autoComplete="true"
                        />
                      </div>
                      <div className="input-block mb-4">
                        <div className="row">
                          <div className="col">
                            <label className="col-form-label">Password</label>
                          </div>
                          <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            className={`form-control`}
                            type="text"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            autoComplete="true"
                          />
                          {/*    <span
                            style={{
                              position: "absolute",
                              right: "5%",
                              top: "30%",
                            }}
                            onClick={onEyeClick}
                            className={`fa-solid ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            } `}
                          /> */}
                        </div>
                      </div>
                      <div className="input-block text-center">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Login..." : "   Login"}
                        </button>
                      </div>
                    </form>
                    <div className="account-footer">
                      <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
                      </p>
                    </div>
                  </div>
                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
