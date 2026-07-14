import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <section className="min-h-screen bg-[#F6F8F8] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="font-sf font-bold text-[90px] md:text-[140px] leading-none text-[#013C61]">
          404
        </h1>

        <h2 className="mt-2 font-sf font-bold text-[28px] md:text-[36px] text-[#013C61]">
          Page Not Found
        </h2>

        <p className="mt-4 text-[#6A7E8A] font-sf text-[16px] md:text-[18px] leading-8">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to={isDashboardRoute ? "/dashboard" : "/"}
          className="inline-block mt-10 bg-[#2BDA53] hover:bg-[#22c549] transition-colors text-white font-sf font-bold text-[18px] px-8 py-3 rounded-sm"
        >
          {isDashboardRoute ? "Back to Dashboard" : "Back to Home"}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;