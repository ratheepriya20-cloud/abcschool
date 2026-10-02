import {
  FaFutbol,
  FaMusic,
  FaTrophy,
  FaBusAlt,
  FaImages,
  FaBuilding,
} from "react-icons/fa";

export const campusLifeItems = [
  {
    id: "sports",
    title: "Sports",
    description:
      "Fitness, teamwork and competitive opportunities for every student.",
    icon: FaFutbol,
    path: "/sports",
  },

  {
    id: "cultural",
    title: "Cultural Activities",
    description:
      "Dance, music, drama and creative experiences that build confidence.",
    icon: FaMusic,
    path: "/cultural-activities",
  },

  {
    id: "competitions",
    title: "Competitions",
    description:
      "Academic, creative and inter-school competitions that encourage excellence.",
    icon: FaTrophy,
    path: "/competitions",
  },

  {
    id: "trips",
    title: "Educational Trips",
    description:
      "Meaningful learning experiences beyond the classroom.",
    icon: FaBusAlt,
    path: "/educational-trips",
  },

  {
    id: "gallery",
    title: "Gallery",
    description:
      "Explore memorable moments from school life, events and celebrations.",
    icon: FaImages,
    path: "/gallery",
  },

  {
    id: "facilities",
    title: "Facilities",
    description:
      "Modern learning spaces designed for safe and effective education.",
    icon: FaBuilding,
    path: "/facilities",
  },
];