import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import { FaStar, FaCheckCircle, FaParking, FaWater, FaLightbulb } from "react-icons/fa";
import "./GroundDetails.css";


const futsals = [
  {
    id: "futsal-arena-boudha",
    name: "Futsal Arena Boudha",
    location: "Kathmandu",
    rating: 4.8,
    price: 800,
    facilities: ["Artificial Turf", "Floodlights", "Seating", "Refreshments"],
    image: "/boudha.webp",
    description:
      "Futsal Arena Boudha is a top-class indoor futsal facility located in the heart of Kathmandu. Perfect for casual matches or tournaments with friends and teams.",
  },
  {
    id: "dreamers-futsal",
    name: "Dreamers Futsal",
    location: "Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Artificial Turf", "Parking", "Canteen"],
    image: "/dreamers.jpeg",
    description:
      "Dreamers Futsal offers a modern artificial turf field with full amenities including parking and a canteen. Ideal for teams and weekend matches.",
  },
  {
    id: "bhaktapur-futsal",
    name: "Bhaktapur Futsal",
    location: "Sallaghari, Bhaktapur",
    rating: 4.7,
    price: 750,
    facilities: ["Turf Surface", "Floodlights", "Canteen"],
    image: "/bhaktapur.webp",
    description: "Bhaktapur Futsal offers a well-maintained turf surface with excellent floodlights, perfect for evening matches. Enjoy refreshments at the on-site canteen and play in a friendly, community-driven environment."
  },
  {
    id: "field-futsal",
    name: "Field Futsal",
    location: "Sanepa Road, Lalitpur",
    rating: 4.6,
    price: 650,
    facilities: ["Indoor", "Artificial Turf", "Floodlights", "Parking"],
    image: "/field .webp",
    description: "Field Futsal provides a comfortable indoor arena with high-quality artificial turf. Equipped with floodlights and ample parking, it is ideal for both casual and competitive games."
  },
  {
    id: "sankhamul-futsal",
    name: "Sankhamul Futsal",
    location: "Kathmandu",
    rating: 4.4,
    price: 700,
    facilities: ["Outdoor", "Floodlights", "Canteen"],
    image: "/sankhamul.webp",
    description: "Sankhamul Futsal is an outdoor ground offering a lively atmosphere with top-notch floodlights. The on-site canteen keeps players refreshed between matches."
  },
  {
    id: "gokarna-futsal",
    name: "Gokarna Futsal",
    location: "Kathmandu",
    rating: 4.7,
    price: 850,
    facilities: ["Indoor", "Premium Turf", "Locker Rooms"],
    image: "/gokarna.webp",
    description: "Gokarna Futsal features a premium indoor turf and modern locker rooms. Perfect for training sessions, professional games, and tournaments."
  },
  {
    id: "kumari-futsal",
    name: "Kumari Futsal and Snooker",
    location: "Paknajol, Kathmandu",
    rating: 4.6,
    price: 750,
    facilities: ["Indoor/Outdoor", "Artificial Turf", "Recreation Center"],
    image: "/kumari.webp",
    description: "Kumari Futsal and Snooker combines indoor and outdoor futsal facilities with a recreation center. Ideal for casual matches, practice, and leisure activities."
  },
  {
    id: "lalitpur-5a-side",
    name: "Lalitpur 5A Side",
    location: "Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Indoor 5-a-side", "Artificial Turf", "Floodlights"],
    image: "/lalitpur.webp",
    description: "Lalitpur 5A Side offers a dedicated 5-a-side indoor arena with artificial turf and floodlights. Perfect for fast-paced small team matches."
  },
  {
    id: "imadol-futsal",
    name: "Imadol Futsal",
    location: "Imadol, Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Spacious Turf Field", "Lighting", "Team Play"],
    image: "/Imadol.webp",
    description: "Imadol Futsal features a spacious turf field with proper lighting, ideal for team play and weekend tournaments."
  },
  {
    id: "yala-futsal",
    name: "Yala Futsal & Recreation Center",
    location: "Lalitpur",
    rating: 4.6,
    price: 750,
    facilities: ["Soft-Carpet Surface", "Washrooms", "Dressing Rooms"],
    image: "/yala.webp",
    description: "Yala Futsal & Recreation Center offers a soft-carpet futsal surface, clean washrooms, and dressing rooms. A comfortable and family-friendly environment."
  },
  {
    id: "royal-nepal-7a",
    name: "Royal Nepal Futsal 7A Side",
    location: "Bhaktapur",
    rating: 4.7,
    price: 800,
    facilities: ["7-a-side Turf", "Floodlights", "League Matches"],
    image: "/royal.jpg",
    description: "Royal Nepal Futsal 7A Side specializes in competitive 7-a-side matches with well-maintained turf and excellent floodlights. Ideal for league games."
  },
  {
    id: "imperial-rulz-futsal",
    name: "Imperial Rulz Futsal",
    location: "Madhyapur Thimi, Bhaktapur",
    rating: 4.4,
    price: 700,
    facilities: ["Standard Pitch", "Artificial Turf"],
    image: "/imperial.webp",
    description: "Imperial Rulz Futsal provides a standard artificial turf pitch suitable for casual and practice matches in a clean environment."
  },
  {
    id: "balkot-boys-futsal",
    name: "Balkot Boys Futsal",
    location: "Balkot, Bhaktapur",
    rating: 4.3,
    price: 700,
    facilities: ["Turf", "Floodlights"],
    image: "/balkot.webp",
    description: "Balkot Boys Futsal offers a friendly turf ground with floodlights, perfect for evening matches with friends."
  },
  {
    id: "shantinagar-futsal",
    name: "Shantinagar Futsal",
    location: "Shantinagar, Kathmandu",
    rating: 4.5,
    price: 700,
    facilities: ["5-a-side Pitch", "Lighting", "Open Recreational Venue"],
    image: "/shantinagar.webp",
    description: "Shantinagar Futsal features a 5-a-side pitch with proper lighting in an open recreational area, ideal for casual play."
  },
  {
    id: "buddhanagar-futsal",
    name: "Buddhanagar Futsal",
    location: "Buddhanagar, Kathmandu",
    rating: 4.5,
    price: 750,
    facilities: ["Artificial Turf", "Floodlights", "Casual Play Area"],
    image: "/buddhanagar.webp",
    description: "Buddhanagar Futsal provides an artificial turf ground with floodlights and a casual play area, great for friendly matches."
  }
];

