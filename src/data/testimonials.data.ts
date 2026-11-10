export interface TestimonialItem {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  stayDate: string;
  roomType: string;
  comment: string;
  isSample: boolean;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-1",
    guestName: "Rohit Deshmukh",
    location: "Borivali, Mumbai",
    rating: 5,
    stayDate: "Weekend Staycation · Oct 2026",
    roomType: "Deluxe Double Room",
    comment: "A tranquil oasis just a short drive from Mumbai. The swimming pool was sparkling clean, surrounded by lush palms. The tandoori starters at the restaurant were delicious, and the staff at the reception desk were exceptionally welcoming. Perfect weekend getaway with family!",
    isSample: true
  },
  {
    id: "review-2",
    guestName: "Pooja & Sameer Verma",
    location: "Thane, Maharashtra",
    rating: 5,
    stayDate: "Wedding Anniversary · Sep 2026",
    roomType: "Deluxe Double Room",
    comment: "We loved our stay at Apexify Resort! The evening ambiance around the pool with fairy lights was magical. The room was spacious, comfortable, and the air conditioning was ice-cold. Highly recommend for couples seeking peace away from city traffic.",
    isSample: true
  },
  {
    id: "review-3",
    guestName: "Anil Karkera",
    location: "Andheri East, Mumbai",
    rating: 4,
    stayDate: "Corporate Day Outing · Aug 2026",
    roomType: "Group Event & Banquet",
    comment: "Organized a team offsite on the Banquet Lawn followed by a pool party. The banquet management team handled our 60-member group with utmost ease. Delicious lunch buffet and courteous service throughout.",
    isSample: true
  }
];

