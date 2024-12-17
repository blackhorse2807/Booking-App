import { NextResponse } from "next/server";

const venues = [
  {
    "id" : 1,
    "name": "ARMANI PRIVE",
    "information": "Immerse yourself in the epitome of sophisticated nightlife at Armani/Privé, housed within the iconic Armani Hotel at Burj Khalifa. Expect world-class DJs, avant-garde music, and an ultra-luxurious setting.",
    "maps_link": "https://www.google.com/maps/place/Armani%2FPrive",
    "location": "Armani/Prive",
    "rating": "4.1",
    "number_of_reviews": "312",
    "venue_type": "Nightclub",
    "address": "Armani Hotel Dubai, Burj Khalifa - 1 Sheikh Mohammed bin Rashid Blvd - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/1.jpg"
  },
  {
    "id" : 2,
    "name": "BOUDOIR",
    "information": "Chic and cosmopolitan, Boudoir seamlessly blends French flair and modern luxury. Revel in glamorous interiors, premium beverages, and an eclectic music lineup, making every visit stylish and unforgettable.",
    "maps_link": "https://www.google.com/maps/place/Boudoir/@25.2341035,55.2576118,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f6a540d69b295:0x466777a753516b3c!8m2!3d25.2341036!4d55.2624827!16s%2Fg%2F1vcq622g?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Boudoir",
    "rating": "5",
    "number_of_reviews": "156",
    "venue_type": "Bar & Nightclub",
    "address": "Dubai Marine Beach Resort & Spa - Jumeirah St - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/20.jpg",
},
{
    "id" : 3,
    "name": "DOMELAND",
    "information": "Domeland takes you on a sensory journey beneath a stunning dome-like setting, with immersive soundscapes, innovative lighting, and cutting-edge performances for an otherworldly nightlife experience.",
    "maps_link": "https://www.google.com/maps/place/Chi,+The+Spa+at+Shangri-La,+Dubai/@25.2084154,55.2686033,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x8d3eb87ef915f2b0!8m2!3d25.2084154!4d55.2711782!16s%2Fg%2F1hc1yl0k5?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Chi, The Spa at Shangri-La, Dubai",
    "rating": "4.5",
    "number_of_reviews": "543",
    "venue_type": "Spa",
    "address": "Shangri-La Hotel, Sheikh Zayed Rd - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/21.jpg",
},
{
    "id" : 4,
    "name": "CIELO SKY LOUNGE",
    "information": "Elevate your night at Cielo Sky Lounge, with panoramic views, signature cocktails, and deep house beats. Enjoy an open-air terrace perfect for stylish sundowners and late-night mingling.",
    "maps_link": "https://www.google.com/maps/place/Cielo+Sky+Lounge/@25.2456722,55.3286171,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f5d3ce3d2f865:0x80a417235cae32d0!8m2!3d25.2456722!4d55.331192!16s%2Fg%2F11bbwpv4j0?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Cielo Sky Lounge",
    "rating": "3.2",
    "number_of_reviews": "328",
    "venue_type": "Rooftop Bar & Lounge",
    "address": "Dubai Creek Golf & Yacht Club - Port Saeed - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/21.jpg",
},
{
    "id" : 5,
    "name": "DUBAI CREEK GOLF CLUB",
    "information": "By dusk, Dubai Creek Golf Club transforms into a refined social hub with elegant lounges, fine dining, and stunning creek views, perfect for a relaxed yet upscale evening.",
    "maps_link": "https://www.google.com/maps/place/Dubai+Creek+Golf+%26+Yacht+Club/@25.2416925,55.3309503,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f5d3d31281a7b:0x5e8640a94b0fbec8!8m2!3d25.2416925!4d55.3335252!16s%2Fg%2F1z3t2thym?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Dubai Creek Golf & Yacht Club",
    "rating": "4.5",
    "number_of_reviews": "1,325",
    "venue_type": "Golf Club",
    "address": "Port Saeed - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/22.jpg",
},
{
    "id" : 6,
    "name": "DUBAI SPORTS CITY",
    "information": "Experience the energetic pulse of Dubai Sports City by night. From buzzing lounges to vibrant events, it caters to sports lovers and revelers, making it a dynamic social destination.",
    "maps_link": "https://www.google.com/maps/place/Dubai+Sports+City+-+Dubai+-+United+Arab+Emirates/@25.0365616,55.2066422,3597m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3e5f6ddd39763a6f:0x57e0cc67b8f14b4c!2sDubai+Sports+City+-+Dubai+-+United+Arab+Emirates!3b1!8m2!3d25.0391345!4d55.2176352!16s%2Fg%2F1x5f8v7q!3m5!1s0x3e5f6ddd39763a6f:0x57e0cc67b8f14b4c!8m2!3d25.0391345!4d55.2176352!16s%2Fg%2F1x5f8v7q?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Dubai Sports City",
    "rating": "4.3",
    "number_of_reviews": "500",
    "venue_type": "Sports Complex",
    "address": "Dubai - United Arab Emirates",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/23.jpg",
},
{
    "id" : 7,
    "name": "CHINAWHITE",
    "information": "Chinawhite redefines clubbing with trendy interiors, luxury vibes, top-tier DJs, premium service, and an exclusive crowd for an upscale, unforgettable escapade.",
    "maps_link": "https://www.google.com/maps/place/Grand+Hyatt+Dubai/@25.2281408,55.325328,898m/data=!3m2!1e3!4b1!4m9!3m8!1s0x3e5f5d46f88c69a3:0xbdd27b1c33c3af0d!5m2!4m1!1i2!8m2!3d25.2281408!4d55.3279029!16zL20vMDViZnY4?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Grand Hyatt Dubai",
    "rating": "4.3",
    "number_of_reviews": "12,187",
    "venue_type": "Hotel",
    "address": "Grand Hyatt Dubai - 11 Sheikh Rashid Rd - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/2.jpg",
},
{
    "id" : 8,
    "name": "11:11 CLUB",
    "information": "Step into a realm of immersive nightlife at 11:11 Club, where cutting-edge sound, eye-catching visuals, and a sophisticated ambiance combine to create a memorable experience.",
    "maps_link": "https://www.google.com/maps/place/Hilton+Dubai+Al+Habtoor+City/@25.1842241,55.2518501,898m/data=!3m1!1e3!4m9!3m8!1s0x3e5f69dba4b8bc19:0x817067b2e7866b05!5m2!4m1!1i2!8m2!3d25.1844946!4d55.2552322!16s%2Fg%2F11c1qjx6pc?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "Hilton Dubai Al Habtoor City",
    "rating": "4.3",
    "number_of_reviews": "2,153",
    "venue_type": "Hotel",
    "address": "Al Habtoor City - Sheikh Zayed Rd - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/3.jpg",
},
{
    "id" : 9,
    "name": "PURO BEACH CLUB",
    "information": "Puro Beach Club is a chic seaside haven with sun-kissed afternoons flowing into vibrant evenings. Enjoy handcrafted cocktails, live beats, and a breezy beachfront vibe.",
    "maps_link": "https://www.google.com/maps/place/JA+The+Resort+-+JA+Beach+Hotel/@24.9802985,55.0050706,3880m/data=!3m1!1e3!4m17!1m5!2m4!1sJebel+Ali+Beach+Resort!5m2!5m1!1s2025-03-06!3m10!1s0x3e5f11c0a01c7649:0xff630277bbbc55a9!5m3!1s2025-03-06!4m1!1i2!8m2!3d24.9877024!4d55.0232699!15sChZKZWJlbCBBbGkgQmVhY2ggUmVzb3J0kgEFaG90ZWzgAQA!16s%2Fg%2F1tmxd0sd?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
    "location": "JA The Resort - JA Beach Hotel",
    "rating": "4.4",
    "number_of_reviews": "5,500",
    "venue_type": "Hotel",
    "address": "Jebel Ali Beach - Dubai",
    "image_link": "https://nyohqvbavyqynzaooxyj.supabase.co/storage/v1/object/public/assests/aks/4.jpg",
},
];
 export async function GET(request:any) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const venue = venues.find((v) => v.id === parseInt(id));
      return NextResponse.json(venue || { error: "Event not found" });
    }
  
    return NextResponse.json(venues);
  }
