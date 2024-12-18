"use client";
import { useState } from "react";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
//import { FaUserFriends, FaCalendarAlt, FaClock, FaTable } from "react-icons/fa";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

const PlaceOrder = () => {


  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //     if (status === "unauthenticated") {
  //       router.push("/");
  //     }
  //   }, [status, router]);

  const [selectedDate, setSelectedDate] = useState("12");
  const selectedTimeFrom = useState("12:00");
  const selectedTimeTo = useState("13:00");
  const [quantities, setQuantities] = useState({
    nonAlcoholic: 20,
    premiumPackage: 20,
    champagnePackage: 20,
  });

  // const timeOptions = [
  //   "11:00", "12:00", "13:00", "14:00", "15:00",
  //   "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
  // ];

  // const handleTimeFromChange = (time: string) => {
  //   setSelectedTimeFrom(time);
  //   const index = timeOptions.indexOf(time);
  //   setSelectedTimeTo(timeOptions[index + 1] || timeOptions[timeOptions.length - 1]);
  // };

  const handleQuantityChange = (
    packageType: keyof typeof quantities,
    action: "increment" | "decrement"
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [packageType]:
        action === "increment"
          ? prev[packageType] + 1
          : Math.max(0, prev[packageType] - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-4 lg:p-8">
        {/* Header */}
        <h1 className="flex justify-between items-center mb-6">
          <button onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900">
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Place Order</h1>
          <button className="text-gray-700 hover:text-gray-900">
            <FiMoreVertical className="w-6 h-6" />
          </button>
        </h1>

        {/* Day Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h2>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
            {["12", "13", "14", "15", "16", "17", "18"].map((date, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center min-w-[70px] h-20 cursor-pointer rounded-lg shadow-md border transition-all ${
                  selectedDate === date
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <span className="font-bold text-lg">{date}</span>
                <span className="text-sm">
                  {["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Packages</h2>
          {[
            { name: "Non-Alcoholic", price: 5, key: "nonAlcoholic" },
            { name: "Premium Package", price: 10, key: "premiumPackage" },
            { name: "Champagne Package", price: 20, key: "champagnePackage" },
          ].map((pkg) => (
            <div
              key={pkg.key}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
            >
              <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">${pkg.price}</span>
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => handleQuantityChange(pkg.key as keyof typeof quantities, "decrement")}
                >
                  -
                </button>
                <span className="w-8 text-center">{quantities[pkg.key as keyof typeof quantities]}</span>
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => handleQuantityChange(pkg.key as keyof typeof quantities, "increment")}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-600 transition"
            onClick={() => {
              const customerName = "Ujjwal Kumar Singh";
              const table = "11 - 12";
              const time = `${selectedTimeFrom} - ${selectedTimeTo}`;
              const date = selectedDate;
              const orderId = `#${Math.floor(Math.random() * 100000000)}`;
              const nonAlcoholic = quantities.nonAlcoholic;
              const premium = quantities.premiumPackage;
              const champagne = quantities.champagnePackage;

              const queryParams = new URLSearchParams({
                name: customerName,
                table: table,
                time: time,
                date: date,
                orderId: orderId,
                nonAlcoholic: nonAlcoholic.toString(),
                premium: premium.toString(),
                champagne: champagne.toString(),
              }).toString();

              window.location.href = `/booking-overview?${queryParams}`;
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
