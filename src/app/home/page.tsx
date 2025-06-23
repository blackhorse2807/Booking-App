"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiBell, FiCalendar, FiMapPin, FiClock, FiStar } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Event {
  id: number;
  event_name: string;
  time_slot: string;
  image_link: string;
  status: string;
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const toggleBell = () => setIsBellToggled((prev) => !prev);

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
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search venues, events, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Upcoming Events */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="#" className="text-orange-500 font-medium hover:text-orange-600 transition">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Link key={event.id} href={`/details/${event.id}?type=event`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                  <div className="relative">
                    <Image
                      src={event.image_link}
                      alt={event.event_name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{event.event_name}</h3>
                      <div className="flex items-center text-white/90 text-sm mt-1">
                        <FiClock className="mr-2" />
                        {event.time_slot}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Venues */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Popular Venues</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <Link key={venue.id} href={`/details/${venue.id}?type=venue`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
