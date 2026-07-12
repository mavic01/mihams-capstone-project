import { useState } from "react";

const centerDashArrowLeft = "./centerDashArrowLeft.png";
const centerDashArrowRight = "./centerDashArrowRight.png";


const recentActivities = [
              {
                id: 1,
                activity: "Wallet top up",
                date: "06 Aug, 2019",
                time: "12:24PM",
                name: "Admin",
                amount: "NGN2000"
              },
              {
                id: 2,
                activity: "Top for 081359491**",
                date: "06 Aug, 2019",
                time: "10:44AM",
                name: "Jane",
                amount: "NGN55.00"
              },
              {
                id: 3,
                activity: "Top for 080234578**",
                date: "06 Aug, 2019",
                time: "09:14AM",
                name: "Hannah",
                amount: "NGN400.00"
              },
              {
                id: 4,
                activity: "IOU for 081478491**",
                date: "05 Aug, 2019",
                time: "01:30PM",
                name: "John",
                amount: "BRM***K"
              },
              {
                id: 5,
                activity: "Top for 081359491**",
                date: "05 Aug, 2019",
                time: "11:24AM",
                name: "Admin",
                amount: "SAM***G"
              },
              {
                id: 6,
                activity: "Top for 081359491**",
                date: "04 Aug, 2019",
                time: "12:45PM",
                name: "Jane",
                amount: "NGN105.00"
              }              
            ]

const DashboardMainContent = () => {
  
  const [topUpModal, setTopUpModal] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Top up data:", form);
  };

  return (
    <section className="bg-[#F6F8F8] px-4 lg:p-8">
      {/* MODAL */}
      {topUpModal && (
        <div className="fixed inset-0 bg-[#1B2420]/50 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-12">
            {/* Close button */}
            <button
              onClick={() => setTopUpModal(false)}
              className="absolute top-4 right-4 text-white text-xs flex items-center justify-center p-[10px] cursor-pointer bg-[#6A7E8A] rounded-full h-4 w-4 hover:text-[#ffffffaa] font-bold font-sf mb-6"
            >
              ✕
            </button>
            {/* Title */}
            <h2 className="text-[30px] font-medium font-sf text-[#013C61] mb-6">
              Top up your store wallet
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Amount */}
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="Enter Amount"
              />

              {/* Card Number */}
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full border-b border-[#E6E7EB] outline-none py-2"
                placeholder="Card Number"
              />

              {/* Expiry + CVV */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    className="w-full border-b border-[#E6E7EB] outline-none py-2"
                    placeholder="Expiry Date (MM/YY)"
                  />
                </div>

                <div className="w-24">
                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full border-b border-[#E6E7EB] outline-none py-2"
                    placeholder="CVV"
                  />
                </div>
              </div>

              {/* Save card and Button*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={form.saveCard}
                    onChange={handleChange}
                    className="accent-[#2BDA53] cursor-pointer"
                  />
                  <span className="text-sm text-[#6A7E8A] font-sf">
                    Use saved debit card
                  </span>
                </div>
                {/* Button */}
                <button
                  type="submit"
                  className="bg-[#2BDA53] cursor-pointer text-white text-[18px] font-sf px-6 py-2 rounded-sm font-medium"
                >
                  Credit Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOP CARD 1 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-6 py-4 rounded-sm bg-white">
        <p className="text-[18px] text-[#013C61] font-sf font-bold">
          Store Wallet
        </p>

        <p className="text-[28px] md:text-[34px] text-[#013C61] font-sf font-medium">
          <sup className="text-[16px] md:text-[20px]">₦ </sup>2,500
        </p>

        <button
          onClick={() => setTopUpModal(true)}
          className="w-full md:w-auto text-white text-[16px] md:text-[18px]
          bg-[#2BDA53] hover:bg-[#09bc33]
          font-sf font-bold rounded-sm px-6 md:px-10 py-3 cursor-pointer"
        >
          Top up wallet
        </button>
      </div>

      {/* TOP CARD 2 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-6 py-4 rounded-sm bg-white mt-4 md:mt-6">
        <p className="text-[18px] text-[#013C61] font-sf font-bold">
          Total Disbursed
        </p>

        <p className="text-[28px] md:text-[34px] text-[#013C61] font-sf font-medium">
          <sup className="text-[16px] md:text-[20px]">₦ </sup>12,000
        </p>

        <a
          href="#"
          className="w-full md:w-auto text-center
          text-[#013C61] hover:text-white hover:bg-[#013C61]
          border border-[#013C61]/20
          text-[16px] md:text-[18px]
          font-sf font-bold rounded-sm px-6 md:px-10 py-3 cursor-pointer"
        >
          View History
        </a>
      </div>

      {/* TABLE SECTION */}
      <div className="mt-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="font-bold font-sf text-lg text-[#013C61]">
            Recent Activities
          </h2>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <span className="flex items-center gap-2">
              <span className="font-normal font-sf px-2 rounded-md border border-[#013c61]/10">
                1
              </span>
              <span className="font-normal font-sf text-[#013C61]">of 8</span>
            </span>

            <span className="flex items-center gap-2">
              <img
                className="cursor-pointer w-[18px] h-[18px]"
                src={centerDashArrowLeft}
                alt="Left Arrow"
              />
              <img
                className="cursor-pointer w-[18px] h-[18px]"
                src={centerDashArrowRight}
                alt="Right Arrow"
              />
            </span>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[700px] w-full text-center border-separate border-spacing-y-3">
            <thead className="text-[#013C61] text-sm font-sf">
              <tr>
                <th>#</th>
                <th>DESCRIPTION</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>STAFF</th>
                <th>AMOUNT</th>
              </tr>
            </thead>

            {recentActivities.map((activity) => (
              <tbody className="font-sf text-[#6A7E8A] text-base">
              <tr className="bg-white">
                <td className="px-2 py-4">{activity.id}</td>
                <td className="px-2 py-4">{activity.activity}</td>
                <td className="px-2 py-4">{activity.date}</td>
                <td className="px-2 py-4">{activity.time}</td>
                <td className="px-2 py-4">{activity.name}</td>
                <td className="px-2 py-4">{activity.amount}</td>
              </tr>
            </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default DashboardMainContent;
