import { useEffect, useState } from "react";

import {
  WEBSITE_CONTENT_KEY,
  initializeWebsiteContent,
  getPageContent,
} from "../data/websiteContentData";

import {
  WEBSITE_IMAGES_KEY,
  initializeWebsiteImages,
  getWebsiteImage,
} from "../data/websiteImagesData";

import {
  NEWS_KEY,
  initializeNews,
  getPublishedNews,
} from "../data/newsData";

import {
  PUBLIC_NOTICES_KEY,
  initializePublicNotices,
  getPublishedPublicNotices,
} from "../data/publicNoticesData";

import {
  GALLERY_KEY,
  initializeGallery,
  getGallery,
} from "../data/galleryData";


/* =========================================================
   COMMON LISTENER
========================================================= */

const useCMSData = (
  storageKey,
  initializer,
  getter
) => {
  const [data, setData] = useState(() => {
    initializer?.();
    return getter();
  });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey === storageKey
      ) {
        setData(getter());
      }
    };

    setData(getter());

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [storageKey, getter]);

  return data;
};


/* =========================================================
   WEBSITE PAGE CONTENT
========================================================= */

export const useWebsitePageContent = (
  page
) => {
  const [content, setContent] =
    useState(() => {
      initializeWebsiteContent();

      return getPageContent(page);
    });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey === WEBSITE_CONTENT_KEY
      ) {
        setContent(
          getPageContent(page)
        );
      }
    };

    setContent(
      getPageContent(page)
    );

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [page]);

  return content;
};


/* =========================================================
   WEBSITE IMAGE
========================================================= */

export const useWebsiteImage = (
  imageKey
) => {
  const [websiteImage, setWebsiteImage] =
    useState(() => {
      initializeWebsiteImages();

      return getWebsiteImage(
        imageKey
      );
    });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey === WEBSITE_IMAGES_KEY
      ) {
        setWebsiteImage(
          getWebsiteImage(
            imageKey
          )
        );
      }
    };

    setWebsiteImage(
      getWebsiteImage(imageKey)
    );

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [imageKey]);

  return websiteImage;
};


/* =========================================================
   PUBLISHED NEWS
========================================================= */

export const usePublishedNews = (
  limit = null
) => {
  const getData = () => {
    const items = [
      ...getPublishedNews(),
    ].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    return limit
      ? items.slice(0, limit)
      : items;
  };

  const [news, setNews] =
    useState(() => {
      initializeNews();

      return getData();
    });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey === NEWS_KEY
      ) {
        setNews(getData());
      }
    };

    setNews(getData());

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [limit]);

  return news;
};


/* =========================================================
   PUBLIC NOTICES
========================================================= */

export const usePublishedPublicNotices = (
  limit = null
) => {
  const getData = () => {
    const items = [
      ...getPublishedPublicNotices(),
    ].sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    );

    return limit
      ? items.slice(0, limit)
      : items;
  };

  const [notices, setNotices] =
    useState(() => {
      initializePublicNotices();

      return getData();
    });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey ===
          PUBLIC_NOTICES_KEY
      ) {
        setNotices(getData());
      }
    };

    setNotices(getData());

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [limit]);

  return notices;
};


/* =========================================================
   PUBLISHED GALLERY
========================================================= */

export const usePublishedGallery = (
  limit = null
) => {
  const getData = () => {
    const items = getGallery().filter(
      (item) =>
        item.status === "Published"
    );

    return limit
      ? items.slice(0, limit)
      : items;
  };

  const [gallery, setGallery] =
    useState(() => {
      initializeGallery();

      return getData();
    });

  useEffect(() => {
    const refresh = (event) => {
      const changedKey =
        event?.detail?.key ||
        event?.key;

      if (
        !changedKey ||
        changedKey === GALLERY_KEY
      ) {
        setGallery(getData());
      }
    };

    setGallery(getData());

    window.addEventListener(
      "abpsDataUpdated",
      refresh
    );

    window.addEventListener(
      "storage",
      refresh
    );

    return () => {
      window.removeEventListener(
        "abpsDataUpdated",
        refresh
      );

      window.removeEventListener(
        "storage",
        refresh
      );
    };
  }, [limit]);

  return gallery;
};