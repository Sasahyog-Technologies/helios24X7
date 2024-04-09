import toast from "react-hot-toast";
import strapiAxios from "../../../sdk";
import React, { useState } from "react";
import { hlogo } from "../../../Routes/ImagePath";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../../../Hook/useSession";

const routes = {
  owner: "/owner/client-list",
  trainer: "/trainer/my-profile",
  client: "/client/my-profile",
  manager: "/manager/my-profile",

};

const TestLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { setUserInfoToCookies } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const res = await strapiAxios.post("/auth/local", {
        identifier,
        password,
      });
      const data = res.data;
      const userType = data?.user?.type;
      const nextRoute = routes[userType];
      setUserInfoToCookies(data);
      setPassword("");
      setIdentifier("");
      navigate(nextRoute);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message, { duration: 4000 });
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
            {/* <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link> */}
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
                  <p className="account-subtitle">Welcome to Helios</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Phone Number</label>
                        <input
                          required
                          className={`form-control`}
                          type="number"
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
                          {/* <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div> */}
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
