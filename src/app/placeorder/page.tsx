"use client";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMoreVertical, FiMinus, FiPlus } from "react-icons/fi";
import { FaUserFriends, FaCalendarAlt, FaClock, FaGlassCheers, FaWineGlassAlt, FaGlassWhiskey } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ReactNode } from 'react';

type Quantities = {
  nonAlcoholic: number;
  premiumPackage: number;
  champagnePackage: number;
};

interface Package {
  key: keyof Quantities;
  name: string;
  price: number;
  description: string;
  icon: ReactNode;
}

const PlaceOrder = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [selectedDate, setSelectedDate] = useState("12");
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("12:00");
  const [selectedTimeTo, setSelectedTimeTo] = useState("13:00");
  const [quantities, setQuantities] = useState<Quantities>({
    nonAlcoholic: 0,
    premiumPackage: 0,
    champagnePackage: 0,
  });

  const timeOptions = [
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
  ];

  const packages: Package[] = [
    {
      key: "nonAlcoholic",
      name: "Non-Alcoholic Package",
      price: 5,
      description: "Includes soft drinks, juices, and mocktails",
      icon: <FaGlassCheers className="w-6 h-6 text-blue-500" />
    },
    {
      key: "premiumPackage",
      name: "Premium Package",
      price: 10,
      description: "Premium spirits, wines, and craft beers",
      icon: <FaWineGlassAlt className="w-6 h-6 text-purple-500" />
    },
    {
      key: "champagnePackage",
      name: "Champagne Package",
      price: 20,
      description: "Luxury champagnes and premium spirits",
      icon: <FaGlassWhiskey className="w-6 h-6 text-amber-500" />
    }
  ];

  const handleTimeFromChange = (time: string) => {
    setSelectedTimeFrom(time);
    const index = timeOptions.indexOf(time);
    setSelectedTimeTo(timeOptions[index + 1] || timeOptions[timeOptions.length - 1]);
  };

  const handleQuantityChange = (
    packageType: keyof Quantities,
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

  const totalAmount = packages.reduce((sum, pkg) => 
    sum + (quantities[pkg.key] * pkg.price), 0
  );

  const totalGuests = Object.values(quantities).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Place Order</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <FiMoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Date Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {["12", "13", "14", "15", "16", "17", "18"].map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center min-w-[80px] py-4 px-2 rounded-xl transition-all ${
                  selectedDate === date
                    ? "bg-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl font-bold mb-1">{date}</span>
                <span className="text-sm">
                  {["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Venue Image */}
        <section className="mb-8">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/placeorder.png"
              alt="Venue"
              width={1200}
              height={400}
              className="w-full h-[200px] sm:h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </section>

        {/* Time Selection */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Time Selection</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">From</label>
              <select
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedTimeFrom}
                onChange={(e) => handleTimeFromChange(e.target.value)}
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">To</label>
              <select
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedTimeTo}
                onChange={(e) => setSelectedTimeTo(e.target.value)}
              >
                {timeOptions
                  .filter((time) => time > selectedTimeFrom)
                  .map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
              </select>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Packages</h2>
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div
                key={pkg.key}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {pkg.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                      <p className="text-lg font-semibold text-orange-500 mt-2">
                        ${pkg.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(pkg.key, "decrement")}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
                    >
                      <FiMinus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {quantities[pkg.key]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(pkg.key, "increment")}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="w-5 h-5 text-orange-500 mr-3" />
              <span>Date: {selectedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="w-5 h-5 text-orange-500 mr-3" />
              <span>Time: {selectedTimeFrom} - {selectedTimeTo}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaUserFriends className="w-5 h-5 text-orange-500 mr-3" />
              <span>Total Guests: {totalGuests}</span>
            </div>
            <div className="pt-3 mt-3 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-orange-500">${totalAmount}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Continue Button */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={totalGuests === 0}
            onClick={() => {
              const queryParams = new URLSearchParams({
                name: session?.user?.name || "Guest",
                table: "Table 1",
                time: `${selectedTimeFrom} - ${selectedTimeTo}`,
                date: selectedDate,
                orderId: `#${Math.floor(Math.random() * 100000000)}`,
              });
              router.push(`/booking-overview?${queryParams.toString()}`);
            }}
          >
            Continue to Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
