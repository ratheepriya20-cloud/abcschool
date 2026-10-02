import React, {
  useEffect,
  useState,
} from "react";

import {
  FaImages,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaImage,
} from "react-icons/fa";

import "./ClientGallery.css";

import {
  initializeGallery,
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../data/galleryData";


const emptyForm = {
  title: "",
  category: "School",
  image: "",
  description: "",
  status: "Published",
};


const ClientGallery = () => {
  const [gallery, setGallery] =
    useState([]);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState(emptyForm);


  const loadGallery = () => {
    initializeGallery();

    setGallery(
      getGallery()
    );
  };


  useEffect(() => {
    loadGallery();
  }, []);


  const openAdd = () => {
    setEditingId(null);

    setFormData(
      emptyForm
    );

    setModalOpen(true);
  };


  const openEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title:
        item.title || "",

      category:
        item.category ||
        "School",

      image:
        item.image || "",

      description:
        item.description ||
        "",

      status:
        item.status ||
        "Published",
    });

    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);

    setEditingId(null);

    setFormData(
      emptyForm
    );
  };


  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* IMAGE */

  const handleImage = (
    event
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
        "Please select an image."
      );

      return;
    }

    if (
      file.size >
      1.5 * 1024 * 1024
    ) {
      alert(
        "Image 1.5MB se chhoti rakho."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setFormData(
        (prev) => ({
          ...prev,
          image:
            reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  };


  /* SAVE */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.title.trim()
    ) {
      alert(
        "Gallery title required hai."
      );

      return;
    }

    if (editingId) {
      updateGalleryItem(
        editingId,
        formData
      );
    } else {
      addGalleryItem(
        formData
      );
    }

    loadGallery();

    closeModal();
  };


  /* DELETE */

  const handleDelete = (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Delete this gallery item?"
      );

    if (!confirmed) return;

    deleteGalleryItem(id);

    loadGallery();
  };


  return (
    <div className="cgallery-page">

      {/* HEADER */}

      <section className="cgallery-header">

        <div>
          <span>
            WEBSITE MEDIA
          </span>

          <h1>
            Gallery Management
          </h1>

          <p>
            Add, edit and remove
            photographs displayed in
            the public school gallery.
          </p>
        </div>


        <button
          type="button"
          onClick={openAdd}
        >
          <FaPlus />

          Add Photo
        </button>

      </section>


      {/* GRID */}

      <section className="cgallery-grid">

        {gallery.map((item) => (
          <article
            className="cgallery-card"
            key={item.id}
          >

            <div className="cgallery-image">

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                />
              ) : (
                <div className="cgallery-no-image">
                  <FaImage />
                </div>
              )}

              <span
                className={`cgallery-status ${
                  item.status
                    ?.toLowerCase()
                }`}
              >
                {item.status}
              </span>

            </div>


            <div className="cgallery-content">

              <span>
                {item.category}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description ||
                  "No description"}
              </p>


              <div className="cgallery-actions">

                <button
                  type="button"
                  className="cgallery-edit"
                  onClick={() =>
                    openEdit(item)
                  }
                >
                  <FaEdit />

                  Edit
                </button>


                <button
                  type="button"
                  className="cgallery-delete"
                  onClick={() =>
                    handleDelete(
                      item.id
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


      {/* MODAL */}

      {modalOpen && (
        <div className="cgallery-overlay">

          <div className="cgallery-modal">

            <button
              type="button"
              className="cgallery-close"
              onClick={
                closeModal
              }
            >
              <FaTimes />
            </button>


            <span className="cgallery-modal-label">
              WEBSITE GALLERY
            </span>

            <h2>
              {editingId
                ? "Edit Gallery Photo"
                : "Add Gallery Photo"}
            </h2>


            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="cgallery-field">
                <label>
                  Title
                </label>

                <input
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>


              <div className="cgallery-two">

                <div className="cgallery-field">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      School
                    </option>

                    <option>
                      Academic
                    </option>

                    <option>
                      Sports
                    </option>

                    <option>
                      Cultural
                    </option>

                    <option>
                      Activities
                    </option>

                    <option>
                      Events
                    </option>
                  </select>

                </div>


                <div className="cgallery-field">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                  >
                    <option>
                      Published
                    </option>

                    <option>
                      Draft
                    </option>
                  </select>

                </div>

              </div>


              <div className="cgallery-field">

                <label>
                  Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImage
                  }
                />

              </div>


              {formData.image && (
                <div className="cgallery-form-preview">
                  <img
                    src={
                      formData.image
                    }
                    alt="Preview"
                  />
                </div>
              )}


              <div className="cgallery-field">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                />

              </div>


              <div className="cgallery-modal-actions">

                <button
                  type="button"
                  className="cgallery-cancel"
                  onClick={
                    closeModal
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cgallery-save"
                >
                  <FaSave />

                  {editingId
                    ? "Update Photo"
                    : "Add Photo"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default ClientGallery;