import {
  readData,
  writeData,
  createId,
} from "./storage";

export const GALLERY_KEY = "abpsWebsiteGallery";

const defaultGallery = [
  {
    id: "GAL-001",
    title: "Annual Sports Day",
    category: "Sports",
    image: "",
    description: "Students participating in Annual Sports Day.",
    status: "Published",
  },
  {
    id: "GAL-002",
    title: "Cultural Celebration",
    category: "Cultural",
    image: "",
    description: "A memorable cultural celebration at our school.",
    status: "Published",
  },
  {
    id: "GAL-003",
    title: "Science Exhibition",
    category: "Academic",
    image: "",
    description: "Students presenting innovative science projects.",
    status: "Published",
  },
];

export const initializeGallery = () => {
  if (!localStorage.getItem(GALLERY_KEY)) {
    writeData(GALLERY_KEY, defaultGallery);
  }

  return getGallery();
};

export const getGallery = () =>
  readData(GALLERY_KEY, defaultGallery);

export const addGalleryItem = (data) => {
  const items = getGallery();

  const item = {
    id: createId("GAL"),
    ...data,
    createdAt: new Date().toISOString(),
  };

  writeData(GALLERY_KEY, [item, ...items]);

  return item;
};

export const updateGalleryItem = (id, changes) => {
  const items = getGallery();

  const updated = items.map((item) =>
    item.id === id
      ? {
          ...item,
          ...changes,
          updatedAt: new Date().toISOString(),
        }
      : item
  );

  writeData(GALLERY_KEY, updated);

  return updated;
};

export const deleteGalleryItem = (id) => {
  const updated = getGallery().filter(
    (item) => item.id !== id
  );

  writeData(GALLERY_KEY, updated);

  return updated;
};