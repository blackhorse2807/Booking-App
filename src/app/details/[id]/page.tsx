"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMapPin, FiCalendar, FiStar, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const DetailsPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = type === "event" ? `/api/events?id=${id}` : `/api/venues?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, type]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!data) return <div className="text-center mt-20 text-red-500">No details found.</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative p-4 flex items-center justify-between border-b shadow-md">
  {/* Back Button */}
  <button onClick={() => window.history.back()} className="text-black">
    <FiChevronLeft className="text-2xl" /> {/* Formal Chevron Arrow */}
  </button>

  {/* Title */}
  <h1 className="text-xl font-semibold text-center absolute left-1/2 transform -translate-x-1/2">
    Detail
  </h1>
</div>


      {/* Main Content */}
      <div className="p-4">
        {/* Image */}
        <Image
          src={data.image_link || "/placeholder.jpg"}
          alt={data.name || data.event_name}
          width={800}
          height={300}
          className="w-full h-[180px] object-cover rounded-lg"
        />

        {/* Title */}
        <h2 className="text-2xl font-bold mt-4 uppercase">{data.name || data.event_name}</h2>

        {/* Rating */}
        {data.rating && data.number_of_reviews && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <FiStar className="text-orange-500 mr-1" />
            <span>
              {data.rating} ⭐ ({data.number_of_reviews} reviews)
            </span>
          </div>
        )}

        {/* Location */}
        {data.location && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-1">Location</h3>
            <div className="flex items-center text-gray-700">
              <FiMapPin className="mr-2 text-orange-500" />
              <a
                href={data.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.location}
              </a>
            </div>
            {data.address && (
              <p className="mt-1 text-gray-600">
                <strong>Address:</strong> {data.address}
              </p>
            )}
          </div>
        )}

        {/* Time Slot */}
        {data.time_slot && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <FiCalendar className="mr-2 text-orange-500" />
            <span>{data.time_slot}</span>
          </div>
        )}

        {/* Information Section */}
        {data.information && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Information</h3>
            <p className="text-gray-700 leading-relaxed">{data.information}</p>
          </div>
        )}

        {/* Additional Info */}
        {data.additional_info && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
            <div className="text-gray-700 text-sm leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: data.additional_info }} />
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6">
          <Link href = "../placeorder">
          <button
            className="w-full text-center bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
          >
            Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
