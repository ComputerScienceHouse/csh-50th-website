import { ScheduleEvent } from "./ScheduleEvent";

/**
 * Holds the data for events shown on the Schedule Page
 */
export const events: ScheduleEvent[] = [ // PLACEHOLDERS: Update all event times, descriptions, and locations as they are finalized
  {
    id: 1,
    title: "Check-in + RIT Archives Storybooth",
    description: "Pick up your badge, swag bag, and event materials.",
    date: "Friday, April 10, 2026",
    time: "9:00 AM - 8:00 PM",
    location: "CSH Floor, DSP", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "all attendees",
    dressCode: "Casual",
    type: "social",
  },
  {
    id: 2,
    title: "Campus & Floor Tours",
    description: "See how CSH has evolved over the years with guided tours of the floor.",
    date: "Friday",
    time: "9:00 AM - 8:00 PM",
    location: "CSH Floor, DSP", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "N/A",
    dressCode: "N/A",
    type: "activity",
  },
  {
    id: 3,
    title: "Photo Hunt Starts",
    description: "",
    date: "Friday, April 10, 2026",
    time: "9:00 AM - 10:00AM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all alumni",
    dressCode: "Casual",
    type: "activity",
  },
  {
    id: 4,
    title: "Lunch",
    description: "",
    date: "Friday, April 10, 2026",
    time: "12:00 PM - 2:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all attendees",
    dressCode: "Casual",
    type: "food",
  },
  {
    id: 5,
    title: "Open Sauce Mixer",
    description: "",
    date: "Friday, April 10, 2026",
    time: "5:30 PM - 7:30 PM",
    location: "CSH Floor, DSP", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all attendees",
    dressCode: "Casual",
    type: "activity",
  },
  {
    id: 6,
    title: "Alumni Happy Hour",
    description: "Informal eventing gathering for alumni to catch up over drinks.",
    date: "Friday, April 10, 2026",
    time: "8:00 PM - 11:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all attendees",
    dressCode: "Casual",
    type: "social",

  },
  {
    id: 7,
    title: "Check In + RIT Archives Storybooth",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all attendees",
    dressCode: "Casual",
    type: "social",
  },
  {
    id: 8,
    title: "Campus & Floor Tours",
    description: "Explore RIT campus and see how it has changed since your time here. Visit new buildings, facilities, and learn about the university's growth.",
    date: "Saturday, April 11, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Meet at SHED 1300", // PLACEHOLDER: Confirm meeting point
    address: "Rochester Institute of Technology",
    capacity: "Multiple groups",
    dressCode: "Casual (comfortable walking shoes)",
    type: "activity",
  },
  {
    id: 9,
    title: "University Advancement Donor Breakfast",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "10:00 AM - 12:30 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "200 seats",
    dressCode: "TBD",
    type: "food",
  },
  {
    id: 10,
    title: "Dismiss for Dinner",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "1:00 PM - 3:30 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "",
    dressCode: "",
    type: "social",
  },
  {
    id: 11,
    title: "Bus Runs To The Wintergarden",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "3:30 PM - 5:00 PM",
    location: "Outside SHED", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "",
    dressCode: "",
    type: "social",
  },
  {
    id: 12,
    title: "CSH 50th Dinner",
    description: "The highlight of the weekend! Join us for an elegant formal dinner celebrating 50 years of CSH. Enjoy a delicious meal, keynote speeches from notable alumni, awards ceremony honoring CSH's legacy, and plenty of time to reconnect with friends.",
    date: "Saturday, April 11, 2026",
    time: "5:00 PM - 10:00 PM",
    location: "The Wintergarden", // PLACEHOLDER: Replace with actual venue name
    address: "TBD, Rochester, NY",
    capacity: "500 guests",      
    dressCode: "Formal",
    type: "main",
  },
  {
    id: 13,
    title: "Photo Hunt Ends",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "5:00 PM - 6:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD, Rochester, NY",
    capacity: "",
    dressCode: "",
    type: "activity",
  },
  {
    id: 14,
    title: "Showcase of Photo Hunt (Not Judged)",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "The Wintergarden", // PLACEHOLDER: Confirm location
    address: "TBD, Rochester, NY",
    capacity: "",
    dressCode: "",
    type: "activity",
  },
  {
    id: 15,
    title: "Bus Runs Back To Campus",
    description: "",
    date: "Saturday, April 11, 2026",
    time: "10:00 PM - 11:00 PM",
    location: "The Wintergarden", // PLACEHOLDER: Confirm location
    address: "TBD, Rochester, NY",
    capacity: "",
    dressCode: "",
    type: "activity",
  },
  {
    id: 16,
    title: "Brunch",
    description: "Before you head home, join us for a farewell brunch. Last chance to exchange contact info, take group photos, and say your goodbyes.",
    date: "Sunday, April 12, 2026",
    time: "11:00 AM - 1:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD",
    capacity: "Open to all attendees",
    dressCode: "Casual",
    type: "food",
  }
]