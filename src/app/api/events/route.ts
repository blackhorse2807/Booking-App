import { NextRequest, NextResponse } from "next/server";

const events = [
    {
      "id":1,
      "event_name": "AKS Dance Festival at Zero Gravity Dubai",
      "event_type": "Dance Festival",
      "description": "Experience two electrifying days of Bollywood beats, dance, and vibrant energy at Zero Gravity!",
      "additional_info": "<div className=\"space-y-3\">\n  <h3 className=\"font-semibold text-lg\">Day 1 Lineup</h3>\n  <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\">\n    <li>Ace</li>\n    <li>Beatz</li>\n    <li>Harry</li>\n    <li>Gautam</li>\n    <li>Rahul</li>\n    <li>Manoj</li>\n  </ul>\n</div>\n<div className=\"space-y-3\">\n  <h3 className=\"font-semibold text-lg\">Day 2 Lineup</h3>\n  <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\">\n    <li>13UXZ</li>\n    <li>Basspatch (Canada)</li>\n    <li>Buddha</li>\n    <li>KV5</li>\n    <li>Sartek (India)</li>\n    <li>Yogmusic</li>\n  </ul>\n</div>\n<div className=\"space-y-3\">\n  <h3 className=\"font-semibold text-lg\">Event Details</h3>\n  <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\">\n    <li>Dress Code: Casual. National Dress, Flip-flops, and Shorts are allowed.</li>\n    <li>Smoking is allowed.</li>\n    <li>Age limit: 21+ (Please carry your Emirates ID as proof).</li>\n    <li>Parking space is available.</li>\n    <li>No external food and beverages will be allowed into the venue.</li>\n    <li>Shisha will be served only on tables.</li>\n    <li>Standing event, table bookings available.</li>\n    <li>Tickets are priced at 125 AED per day until 30th November 2024.</li>\n    <li>Contact for table bookings: 0527799914 / 0567771153.</li>\n  </ul>\n</div>\n<div className=\"space-y-3\">\n  <h3 className=\"font-semibold text-lg\">Directions</h3>\n  <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\">\n    <li><strong>By car:</strong> Take Al Marsa St toward Gharbi St, then turn left onto Braih St. Later take King Salman Bin Abdulaziz Al Saud St and continue on Al Seyahi St to your destination.</li>\n    <li><strong>By public transportation:</strong> Take T1 Al Sufouh to the Mina Seyahi stop and take a short walk from there.</li>\n    <li><strong>By taxi:</strong> Taxis are easily available to reach the venue.</li>\n  </ul>\n</div>\n<div className=\"space-y-3\">\n  <h3 className=\"font-semibold text-lg\">Location</h3>\n  <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\">\n    <li>Zero Gravity Dubai - King Salman Bin Abdulaziz Al Saud Street - Dubai - United Arab Emirates.</li>   \n  </ul>\n</div>",
      "time_slot": "30 Nov, 2024 & 1 Dec, 2024",
      "location": "Zero Gravity Dubai",
      "address": "Zero Gravity Dubai - King Salman Bin Abdulaziz Al Saud Street, Dubai, UAE",
      "maps_link": "https://www.google.com/maps/place/Zero+Gravity+Dubai/@25.0890189,55.1348254,899m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f14b2cdab2381:0x65be5b0cfdf7dfa!8m2!3d25.0890189!4d55.1374003!16s%2Fg%2F1q5gm0cqg?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "past",
      "image_link": "/image/res1.jpeg"
    },
    {
      "id":2,
      "event_name": "Elements NYE 2025 by AKS",
      "event_type": "New Year’s Event",
      "description": "Step into 2025 at Soul Beach for Dubai’s Biggest Bollywood New Year’s Eve Event.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li><strong>Dress Code:</strong> Boho Chic</li> <li><strong>21+ only:</strong> Original ID required</li> <li>VVIP lounges & poolside cabanas</li> <li>Exclusive NYE staycation packages at JA The Resort</li> <li><strong>Tickets:</strong> <ul className=\"space-y-2 pl-4\"> <li>General: Phase 1: AED 129 (till 25th Dec), Phase 2: AED 150 (till 31st Dec, 9 PM), At Gate: AED 189</li> <li>VIP: Online: AED 195 (till 31st Dec, 9 PM), At Gate: AED 249</li> </ul> </li> <li><strong>Contact for VIP Bookings:</strong> 0527799914 / 0567771194 / 0567771153</li> <li><strong>Parking:</strong> Valet & ample parking available</li> <li>Club Management reserves the right to refuse admission</li> <li>No local/cultural dress allowed</li> <li>No re-entry</li> <li>Private fireworks display</li> <li>Bespoke VIP experiences</li> </ul> </div>",
      "time_slot": "31 Dec, 2024 & 1 Jan, 2025",
      "location": "Soul Beach, Jebel Ali",
      "address": "JA The Resort, Soul Beach, Jebel Ali, Dubai",
      "maps_link": "https://www.google.com/maps/place/Soul+Beach+Dubai/@24.9896903,55.0236826,900m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f1195503d3351:0xaa6db24e493a22b8!8m2!3d24.9896903!4d55.0262575!16s%2Fg%2F11sm9wtxsm?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "upcoming",
      "image_link": "/image/res2.jpeg"
    },
    {
      "id":3,
      "event_name": "Desi Night with Buddha & Harry",
      "event_type": "Nightlife Event",
      "description": "Experience an electrifying desi night with top Bollywood DJs Buddha & Harry.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Smart Casual</li> <li>Exclusive VIP packages available</li> </ul> </div>",
      "time_slot": "6 Dec, 2024 (9 PM - 3 AM GST)",
      "location": "ONE1, V Hotel",
      "address": "V Hotel, Dubai",
      "maps_link": "https://www.google.com/maps/place/One1+Dubai/@25.1842241,55.2518501,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f69ab08620f67:0x2e34975541fe1796!8m2!3d25.1842241!4d55.254425!16s%2Fg%2F11tnvwl8kv?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "past",
      "image_link": "/image/res3.jpeg"
    },
    {
      "id":4,
      "event_name": "Zodiac Brunch with Yogmusic & Beatz",
      "event_type": "Brunch Event",
      "description": "Enjoy a zodiac-themed brunch with live music by Yogmusic & Beatz.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Casual</li> <li>Unlimited brunch packages available</li> </ul> </div>",
      "time_slot": "7 Dec, 2024 (1 PM - 6 PM GST)",
      "location": "ONE1, V Hotel",
      "address": "V Hotel, Dubai",
      "maps_link": "https://www.google.com/maps/place/One1+Dubai/@25.1842241,55.2518501,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f69ab08620f67:0x2e34975541fe1796!8m2!3d25.1842241!4d55.254425!16s%2Fg%2F11tnvwl8kv?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "past",
      "image_link": "/image/res4.jpg"
    },
    {
      "id":5,
      "event_name": "Desi Night with Rhea, Ace & Yogmusic",
      "event_type": "Nightlife Event",
      "description": "Groove to the beats of Rhea, Ace, and Yogmusic for a Bollywood Desi Night.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Smart Casual</li> <li>Exclusive VIP packages available</li> </ul> </div>",
      "time_slot": "13 Dec, 2024 (9 PM - 3 AM GST)",
      "location": "Atelier M, Pier 7",
      "address": "Pier 7, Dubai Marina",
      "maps_link": "https://www.google.com/maps/place/Atelier+M/@25.0762468,55.1363481,899m/data=!3m3!1e3!4b1!5s0x3e5f6cab2893a281:0xa193d005d6c237e4!4m6!3m5!1s0x3e5f6caae908e705:0xba86396d7a4d84e9!8m2!3d25.0762468!4d55.138923!16s%2Fg%2F11b7tgygys?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "past",
      "image_link": "/image/res5.jpeg"
    },
    {
      "id":6,
      "event_name": "Zodiac Brunch with Ktonikk & Yogmusic",
      "event_type": "Brunch Event",
      "description": "Enjoy a zodiac-themed brunch with live music by Ktonikk & Yogmusic.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Casual</li> <li>Unlimited brunch packages available</li> </ul> </div>",
      "time_slot": "14 Dec, 2024 (1 PM - 6 PM GST)",
      "location": "ONE1, V Hotel",
      "address": "V Hotel, Dubai",
      "maps_link": "https://www.google.com/maps/place/One1+Dubai/@25.1842241,55.2518501,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f69ab08620f67:0x2e34975541fe1796!8m2!3d25.1842241!4d55.254425!16s%2Fg%2F11tnvwl8kv?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "past",
      "image_link": "/image/res6.jpeg"
    },
    {
      "id":7,
      "event_name": "Desi Night with Rihya, Beatz & Yogmusic",
      "event_type": "Nightlife Event",
      "description": "Party to Bollywood beats with Rihya, Beatz, and Yogmusic.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Smart Casual</li> <li>Exclusive VIP packages available</li> </ul> </div>",
      "time_slot": "20 Dec, 2024 (9 PM - 3 AM GST)",
      "location": "Atelier M, Pier 7",
      "address": "Pier 7, Dubai Marina",
      "maps_link": "https://www.google.com/maps/place/Atelier+M/@25.0762468,55.1363481,899m/data=!3m3!1e3!4b1!5s0x3e5f6cab2893a281:0xa193d005d6c237e4!4m6!3m5!1s0x3e5f6caae908e705:0xba86396d7a4d84e9!8m2!3d25.0762468!4d55.138923!16s%2Fg%2F11b7tgygys?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "upcoming",
      "image_link": "/image/res7.jpeg"
    },
    {
      "id":8,
      "event_name": "Zodiac Brunch with Buddha & Ace",
      "event_type": "Brunch Event",
      "description": "Enjoy a zodiac-themed brunch with live music by Buddha & Ace.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Casual</li> <li>Unlimited brunch packages available</li> </ul> </div>",
      "time_slot": "21 Dec, 2024 (1 PM - 6 PM GST)",
      "location": "ONE1, V Hotel",
      "address": "V Hotel, Dubai",
      "maps_link": "https://www.google.com/maps/place/One1+Dubai/@25.1842241,55.2518501,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f69ab08620f67:0x2e34975541fe1796!8m2!3d25.1842241!4d55.254425!16s%2Fg%2F11tnvwl8kv?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "upcoming",
      "image_link": "/image/res8.jpeg"
    },
    {
      "id":9,
      "event_name": "Christmas Special with Angel, Ace & Yogmusic",
      "event_type": "Nightlife Event",
      "description": "Celebrate Christmas with live performances by Angel, Ace, and Yogmusic.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Smart Casual</li> <li>Exclusive VIP packages available</li> </ul> </div>",
      "time_slot": "27 Dec, 2024 (9 PM - 3 AM GST)",
      "location": "Atelier M, Pier 7",
      "address": "Pier 7, Dubai Marina",
      "maps_link": "https://www.google.com/maps/place/Atelier+M/@25.0762468,55.1363481,899m/data=!3m3!1e3!4b1!5s0x3e5f6cab2893a281:0xa193d005d6c237e4!4m6!3m5!1s0x3e5f6caae908e705:0xba86396d7a4d84e9!8m2!3d25.0762468!4d55.138923!16s%2Fg%2F11b7tgygys?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "upcoming",
      "image_link": "/image/res9.jpeg"
    },
    {
      "id":10,
      "event_name": "Zodiac Brunch with Ktonikk & Buddha",
      "event_type": "Brunch Event",
      "description": "Enjoy a zodiac-themed brunch with live music by Ktonikk & Buddha.",
      "additional_info": "<div className=\"space-y-3\"> <h3 className=\"font-semibold text-lg\">Event Details</h3> <ul className=\"space-y-2 text-sm text-muted-foreground list-disc pl-4\"> <li>Age limit: 21+ (ID required)</li> <li>Dress Code: Casual</li> <li>Unlimited brunch packages available</li> </ul> </div>",
      "time_slot": "28 Dec, 2024 (1 PM - 6 PM GST)",
      "location": "ONE1, V Hotel",
      "address": "V Hotel, Dubai",
      "maps_link": "https://www.google.com/maps/place/One1+Dubai/@25.1842241,55.2518501,898m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f69ab08620f67:0x2e34975541fe1796!8m2!3d25.1842241!4d55.254425!16s%2Fg%2F11tnvwl8kv?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D",
      "status": "upcoming",
      "image_link": "/image/res10.avif"
    },
  ];
  export async function GET(request :NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const event = events.find((e) => e.id === parseInt(id));
      return NextResponse.json(event || { error: "Event not found" });
    }
  
    return NextResponse.json(events);
  }