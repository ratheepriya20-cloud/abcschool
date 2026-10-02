// src/hooks/useSchoolData.js

import {
  useCallback,
  useEffect,
  useState,
} from "react";

const useSchoolData = (
  storageKey,
  getter
) => {
  const [data, setData] =
    useState(() => getter());

  const refresh =
    useCallback(() => {
      const latest = getter();

      setData(
        Array.isArray(latest)
          ? latest
          : []
      );
    }, [getter]);

  useEffect(() => {
    refresh();

    const handleDataUpdate = (
      event
    ) => {
      if (
        !event.detail?.key ||
        event.detail.key ===
          storageKey
      ) {
        refresh();
      }
    };

    const handleStorage = (
      event
    ) => {
      if (
        !event.key ||
        event.key ===
          storageKey
      ) {
        refresh();
      }
    };

    window.addEventListener(
      "abpsDataUpdated",
      handleDataUpdate
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        handleDataUpdate
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [
    storageKey,
    refresh,
  ]);

  return [
    data,
    refresh,
  ];
};

export default useSchoolData;