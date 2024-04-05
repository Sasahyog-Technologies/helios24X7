import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo, hlogo } from "../../../Routes/ImagePath";
import { useSession } from "../../../Hook/useSession";
import strapiAxios from "../../../sdk";
import toast from "react-hot-toast";

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
      let res = await strapiAxios.post("/auth/local", {
        identifier,
        password,
      });
      let data = res.data;
      setUserInfoToCookies(data);
      setPassword("");
      setIdentifier("");
      navigate("/client/my-profile");
    } catch (error) {
      toast.error(error.response.data.error.message, { duration: 4000 });
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
                  <img
                    src={hlogo}
                    alt="Dreamguy's Technologies"
                    className="w-50"
                  />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to Dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Phone Number</label>
                        <input
                          required
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
                            required
                            className={`form-control`}
                            type="text"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            autoComplete="true"
                          />
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
                  </div>
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
