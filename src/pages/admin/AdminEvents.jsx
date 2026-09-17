import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./AdminEvents.css";

const STORAGE_KEY = "abpsAdminEvents";

const defaultEvents = [
  {
    id: 1,
    title: "Annual Sports Day",
    date: "20 Sep 2026",
    time: "8:30 AM",
    location: "School Sports Ground",
    description:
      "Students will participate in various athletic and team sports activities during the Annual Sports Day.",
  },
  {
    id: 2,
    title: "Science Exhibition",
    date: "24 Sep 2026",
    time: "10:00 AM",
    location: "School Auditorium",
    description:
      "Students will present innovative science models and projects during the annual Science Exhibition.",
  },
  {
    id: 3,
    title: "Cultural Fest",
    date: "30 Sep 2026",
    time: "11:00 AM",
    location: "Main Auditorium",
    description:
      "The Cultural Fest will showcase music, dance, drama and creative performances by our students.",
  },
];

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
    }
  }, []);

  const saveEvents = (data) => {
    setEvents(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("abpsDataUpdated"));
  };

  const openAdd = () => {
    setEditId(null);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editId) {
      saveEvents(
        events.map((event) =>
          event.id === editId ? { ...event, ...formData } : event
        )
      );
    } else {
      saveEvents([{ id: Date.now(), ...formData }, ...events]);
    }

    setShowForm(false);
  };

  const deleteEvent = (id) => {
    if (!window.confirm("Delete this event?")) return;

    saveEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="adminEventsPage">
      <div className="adminEventsHeader">
        <div>
          <span className="adminEventsEyebrow">
            <FaCalendarAlt /> EVENT MANAGEMENT
          </span>
          <h1>School Events</h1>
          <p>Create and manage upcoming school events.</p>
        </div>

        <button className="adminEventsAdd" onClick={openAdd}>
          <FaPlus /> Add Event
        </button>
      </div>

      <div className="adminEventsGrid">
        {events.map((event) => (
          <div className="adminEventCard" key={event.id}>
            <div className="adminEventIcon">
              <FaCalendarAlt />
            </div>

            <h2>{event.title}</h2>

            <div className="adminEventInfo">
              <span>
                <FaCalendarAlt /> {event.date}
              </span>
              <span>
                <FaClock /> {event.time}
              </span>
              <span>
                <FaMapMarkerAlt /> {event.location}
              </span>
            </div>

            <p>{event.description}</p>

            <div className="adminEventActions">
              <button onClick={() => setSelected(event)}>
                <FaEye /> View
              </button>

              <button onClick={() => openEdit(event)}>
                <FaEdit /> Edit
              </button>

              <button
                className="danger"
                onClick={() => deleteEvent(event.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="adminEventsOverlay">
          <div className="adminEventsModal">
            <button
              className="adminEventsClose"
              onClick={() => setShowForm(false)}
            >
              <FaTimes />
            </button>

            <h2>{editId ? "Edit Event" : "Add Event"}</h2>
            <p>Enter complete event information.</p>

            <form onSubmit={handleSubmit}>
              <label>
                Event Title
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Annual Sports Day"
                />
              </label>

              <div className="adminEventsTwo">
                <label>
                  Date
                  <input
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="20 Sep 2026"
                  />
                </label>

                <label>
                  Time
                  <input
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    placeholder="8:30 AM"
                  />
                </label>
              </div>

              <label>
                Location
                <input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="School Auditorium"
                />
              </label>

              <label>
                Description
                <textarea
                  rows="5"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Event description..."
                />
              </label>

              <button className="adminEventsSubmit" type="submit">
                {editId ? "Update Event" : "Add Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className="adminEventsOverlay">
          <div className="adminEventsView">
            <button
              className="adminEventsClose"
              onClick={() => setSelected(null)}
            >
              <FaTimes />
            </button>

            <div className="adminEventIcon">
              <FaCalendarAlt />
            </div>

            <h2>{selected.title}</h2>

            <div className="adminEventInfo">
              <span>
                <FaCalendarAlt /> {selected.date}
              </span>
              <span>
                <FaClock /> {selected.time}
              </span>
              <span>
                <FaMapMarkerAlt /> {selected.location}
              </span>
            </div>

            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;