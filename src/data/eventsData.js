import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const EVENTS_KEY =
  "abpsEvents";

const defaultEvents = [
  {
    id: "EVT-001",
    title: "Annual Sports Day",
    date: "2026-09-30",
    location: "Sports Ground",
    category: "Sports",
    description:
      "Annual sports activities and competitions.",
  },

  {
    id: "EVT-002",
    title: "Science Exhibition",
    date: "2026-10-04",
    location: "School Auditorium",
    category: "Academic",
    description:
      "Student science models and innovations.",
  },
];

export const getEvents = () =>
  readData(
    EVENTS_KEY,
    defaultEvents
  );

export const initializeEvents = () => {
  if (
    !localStorage.getItem(EVENTS_KEY)
  ) {
    writeData(
      EVENTS_KEY,
      defaultEvents
    );
  }
};

export const addEvent = (event) => {
  const events = getEvents();

  const newEvent = {
    id: createId("EVT"),
    ...event,
  };

  writeData(
    EVENTS_KEY,
    [newEvent, ...events]
  );

  return newEvent;
};

export const updateEvent = (
  id,
  changes
) =>
  updateItemById(
    EVENTS_KEY,
    id,
    changes
  );

export const deleteEvent = (id) =>
  removeItemById(
    EVENTS_KEY,
    id
  );