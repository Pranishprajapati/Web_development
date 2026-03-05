import React from "react";
import { Link } from "react-router-dom";
import "./Grounds.css";

const grounds = [
  {
    id: "futsal-arena-boudha",
    name: "Futsal Arena Boudha",
    location: "Kathmandu",
    rating: 4.8,
    price: 800,
    facilities: ["Artificial Turf", "Floodlights", "Seating", "Refreshments"],
    image: "/boudha.webp",
  },
  {
    id: "dreamers-futsal",
    name: "Dreamers Futsal",
    location: "Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Artificial Turf", "Parking", "Canteen"],
    image: "/dreamers.jpeg",
  },
  {
    id: "bhaktapur-futsal",
    name: "Bhaktapur Futsal",
    location: "Sallaghari, Bhaktapur",
    rating: 4.7,
    price: 750,
    facilities: ["Turf Surface", "Floodlights", "Canteen"],
    image: "/bhaktapur.webp",
  },
  {
    id: "field-futsal",
    name: "Field Futsal",
    location: "Sanepa Road, Lalitpur",
    rating: 4.6,
    price: 650,
    facilities: ["Indoor", "Artificial Turf", "Floodlights", "Parking"],
    image: "/field .webp",
  },
  {
    id: "sankhamul-futsal",
    name: "Sankhamul Futsal",
    location: "Kathmandu",
    rating: 4.4,
    price: 700,
    facilities: ["Outdoor", "Floodlights", "Canteen"],
    image: "/sankhamul.webp",
  },
  {
    id: "gokarna-futsal",
    name: "Gokarna Futsal",
    location: "Kathmandu",
    rating: 4.7,
    price: 850,
    facilities: ["Indoor", "Premium Turf", "Locker Rooms"],
    image: "/gokarna.webp",
  },
  {
    id: "kumari-futsal",
    name: "Kumari Futsal and Snooker",
    location: "Paknajol, Kathmandu",
    rating: 4.6,
    price: 750,
    facilities: ["Indoor/Outdoor", "Artificial Turf", "Recreation Center"],
    image: "/kumari.webp",
  },
  {
    id: "lalitpur-5a-side",
    name: "Lalitpur 5A Side",
    location: "Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Indoor 5-a-side", "Artificial Turf", "Floodlights"],
    image: "/lalitpur.webp",
  },
  {
    id: "imadol-futsal",
    name: "Imadol Futsal",
    location: "Imadol, Lalitpur",
    rating: 4.5,
    price: 700,
    facilities: ["Spacious Turf Field", "Lighting", "Team Play"],
    image: "/five.webp",
  },
  {
    id: "yala-futsal",
    name: "Yala Futsal & Recreation Center",
    location: "Lalitpur",
    rating: 4.6,
    price: 750,
    facilities: ["Soft-Carpet Surface", "Washrooms", "Dressing Rooms"],
    image: "/yala.webp",
  },
  {
    id: "royal-nepal-7a",
    name: "Royal Nepal Futsal 7A Side",
    location: "Bhaktapur",
    rating: 4.7,
    price: 800,
    facilities: ["7-a-side Turf", "Floodlights", "League Matches"],
    image: "/royal.jpg",
  },
  {
    id: "imperial-rulz-futsal",
    name: "Imperial Rulz Futsal",
    location: "Madhyapur Thimi, Bhaktapur",
    rating: 4.4,
    price: 700,
    facilities: ["Standard Pitch", "Artificial Turf"],
    image: "/imperial.webp",
  },
  {
    id: "balkot-boys-futsal",
    name: "Balkot Boys Futsal",
    location: "Balkot, Bhaktapur",
    rating: 4.3,
    price: 700,
    facilities: ["Turf", "Floodlights"],
    image: "/balkot.webp",
  },
  {
    id: "shantinagar-futsal",
    name: "Shantinagar Futsal",
    location: "Shantinagar, Kathmandu",
    rating: 4.5,
    price: 700,
    facilities: ["5-a-side Pitch", "Lighting", "Open Recreational Venue"],
    image: "/shantinagar.webp",
  },
  {
    id: "buddhanagar-futsal",
    name: "Buddhanagar Futsal",
    location: "Buddhanagar, Kathmandu",
    rating: 4.5,
    price: 750,
    facilities: ["Artificial Turf", "Floodlights", "Casual Play Area"],
    image: "/buddhanagar.webp",
  },
];

const Grounds = () => {
  return (
    <section className="grounds">
      <h2>Find Your Ground</h2>
      <span className="section-tag">AVAILABLE GROUNDS</span>

      <div className="grounds-cards">
        {grounds.map((ground) => (
          <div key={ground.id} className="ground-card">
            
            {/* Image clickable */}
            <Link to={`/grounds/${ground.id}`}>
              <img src={ground.image} alt={ground.name} />
            </Link>

            <div className="card-info">
              {/* Name clickable */}
              <Link to={`/grounds/${ground.id}`} className="ground-link">
                <h3>{ground.name}</h3>
              </Link>

              <p>{ground.location}</p>
              <span>⭐ {ground.rating}</span>
              <p>Price: NPR {ground.price}/hr</p>
              <p>Facilities: {ground.facilities.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grounds;
