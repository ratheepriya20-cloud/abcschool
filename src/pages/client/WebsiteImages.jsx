import React, {
  useEffect,
  useState,
} from "react";

import {
  FaImage,
  FaUpload,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import "./WebsiteImages.css";

import {
  getWebsiteImages,
  initializeWebsiteImages,
  updateWebsiteImage,
  removeWebsiteImage,
} from "../../data/websiteImagesData";


const WebsiteImages = () => {
  const [images, setImages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [preview, setPreview] =
    useState(null);


  const loadImages = () => {
    initializeWebsiteImages();

    setImages(
      getWebsiteImages()
    );
  };


  useEffect(() => {
    loadImages();
  }, []);


  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  };


  /* =========================================================
     FILE -> BASE64
  ========================================================= */

  const handleImageChange = (
    event,
    item
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select an image file."
      );

      return;
    }

    /*
      LocalStorage ke liye
      image bahut badi nahi honi chahiye.
    */

    if (
      file.size >
      1.5 * 1024 * 1024
    ) {
      alert(
        "Demo version me image 1.5MB se chhoti rakho."
      );

      event.target.value = "";

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      updateWebsiteImage(
        item.id,
        reader.result
      );

      loadImages();

      showMessage(
        `${item.title} updated successfully.`
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };


  /* =========================================================
     REMOVE
  ========================================================= */

  const handleRemove = (
    item
  ) => {
    if (!item.image) return;

    const confirmed =
      window.confirm(
        `Remove ${item.title}?`
      );

    if (!confirmed) return;

    removeWebsiteImage(
      item.id
    );

    loadImages();

    showMessage(
      "Image removed successfully."
    );
  };


  return (
    <div className="wimg-page">

      {/* HEADER */}

      <section className="wimg-header">

        <div>
          <span>
            WEBSITE MEDIA
          </span>

          <h1>
            Website Images
          </h1>

          <p>
            Replace images used on the
            public school website without
            changing the website layout.
          </p>
        </div>

        <div className="wimg-header-icon">
          <FaImage />
        </div>

      </section>


      {/* MESSAGE */}

      {message && (
        <div className="wimg-message">
          <FaCheckCircle />

          {message}
        </div>
      )}


      {/* NOTE */}

      <section className="wimg-note">

        <FaExclamationTriangle />

        <div>
          <strong>
            Image Management
          </strong>

          <p>
            Uploading an image only
            replaces the selected website
            image. Page structure, buttons,
            routes and design remain
            unchanged.
          </p>
        </div>

      </section>


      {/* GRID */}

      <section className="wimg-grid">

        {images.map((item) => (
          <article
            className="wimg-card"
            key={item.id}
          >

            <div className="wimg-preview">

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                />
              ) : (
                <div className="wimg-placeholder">
                  <FaImage />

                  <span>
                    No custom image
                  </span>
                </div>
              )}

              {item.image && (
                <button
                  type="button"
                  className="wimg-eye"
                  onClick={() =>
                    setPreview(item)
                  }
                >
                  <FaEye />
                </button>
              )}

            </div>


            <div className="wimg-content">

              <span>
                {item.page}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.section}
              </p>


              <div className="wimg-actions">

                <label className="wimg-upload">

                  <FaUpload />

                  {item.image
                    ? "Replace"
                    : "Upload"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(
                      event
                    ) =>
                      handleImageChange(
                        event,
                        item
                      )
                    }
                  />

                </label>


                <button
                  type="button"
                  className="wimg-delete"
                  disabled={
                    !item.image
                  }
                  onClick={() =>
                    handleRemove(
                      item
                    )
                  }
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </article>
        ))}

      </section>


      {/* IMAGE PREVIEW MODAL */}

      {preview && (
        <div
          className="wimg-modal-overlay"
          onClick={() =>
            setPreview(null)
          }
        >

          <div
            className="wimg-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              onClick={() =>
                setPreview(null)
              }
            >
              ×
            </button>

            <img
              src={preview.image}
              alt={preview.title}
            />

            <h3>
              {preview.title}
            </h3>

          </div>

        </div>
      )}

    </div>
  );
};

export default WebsiteImages;