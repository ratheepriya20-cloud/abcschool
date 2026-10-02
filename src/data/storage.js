// src/data/storage.js

/* =========================================================
   AB PUBLIC SCHOOL
   SHARED LOCAL STORAGE DATA LAYER

   Handles:
   - Read data
   - Write data
   - Add item
   - Update item
   - Delete item
   - Same-tab live refresh
   - Portal change events
========================================================= */

/* =========================================================
   EVENTS
========================================================= */

export const ABPS_DATA_UPDATED_EVENT =
  "abpsDataUpdated";

export const ABPS_PORTAL_DATA_CHANGED_EVENT =
  "abpsPortalDataChanged";

/* =========================================================
   SAFE WINDOW CHECK
========================================================= */

const canUseWindow = () =>
  typeof window !== "undefined" &&
  typeof localStorage !== "undefined";

/* =========================================================
   READ DATA
========================================================= */

export const readData = (
  key,
  fallback = []
) => {
  try {
    if (!canUseWindow()) {
      return fallback;
    }

    const saved =
      localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed =
      JSON.parse(saved);

    return parsed;
  } catch (error) {
    console.error(
      `Error reading ${key}:`,
      error
    );

    return fallback;
  }
};

/* =========================================================
   DISPATCH NORMAL DATA UPDATE

   Student / Parent / Teacher / Admin components
   isi event ko listen karke fresh data load kar sakte hain.
========================================================= */

const dispatchDataUpdated = (
  key,
  extraDetail = {}
) => {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(
      ABPS_DATA_UPDATED_EVENT,
      {
        detail: {
          key,
          ...extraDetail,
        },
      }
    )
  );
};

/* =========================================================
   DISPATCH PORTAL CHANGE

   Notification system is event ko listen karega.

   action:
   - add
   - update
   - delete
   - write
========================================================= */

const dispatchPortalDataChanged = ({
  key,
  action = "write",
  itemId = null,
  changedItem = null,
  previousItem = null,
  source = null,
}) => {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(
      ABPS_PORTAL_DATA_CHANGED_EVENT,
      {
        detail: {
          key,
          action,
          itemId,
          changedItem,
          previousItem,
          source,
          timestamp:
            new Date().toISOString(),
        },
      }
    )
  );
};

/* =========================================================
   WRITE DATA

   IMPORTANT:
   Existing files jo writeData(key, data) use kar rahi hain
   wo bilkul pehle ki tarah work karengi.

   Third optional argument metadata hai.
========================================================= */

export const writeData = (
  key,
  data,
  metadata = {}
) => {
  try {
    if (!canUseWindow()) {
      return false;
    }

    localStorage.setItem(
      key,
      JSON.stringify(data)
    );

    const {
      notify = true,
      action = "write",
      itemId = null,
      changedItem = null,
      previousItem = null,
      source = null,
    } = metadata || {};

    /* -----------------------------------------------
       Normal live data update
    ----------------------------------------------- */

    dispatchDataUpdated(
      key,
      {
        action,
        itemId,
      }
    );

    /* -----------------------------------------------
       Portal notification event

       notify:false use kar sakte ho agar kisi internal
       storage write par notification nahi chahiye.
    ----------------------------------------------- */

    if (notify) {
      dispatchPortalDataChanged({
        key,
        action,
        itemId,
        changedItem,
        previousItem,
        source,
      });
    }

    return true;
  } catch (error) {
    console.error(
      `Error saving ${key}:`,
      error
    );

    return false;
  }
};

/* =========================================================
   CREATE ID
========================================================= */

export const createId = (
  prefix = "ITEM"
) => {
  return `${prefix}-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;
};

/* =========================================================
   ADD ITEM

   Future data files me ye helper use kar sakte ho.

   Example:
   addItem(STUDENTS_KEY, newStudent);
========================================================= */

export const addItem = (
  key,
  item,
  options = {}
) => {
  const items =
    readData(key, []);

  const newItem = {
    ...item,

    createdAt:
      item?.createdAt ||
      new Date().toISOString(),

    updatedAt:
      item?.updatedAt ||
      new Date().toISOString(),
  };

  const updated = [
    ...items,
    newItem,
  ];

  writeData(
    key,
    updated,
    {
      notify:
        options.notify !== false,

      action: "add",

      itemId:
        newItem?.id || null,

      changedItem:
        newItem,

      previousItem: null,

      source:
        options.source || null,
    }
  );

  return newItem;
};

/* =========================================================
   REMOVE ITEM BY ID
========================================================= */

export const removeItemById = (
  key,
  id,
  options = {}
) => {
  const items =
    readData(key, []);

  /* -----------------------------------------------
     Item delete hone se pehle save kar lo
     notification me details ke liye.
  ----------------------------------------------- */

  const previousItem =
    items.find(
      (item) =>
        String(item?.id) ===
        String(id)
    ) || null;

  const updated =
    items.filter(
      (item) =>
        String(item?.id) !==
        String(id)
    );

  /*
    ID mila hi nahi to unnecessary
    change event generate nahi karenge.
  */

  if (!previousItem) {
    return updated;
  }

  writeData(
    key,
    updated,
    {
      notify:
        options.notify !== false,

      action: "delete",

      itemId: id,

      changedItem: null,

      previousItem,

      source:
        options.source || null,
    }
  );

  return updated;
};

/* =========================================================
   UPDATE ITEM BY ID
========================================================= */

export const updateItemById = (
  key,
  id,
  changes,
  options = {}
) => {
  const items =
    readData(key, []);

  const previousItem =
    items.find(
      (item) =>
        String(item?.id) ===
        String(id)
    ) || null;

  /*
    Record nahi mila.
  */

  if (!previousItem) {
    return items;
  }

  const changedItem = {
    ...previousItem,
    ...changes,

    /*
      ID accidental change nahi hone denge.
    */

    id:
      previousItem.id,

    updatedAt:
      new Date().toISOString(),
  };

  const updated =
    items.map((item) =>
      String(item?.id) ===
      String(id)
        ? changedItem
        : item
    );

  writeData(
    key,
    updated,
    {
      notify:
        options.notify !== false,

      action: "update",

      itemId: id,

      changedItem,

      previousItem,

      source:
        options.source || null,
    }
  );

  return updated;
};

/* =========================================================
   GET ITEM BY ID
========================================================= */

export const getItemById = (
  key,
  id,
  fallback = null
) => {
  const items =
    readData(key, []);

  return (
    items.find(
      (item) =>
        String(item?.id) ===
        String(id)
    ) || fallback
  );
};

/* =========================================================
   REPLACE ALL DATA WITHOUT PORTAL NOTIFICATION

   Initialization/default data ke liye useful.

   Isse data refresh event aayega,
   lekin users ko "new update" notification nahi milega.
========================================================= */

export const initializeData = (
  key,
  data
) => {
  try {
    if (!canUseWindow()) {
      return false;
    }

    /*
      Existing data ko overwrite nahi karna.
    */

    if (
      localStorage.getItem(key)
    ) {
      return false;
    }

    return writeData(
      key,
      data,
      {
        notify: false,
        action: "initialize",
      }
    );
  } catch (error) {
    console.error(
      `Error initializing ${key}:`,
      error
    );

    return false;
  }
};