import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const sigupImage = "./SignupImageCropped.png";

const ForgotPassword = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setSuccessMessage(response.data.message);

      setEmail("");
    } catch (error) {
      if (error.response?.status === 400) {
        setApiError("Please enter a valid email.");
      } else {
        setApiError("Unable to send reset link.");
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </p>
            </>
          )}

          {activeSlide === 2 && (
            <>
              <h2 className="text-[24px] font-sf text-white font-medium text-center">
                No Worries
              </h2>
              <p className="text-[24px] font-sf text-white tracking-[-0.58px] text-center leading-[36px] signin-img-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              Reset Password
            </h2>
            <p className="text-[#013C61] text-[18px] font-sf font-normal">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#2BDA53]">
                Sign up
              </Link>
            </p>
            {/* STEPS */}
            <form onSubmit={handleForgotPassword}>
              <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-sm">
                <div className="space-y-14">
                  {/* <!-- Email --> */}
                  <div>
                    <label className="block text-sm text-[#6A7E8A] font-sf font-normal mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
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
                  </div>

                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}

                  {apiError && (
                    <p className="text-red-500 text-sm mt-3">{apiError}</p>
                  )}

                  {successMessage && (
                    <p className="text-green-600 text-sm mt-3">
                      {successMessage}
                    </p>
                  )}

                  {/* <!-- Continue Button --> */}
                  <div className="flex items-center justify-between">
                    <Link
                      to="/login"
                      className="text-[#2BDA53] font-sf text-sm"
                    >
                      Back to Login
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-[#2BDA53] text-white text-[18px] py-2 px-12 rounded-sm ${
                        loading
                          ? "opacity-50 cursor-not-allowed text-sm"
                          : "cursor-pointer hover:bg-green-600"
                      }`}
                    >
                      {loading ? "Sending..." : "Recover"}
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

export default ForgotPassword;
