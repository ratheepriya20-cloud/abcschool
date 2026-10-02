import {
  readData,
  writeData,
  createId,
  updateItemById,
  removeItemById,
} from "./storage";

export const PARENTS_KEY = "abpsParents";

const defaultParents = [
  {
    id: "PAR-1001",
    name: "Rahul Sharma",
    relation: "Father",
    studentIds: ["STU-1001"],
    mobile: "9876500001",
    email: "rahul.parent@gmail.com",
    status: "Active",
  },

  {
    id: "PAR-1002",
    name: "Amit Verma",
    relation: "Father",
    studentIds: ["STU-1002"],
    mobile: "9876500002",
    email: "amit.parent@gmail.com",
    status: "Active",
  },
];

export const getParents = () =>
  readData(
    PARENTS_KEY,
    defaultParents
  );

export const initializeParents = () => {
  if (!localStorage.getItem(PARENTS_KEY)) {
    writeData(
      PARENTS_KEY,
      defaultParents
    );
  }
};

export const addParent = (parent) => {
  const parents = getParents();

  const newParent = {
    id: createId("PAR"),
    status: "Active",
    createdAt: new Date().toISOString(),
    ...parent,
  };

  writeData(PARENTS_KEY, [
    ...parents,
    newParent,
  ]);

  return newParent;
};

export const updateParent = (
  id,
  changes
) =>
  updateItemById(
    PARENTS_KEY,
    id,
    changes
  );

export const deleteParent = (id) =>
  removeItemById(
    PARENTS_KEY,
    id
  );