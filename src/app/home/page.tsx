"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiSearch, FiBell, FiCalendar, FiMapPin } from "react-icons/fi";
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
  // Hooks are defined unconditionally
  const { data: session, status } = useSession();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isBellToggled, setIsBellToggled] = useState(false);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Toggle Notification Bell
  const toggleBell = () => setIsBellToggled((prev) => !prev);

  // Fetch Upcoming Events
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

  // Fetch Venues
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

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Header */}
      <h1 className="flex items-center justify-between px-4 py-3 border-b">
        <FiMenu className="w-6 h-6 text-gray-600" />
        <p className="text-xs font-medium text-gray-500">
          Welcome aboard, <span className="text-black font-semibold">{session?.user?.name}</span> 👋
        </p>
        <button onClick={toggleBell} aria-label="Toggle Bell">
          {isBellToggled ? (
            <FaBell className="w-6 h-6 text-orange-500" />
          ) : (
            <FiBell className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </h1>

      {/* Search Section */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold leading-tight">
          Choose your favourite venue or find events and confirm your spot!
        </h2>
        <div className="relative mt-3">
          <FiSearch className="absolute left-3 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search venue or events"
            className="w-full pl-10 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="px-4 mt-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-semibold">Upcoming Events</h3>
          <Link href="#" className="text-orange-500 text-xs hover:underline">
            View All
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {events.map((event) => (
            <Link key={event.id} href={`/details/${event.id}?type=event`} className="min-w-[140px] block">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <Image
                  src={event.image_link}
                  alt={event.event_name}
                  width={140}
                  height={80}
                  className="w-full h-[80px] object-cover"
                />
                <div className="p-2">
                  <h4 className="text-xs font-medium truncate">{event.event_name}</h4>
                  <div className="flex items-center text-[10px] text-gray-500 mt-1">
                    <FiCalendar className="mr-1" />
                    {event.time_slot}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearby Section */}
      <section className="px-4 mt-5">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-sm font-semibold">Nearby</h3>
  </div>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {venues.map((venue) => (
      <Link key={venue.id} href={`/details/${venue.id}?type=venue`}>
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-all">
          <Image
            src={venue.image_link}
            alt={venue.name}
            width={180}
            height={90}
            className="w-full h-[90px] object-cover"
          />
          <div className="p-2">
            <h4 className="text-xs font-medium truncate">{venue.name}</h4>
            <div className="flex items-center text-[10px] text-gray-500 mt-1">
              <FiMapPin className="mr-1 text-orange-500" />
              {venue.location}
            </div>
            <div className="flex mt-1">
              {Array.from({ length: Math.floor(venue.rating) }).map((_, i) => (
                <span key={i} className="text-orange-500 text-[10px]">★</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* All Section */}
      <section className="px-4 mt-5 mb-5">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-sm font-semibold">All</h3>
  </div>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {venues.map((venue) => (
      <Link key={venue.id} href={`/details/${venue.id}?type=venue`}>
        <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-all">
          <Image
            src={venue.image_link}
            alt={venue.name}
            width={180}
            height={90}
            className="w-full h-[90px] object-cover"
          />
          <div className="p-2">
            <h4 className="text-xs font-medium truncate">{venue.name}</h4>
            <div className="flex items-center text-[10px] text-gray-500 mt-1">
              <FiMapPin className="mr-1 text-orange-500" />
              {venue.location}
            </div>
            <div className="flex mt-1">
              {Array.from({ length: Math.floor(venue.rating) }).map((_, i) => (
                <span key={i} className="text-orange-500 text-[10px]">★</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
    </div>
  );
};

export default LandingPage;
