"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiBell, FiMapPin, FiClock, FiStar, FiLogOut, FiCalendar, FiFilter } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  event_name: string;
  time_slot: string;
  image_link: string;
  status: string;
  location?: string;
  description?: string;
}

interface Venue {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  image_link: string;
}

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isBellToggled, setIsBellToggled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "events" | "venues">("all");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "distance">("name");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const toggleBell = () => setIsBellToggled((prev) => !prev);
  const toggleFilters = () => setShowFilters((prev) => !prev);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data.filter((event: Event) => event.status === "upcoming"));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch("/api/venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }
    fetchVenues();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort venues based on selected sort option
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance") {
      // Convert distance strings like "2.5 km" to numbers for comparison
      const distanceA = parseFloat(a.distance.split(" ")[0]);
      const distanceB = parseFloat(b.distance.split(" ")[0]);
      return distanceA - distanceB;
    }
    return 0;
  });

  // Determine what to display based on filter type
  const showEvents = filterType === "all" || filterType === "events";
  const showVenues = filterType === "all" || filterType === "venues";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <FiMenu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome,</span>
              <span className="font-semibold text-gray-800">{session?.user?.name}</span>
              <span className="text-2xl">👋</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleBell} 
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Notifications"
              >
                {isBellToggled ? (
                  <FaBell className="w-6 h-6 text-orange-500" />
                ) : (
                  <FiBell className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition flex items-center text-gray-600 hover:text-red-500"
                aria-label="Logout"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="ml-1 text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Find Your Perfect Venue
          </h1>
          <p className="text-gray-600 mb-4">
            Discover amazing venues and events near you
          </p>
          <div className="relative flex items-center">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search venues, events, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>
            <button 
              onClick={toggleFilters}
              className={`ml-2 p-3 rounded-xl border ${showFilters ? 'bg-orange-50 border-orange-200 text-orange-500' : 'bg-white border-gray-200 text-gray-600'} hover:bg-orange-50 hover:text-orange-500 transition`}
            >
              <FiFilter className="w-5 h-5" />
            </button>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setFilterType("all")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${filterType === "all" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setFilterType("events")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${filterType === "events" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      Events
                    </button>
                    <button 
                      onClick={() => setFilterType("venues")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${filterType === "venues" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      Venues
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSortBy("name")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${sortBy === "name" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      Name
                    </button>
                    <button 
                      onClick={() => setSortBy("rating")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${sortBy === "rating" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      Rating
                    </button>
                    <button 
                      onClick={() => setSortBy("distance")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${sortBy === "distance" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition`}
                    >
                      Distance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        {showEvents && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              <Link href="#" className="text-orange-500 font-medium hover:text-orange-600 transition">
                View All
              </Link>
            </div>
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No events match your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <Link key={event.id} href={`/details/${event.id}?type=event`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group h-full">
                      <div className="relative">
                        <Image
                          src={event.image_link}
                          alt={event.event_name}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                          Upcoming
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{event.event_name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FiClock className="mr-2 text-orange-500" />
                          <span className="text-sm">{event.time_slot}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center text-gray-600">
                            <FiMapPin className="mr-2 text-orange-500" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button className="w-full py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Venues */}
        {showVenues && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Popular Venues</h2>
            </div>
            {sortedVenues.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <FiMapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No venues match your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVenues.map((venue) => (
                  <Link key={venue.id} href={`/details/${venue.id}?type=venue`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group h-full">
                      <div className="relative">
                        <Image
                          src={venue.image_link}
                          alt={venue.name}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                          <FiStar className="text-orange-500 mr-1" />
                          <span className="font-medium">{venue.rating}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{venue.name}</h3>
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2 text-orange-500" />
                          <span className="text-sm">{venue.location}</span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="text-orange-500 mr-1">{venue.distance}</span>
                          away
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button className="w-full py-2 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
