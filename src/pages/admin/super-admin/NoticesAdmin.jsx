import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import {
  NOTICES_KEY,
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../../../data/noticesData";

const NoticesAdmin = () => {

  const [notices] =
    useSchoolData(
      NOTICES_KEY,
      getNotices
    );

// NoticesAdmin
return (
  <div className="notices-admin-page">
    <AdminCrudPage
      title="Notices"
      label="COMMUNICATION"
      description="Publish and manage school notices."
      data={notices}
      searchFields={[
        "title",
        "category",
        "audience",
      ]}
      fields={[
        {
          name: "title",
          label: "Notice Title",
          required: true,
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "Academic",
            "School",
            "Examination",
            "Sports",
            "General",
          ],
        },
        {
          name: "audience",
          label: "Audience",
          type: "select",
          options: [
            "all",
            "students",
            "parents",
            "students-parents",
            "teachers",
          ],
        },
        {
          name: "date",
          label: "Date",
          type: "date",
        },
        {
          name: "description",
          label: "Notice",
          type: "textarea",
          full: true,
          table: false,
          required: true,
        },
      ]}
      onAdd={addNotice}
      onUpdate={updateNotice}
      onDelete={deleteNotice}
    />
  </div>
);
};

export default NoticesAdmin;