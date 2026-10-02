import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import {
  EVENTS_KEY,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../../data/eventsData";

const EventsAdmin = () => {

  const [events] =
    useSchoolData(
      EVENTS_KEY,
      getEvents
    );

  return (
    <AdminCrudPage
      title="Events"
      label="COMMUNICATION"
      description="Create and manage school events."
      data={events}
      searchFields={[
        "title",
        "location",
        "category",
      ]}
      fields={[
        {
          name: "title",
          label: "Event Title",
          required: true,
        },
        {
          name: "date",
          label: "Event Date",
          type: "date",
          required: true,
        },
        {
          name: "location",
          label: "Location",
        },
        {
          name: "category",
          label: "Category",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          full: true,
          table: false,
        },
      ]}
      onAdd={addEvent}
      onUpdate={updateEvent}
      onDelete={deleteEvent}
    />
  );
};

export default EventsAdmin;