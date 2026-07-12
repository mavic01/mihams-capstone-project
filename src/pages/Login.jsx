import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const sigupImage = "./SignupImageCropped.png";

const Login = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("firstName", response.data.firstName);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        setApiError("Invalid email or password.");
      } else {
        setApiError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex gap-16 h-screen overflow-hidden">
      {/* LEFT IMAGE */}
      <div className="hidden relative md:flex flex-1 h-screen overflow-hidden">
        <div className="absolute flex flex-col gap-2 bottom-12 left-1/2 -translate-x-1/2">
          {activeSlide === 1 && (
            <>
              <h2 className="text-[24px] font-sf text-white font-medium text-center">
                No Hazzles
              </h2>
              <p className="text-[24px] font-sf text-white tracking-[-0.58px] text-center leading-[36px] signin-img-text">
                Seamlessly manage employees
              </p>
            </>
          )}

          {activeSlide === 2 && (
            <>
              <h2 className="text-[24px] font-sf text-white font-medium text-center">
                No Worries
              </h2>
              <p className="text-[24px] font-sf text-white tracking-[-0.58px] text-center leading-[36px] signin-img-text">
                Smooth and easy experience
              </p>
            </>
          )}

          <p className="flex gap-[24px] items-center justify-center">
            <span
              onClick={() => setActiveSlide(1)}
              className={`boost-btn cursor-pointer relative ${
                activeSlide === 1 ? "active" : ""
              }`}
              aria-label="No Hazzles"
            ></span>

            <span
              onClick={() => setActiveSlide(2)}
              className={`boost-btn cursor-pointer relative ${
                activeSlide === 2 ? "active" : ""
              }`}
              aria-label="No Worries"
            ></span>
          </p>
        </div>
        <img
          className="h-full w-full object-cover object-left"
          src={`${sigupImage}`}
          alt="Login Image"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex flex-col">
        <div className="flex px-6 py-4">
          <div className="space-y-4 w-full">
            <h2 className="text-[34px] text-[#013C61] font-sf font-medium">
              Welcome
            </h2>
            <p className="text-[#013C61] text-[18px] font-sf font-normal">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#2BDA53]">
                Sign up
              </Link>
            </p>
            {/* STEPS */}
            <form onSubmit={handleSubmit}>
              <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-sm">
                <div className="space-y-6">
                  {/* <!-- Email --> */}
                  <div>
                    <label className="block text-sm text-[#6A7E8A] font-sf font-normal mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="josh.bakery@gmail.com"
                        className="w-full px-2 py-3 border-b border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-gray-800"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <img
                          src="./@.png"
                          className="w-4 h-4 object-contain"
                          alt="Email Icon"
                        />
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm text-[#6A7E8A] font-sf font-normal mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        onChange={handleChange}
                        value={formData.password}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="*************"
                        className="w-full px-2 py-3 border-b border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-gray-800"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                        <img
                          src="./eye.png"
                          className="w-4 h-4 object-contain"
                          alt="Eye Image"
                        />
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {apiError && (
                    <p className="text-red-500 text-sm">{apiError}</p>
                  )}

                  {/* <!-- Buttons --> */}
                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="text-[#2BDA53] font-sf text-sm"
                    >
                      Forgot Password?
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`cursor-pointer ml-auto bg-[#2BDA53] text-white text-[18px] font-medium py-2 px-8 md:px-12 rounded-sm mt-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"}`}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Terms and Policy */}
        <div className="flex items-center justify-betweeen gap-20 mt-auto mb-10 mx-2 md:mx-0">
          <p className="text-xs text-[#6A7E8A]">
            By siging up, you agree to our{" "}
            <a href="#" className="text-[#2BDA53]">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#2BDA53]">
              Privacy Policy
            </a>
          </p>
          <p className="text-xs text-[#6A7E8A] font-sf">
            © {new Date().getFullYear()} Tinylabs. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
