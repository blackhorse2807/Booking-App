"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMapPin, FiStar, FiChevronLeft, FiClock, FiInfo, FiShare2, FiX, FiFacebook, FiTwitter, FiLink } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface VenueData {
  id: number;
  name: string;
  location: string;
  address?: string;
  rating?: number;
  number_of_reviews?: number;
  image_link: string;
  maps_link?: string;
  information?: string;
  additional_info?: string;
}

interface EventData {
  id: number;
  event_name: string;
  time_slot: string;
  location: string;
  address?: string;
  image_link: string;
  maps_link?: string;
  information?: string;
  additional_info?: string;
}

type DetailData = VenueData | EventData;

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

const DetailsPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

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

  const handleShare = async (platform: string) => {
    if (!data) return;
    const currentUrl = window.location.href;
    const title = isEvent ? data.event_name : data.name;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
    setShowShareMenu(false);
  };

  const shareOptions: ShareOption[] = [
    {
      name: "Facebook",
      icon: <FiFacebook className="w-5 h-5" />,
      action: () => handleShare('facebook')
    },
    {
      name: "Twitter",
      icon: <FiTwitter className="w-5 h-5" />,
      action: () => handleShare('twitter')
    },
    {
      name: "Copy Link",
      icon: <FiLink className="w-5 h-5" />,
      action: () => handleShare('copy')
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">No details found</div>
        <button
          onClick={() => router.back()}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isEvent = 'event_name' in data;
  const title = isEvent ? data.event_name : data.name;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              {type === "event" ? "Event Details" : "Venue Details"}
            </h1>
            <button
              onClick={() => setShowShareMenu(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FiShare2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Image Section */}
        <div className="relative rounded-xl overflow-hidden mb-6 shadow-sm">
          <Image
            src="/details.jpg"
            alt={title}
            width={1200}
            height={600}
            className="w-full h-[300px] sm:h-[400px] object-cover transition duration-300 hover:scale-[1.02]"
          />
          {'rating' in data && data.rating && data.number_of_reviews && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center shadow">
              <FiStar className="text-orange-500 mr-2" />
              <span className="font-semibold text-gray-800">{data.rating}</span>
              <span className="text-sm text-gray-500 ml-1">
                ({data.number_of_reviews} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT: Main Info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h2>

              {/* Time & Location */}
              <div className="space-y-6 mb-6 text-sm sm:text-base">
                {isEvent && data.time_slot && (
                  <div className="flex items-start text-gray-700">
                    <FiClock className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <div>
                      <div className="font-medium mb-1">Time</div>
                      <div>{data.time_slot}</div>
                    </div>
                  </div>
                )}

                {data.location && (
                  <div className="flex items-start text-gray-700">
                    <FiMapPin className="w-5 h-5 text-orange-500 mt-1 mr-3" />
                    <div>
                      <div className="font-medium mb-1">Location</div>
                      {data.maps_link ? (
                        <a
                          href={data.maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {data.location}
                        </a>
                      ) : (
                        <span>{data.location}</span>
                      )}
                      {data.address && (
                        <div className="text-sm text-gray-500 mt-1">{data.address}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* About Section */}
              {data.information && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <FiInfo className="w-5 h-5 text-orange-500 mr-2" />
                    About
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{data.information}</p>
                </div>
              )}

              {/* Additional Details */}
              {data.additional_info && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Details</h3>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: data.additional_info }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Info Card */}
          <div>
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 sticky top-24">
              {'rating' in data && data.rating && (
                <div className="flex items-center text-gray-700">
                  <FiStar className="text-yellow-400 mr-2" />
                  <span className="font-semibold">{data.rating}</span>
                  {data.number_of_reviews && (
                    <span className="text-sm text-gray-500 ml-2">({data.number_of_reviews} reviews)</span>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900 mb-1">Address</div>
                {data.address || data.location}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link href="../placeorder">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                    Continue to Booking
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Share</h3>
              <button
                onClick={() => setShowShareMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className="w-full flex items-center px-4 py-3 hover:bg-gray-50 rounded-xl transition mb-2"
                >
                  <span className="text-gray-600">{option.icon}</span>
                  <span className="ml-3 text-gray-700">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Copy Link Toast */}
      {showShareToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
