import {
  readData,
  writeData,
  createId,
} from "./storage";

export const NEWS_KEY = "abpsWebsiteNews";

const defaultNews = [
  {
    id: "NEWS-001",
    title: "37th Regional Sports Competition Begins",
    category: "Sports",
    date: "2026-08-21",
    shortDescription:
      "Students participated enthusiastically in the regional sports competition.",
    fullDescription:
      "AB Public School students participated in the regional sports competition and represented the school across multiple sporting events.",
    image: "",
    status: "Published",
  },

  {
    id: "NEWS-002",
    title: "Independence Day Celebration",
    category: "Event",
    date: "2026-08-15",
    shortDescription:
      "Students celebrated Independence Day with cultural performances.",
    fullDescription:
      "The school celebrated Independence Day with patriotic performances, speeches and student activities.",
    image: "",
    status: "Published",
  },

  {
    id: "NEWS-003",
    title: "School Activities",
    category: "School",
    date: "2026-08-10",
    shortDescription:
      "Students participated in creative and learning activities.",
    fullDescription:
      "A range of classroom and co-curricular activities were organised to encourage creativity and teamwork.",
    image: "",
    status: "Published",
  },
];

export const initializeNews = () => {
  if (!localStorage.getItem(NEWS_KEY)) {
    writeData(NEWS_KEY, defaultNews);
  }

  return getNews();
};

export const getNews = () =>
  readData(NEWS_KEY, defaultNews);

export const addNews = (data) => {
  const items = getNews();

  const item = {
    id: createId("NEWS"),
    ...data,
    createdAt: new Date().toISOString(),
  };

  writeData(NEWS_KEY, [item, ...items]);

  return item;
};

export const updateNews = (id, changes) => {
  const items = getNews();

  const updated = items.map((item) =>
    item.id === id
      ? {
          ...item,
          ...changes,
          updatedAt: new Date().toISOString(),
        }
      : item
  );

  writeData(NEWS_KEY, updated);

  return updated;
};

export const deleteNews = (id) => {
  const updated = getNews().filter(
    (item) => item.id !== id
  );

  writeData(NEWS_KEY, updated);

  return updated;
};

export const getPublishedNews = () =>
  getNews().filter(
    (item) => item.status === "Published"
  );