import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

import RegisterStep1 from "../components/RegisterStep1";
import RegisterStep2 from "../components/RegisterStep2";
import RegisterStep3 from "../components/RegisterStep3";

const sigupImage = "./SignupImageCropped.png";
const sigupImage2 = "./SignupImage2(1).png";

const Register = () => {
  const [step, setStep] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businessName: "",
    businessAddress: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");

    if (!validateStep2()) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/register", formData);

      setStep(3);
    } catch (error) {
      // console.log(error);
      // console.log(error.response);
      // console.log(error.response?.data);
      // console.log(error.response?.status);

      if (error.response?.status === 409) {
        setApiError("Email already exists.");
      } else {
        setApiError("Registration failed. Please try again.");
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
                Seemlessly manage employees
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
          src={step === 2 || step === 3 ? sigupImage2 : sigupImage}
          alt="signUp Image"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex flex-col">
        <div className="flex px-6 py-4">
          <div className="space-y-4 w-full">
            {step !== 3 && (
              <>
                <h2 className="text-[34px] text-[#013C61] font-sf font-medium">
                  Create your free account
                </h2>
                <p className="text-[#013C61] text-[18px] font-sf font-normal">
                  Already registered?{" "}
                  <Link to="/login" className="text-[#2BDA53]">
                    Sign in
                  </Link>
                </p>
              </>
            )}
            {/* STEPS */}
            <form onSubmit={handleSubmit}>
              <RegisterStep1
                step={step}
                formData={formData}
                handleChange={handleChange}
                handleContinue={handleContinue}
                errors={errors}
              />
              <RegisterStep2
                step={step}
                formData={formData}
                handleChange={handleChange}
                loading={loading}
                errors={errors}
                apiError={apiError}
              />
            </form>
            <RegisterStep3 firstName={formData.firstName} step={step} />
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

export default Register;
