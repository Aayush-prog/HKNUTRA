import React, { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

export default function MembershipReason() {
  const api = import.meta.env.VITE_URL;
  const [membershipReason, setMembershipReason] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize as null for no error
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null, // For file upload
  });
  const { authToken } = useContext(AuthContext);
  const fetchMembershipReason = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(`${api}/membershipReason/`);
      if (response.status === 200) {
        setMembershipReason(response.data.data);
      } else {
        setError(
          response.data.message || "Failed to fetch membership reasons."
        );
        alert(response.data.message || "Failed to fetch membership reasons."); // Using alert
      }
    } catch (err) {
      setError("Failed to fetch membership reason data.");
      alert("Failed to fetch membership reason data."); // Using alert
      console.error("Error fetching membership reasons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembershipReason();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setFormData({ title: "", body: "", image: null });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    setFormData({ title: item.title, body: item.body, image: null }); // Don't pre-fill image for security/simplicity; user re-uploads if needed.
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentItem(null);
    setFormData({ title: "", body: "", image: null });
    setError(null); // Clear any modal-related errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("body", formData.body);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let response;
      if (isEditing && currentItem) {
        response = await axios.patch(
          `${api}/membershipReason/edit/${currentItem._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Membership reason updated successfully!"); // Using alert
        } else {
          alert(response.data.message || "Failed to update membership reason."); // Using alert
        }
      } else {
        response = await axios.post(`${api}/membershipReason/create`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 201) {
          alert("Membership reason created successfully!"); // Using alert
        } else {
          alert(response.data.message || "Failed to create membership reason."); // Using alert
        }
      }
      fetchMembershipReason(); // Re-fetch to update the list
      closeModal();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} membership reason.`;
      setError(errorMessage);
      alert(errorMessage); // Using alert
      console.error(
        `Error ${isEditing ? "updating" : "creating"} membership reason:`,
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this membership reason?")
    ) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(
        `${api}/membershipReason/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Membership reason deleted successfully!"); // Using alert
        fetchMembershipReason(); // Re-fetch to update the list
      } else {
        setError(
          response.data.message || "Failed to delete membership reason."
        );
        alert(response.data.message || "Failed to delete membership reason."); // Using alert
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete membership reason.";
      setError(errorMessage);
      alert(errorMessage); // Using alert
      console.error("Error deleting membership reason:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center">
        More Than a Membership
      </h2>

      {/* Add Button for creating new reasons */}
      <div className="flex justify-end my-4">
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out"
        >
          Add New Reason
        </button>
      </div>

      <div className="lg:flex lg:flex-wrap md:justify-center md:items-start gap-8">
        <div
          id="leftDiv"
          className="md:grid grid-cols-1 lg:block lg:w-full mb-6 md:mb-0"
        >
          {loading && <Loading />}
          {error && <p className="text-red-500 text-center my-4">{error}</p>}

          {!loading && !error && membershipReason.length > 0
            ? membershipReason.map((item, idx) => (
                <div
                  className={`flex flex-col md:flex-row items-center gap-5 my-6 p-4 border rounded-lg shadow-sm ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  key={item._id}
                >
                  <div className="w-full md:w-1/2">
                    <img
                      src={`${api}/images/${item.image}`}
                      alt={item.title}
                      className="w-full h-auto rounded-md object-cover max-h-60"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4">{item.body}</p>
                    <div className="flex justify-center md:justify-start gap-3">
                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : !loading &&
              !error && (
                <div className="flex items-center justify-center h-full py-10">
                  <p className="text-center text-gray-700">
                    No membership reasons found. Click "Add New Reason" to
                    create one.
                  </p>
                </div>
              )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-4">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {isEditing
                ? "Edit Membership Reason"
                : "Create New Membership Reason"}
            </h3>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Body:
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...(!isEditing && { required: true })} // Make image required only for creation
                />
                {isEditing && currentItem && currentItem.image && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current image:{" "}
                    <span className="font-semibold">{currentItem.image}</span>{" "}
                    (Upload new to replace)
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Saving..." : isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