const facilityIcons = {
  "Artificial Turf": <FaCheckCircle />,
  Floodlights: <FaLightbulb />,
  Seating: <FaCheckCircle />,
  Refreshments: <FaWater />,
  Parking: <FaParking />,
  Canteen: <FaCheckCircle />,
  "Indoor": <FaCheckCircle />,
  "Outdoor": <FaCheckCircle />,
};

const GroundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const ground = futsals.find((f) => f.id === id);

  if (!ground) {
    return (
      <div className="ground-details not-found">
        <h2>Ground Not Found</h2>
        <button className="btn-secondary" onClick={() => navigate("/grounds")}>
          Back to Grounds
        </button>
      </div>
    );
  }

  const handleBooking = () => {
    navigate("/booking", {
      state: { groundId: ground.id, groundName: ground.name, price: ground.price },
    });
  };

  return (
    <div className="ground-details">
      {/* Hero Section */}
      <div
        className="ground-hero"
        style={{ backgroundImage: `url(${ground.image})` }}
      >
        <div className="ground-hero-overlay">
          <h1>{ground.name}</h1>
          <p>{ground.location}</p>
          <div className="hero-rating">
            <FaStar className="star-icon" />
            <span>{ground.rating}</span>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="ground-overview">
        <div className="overview-left">
          <h2>Price: NPR {ground.price}/hr</h2>
          <button className="btn-primary btn-book" onClick={handleBooking}>
            Book Now
          </button>
        </div>
        <div className="overview-right">
          <h3>Facilities</h3>
          <ul className="facilities-list">
            {ground.facilities.map((fac, i) => (
              <li key={i}>
                {facilityIcons[fac] || <FaCheckCircle />}
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description Section */}
      <section className="ground-description">
        <h2>About {ground.name}</h2>
        <p>{ground.description}</p>
      </section>

      {/* Extra Features */}
      <section className="ground-extra">
        <h2>Why Choose This Ground?</h2>
        <div className="extra-cards">
          <div className="extra-card">
            <FaCheckCircle className="extra-icon" />
            <p>Well-maintained playing surface</p>
          </div>
          <div className="extra-card">
            <FaCheckCircle className="extra-icon" />
            <p>Safe and clean environment</p>
          </div>
          <div className="extra-card">
            <FaCheckCircle className="extra-icon" />
            <p>Easy online booking</p>
          </div>
          <div className="extra-card">
            <FaCheckCircle className="extra-icon" />
            <p>Accessible location</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroundDetails;