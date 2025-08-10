import React, { useEffect, useState, useRef, useContext } from "react";
import Loading from "./Loading";
import * as ReactIcons from "react-icons/fa";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SearchableIconPicker from "./SearchableIconPicker";
import {
  FaPen,
  FaSave,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaImage,
} from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

export default function MissionSection() {
  const api = import.meta.env.VITE_URL;
  const [mission, setMission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Separate state for adding and editing
  const [addFormValues, setAddFormValues] = useState({
    icon: "FaStar",
    title: "",
    body: "",
    image: null,
    color: "text-blue-500",
  });

  const [editFormValues, setEditFormValues] = useState({
    icon: "FaStar",
    title: "",
    body: "",
    image: null,
    color: "text-blue-500",
  });
  const [imagePreview, setImagePreview] = useState(null); //for image preview
  const [existingImage, setExistingImage] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [leftDivHeight, setLeftDivHeight] = useState(0);
  const leftDivRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { authToken } = useContext(AuthContext);

  // const iconMap = {
  //   ...ReactIcons,
  // };

  // function IconRenderer({ iconName, color }) {
  //   const IconComponent = iconMap[iconName];
  //   if (!IconComponent) return <span>Icon not found</span>;
  //   return (
  //     <IconComponent
  //       className={`mb-2 text-support text-3xl md:text-4xl lg:text-5xl inline-block ${color}`}
  //     />
  //   );
  // }

  const fetchMission = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/mission/`);
      if (response.status === 200) {
        setMission(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch mission data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMission();
  }, [api, isAdding]);

  // Populate the edit form when editingIndex changes
  useEffect(() => {
    if (editingIndex !== null && mission[editingIndex]) {
      const editingItem = mission[editingIndex];
      setEditFormValues(editingItem);
      setExistingImage(`${api}/images/${editingItem.image}`);
      setImagePreview(null); // Reset preview when starting edit
      setImageDeleted(false); // Reset delete flag
    } else {
      setEditFormValues({
        icon: "FaStar",
        title: "",
        body: "",
        image: null,
        color: "text-blue-500",
      });
      setExistingImage(null);
      setImagePreview(null);
      setImageDeleted(false);
    }
  }, [editingIndex, mission, api]);

  const toggleAdd = () => {
    setIsAdding((prev) => !prev);
    setEditingIndex(null); // Ensure editing is cancelled
    setAddFormValues({
      title: "",
      body: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleAddChange = (field, value) => {
    setAddFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditChange = (field, value) => {
    setEditFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //Edit Image Preview
  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    setEditFormValues((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); //local image preview
    setExistingImage(null);
    setImageDeleted(false);
  };

  //Add Image Preview
  const handleAddImageChange = (event) => {
    const file = event.target.files[0];
    setAddFormValues((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); //for image preview
  };

  const handleSave = async () => {
    try {
      if (editingIndex === null) return;
      const { _id, title, body, image } = editFormValues;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      if (imageDeleted) {
        formData.append("imageDeleted", true);
      }

      if (image) {
        if (typeof image === "object") {
          formData.append("image", image);
        }
      }

      const res = await axios.patch(`${api}/mission/edit/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("success");
        setEditingIndex(null);
        fetchMission(); // Refresh mission data
        setImagePreview(null);
        setExistingImage(null);
        setImageDeleted(false);
      }
    } catch (error) {
      console.error("Error updating mission:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`${api}/mission/del/${_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status == 200) {
        alert("success");
        setMission((prev) => prev.filter((o) => o._id !== _id));
      }
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  const handleAddMission = async () => {
    try {
      const formData = new FormData();
      formData.append("title", addFormValues.title);
      formData.append("body", addFormValues.body);
      if (addFormValues.image) {
        formData.append("image", addFormValues.image);
      }

      const res = await axios.post(`${api}/mission/create`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        alert("success");
        setMission((prev) => [...prev, res.data.data]);
        setIsAdding(false);
        fetchMission();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating mission:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      if (leftDivRef.current && window.innerWidth >= 768) {
        setLeftDivHeight(leftDivRef.current.offsetHeight);
      } else {
        setLeftDivHeight(0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mission, screenWidth]);

  const showImageSlider = screenWidth > 768;

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary text-center">
        Our Mission
      </h2>

      <div className="flex justify-end mb-4">
        {!isAdding && editingIndex === null && (
          <button
            onClick={toggleAdd}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Mission
          </button>
        )}
      </div>

      {!isAdding && editingIndex === null ? (
        <div className="lg:flex lg:flex-wrap md:justify-center md:items-start gap-8">
          <div
            id="leftDiv"
            className=" md:grid grid-cols-1 lg:block lg:w-5/12 mb-6 md:mb-0"
            ref={leftDivRef}
          >
            {mission.length > 0 &&
              mission.map((item, idx) => (
                <div
                  className="lg:flex flex-col items-center lg:text-left gap-5 my-6 border p-4 rounded-lg shadow-md bg-white"
                  key={idx}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingIndex(idx)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded"
                      >
                        <FaPen className="inline-block" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                      >
                        <FaTrash className="inline-block" />
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-md md:text-xl font-semibold mb-1`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base">{item.body}</p>
                </div>
              ))}
          </div>

          {showImageSlider && (
            <div className="md:w-3/5 lg:w-5/12 mb-6 md:mb-0">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="w-full"
                style={
                  screenWidth >= 768 && leftDivHeight
                    ? { height: `${leftDivHeight}px` }
                    : {}
                }
              >
                {mission.length > 0 &&
                  mission.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={`${api}/images/${item.image}`}
                        loading="lazy"
                        alt={item.title}
                        className="rounded-lg w-full h-full object-cover shadow-md"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>
      ) : null}

      {/* Add Mission Form */}
      {isAdding && (
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Mission</h2>
          {/* 
          <SearchableIconPicker
            selectedIcon={addFormValues.icon}
            setSelectedIcon={(icon) => handleAddChange("icon", icon)}
          /> */}

          <input
            type="text"
            value={addFormValues.title}
            onChange={(e) => handleAddChange("title", e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Title"
          />

          <textarea
            value={addFormValues.body}
            onChange={(e) => handleAddChange("body", e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Description"
          />

          <input
            type="file"
            onChange={handleAddImageChange}
            className="w-full border rounded p-2 mb-2"
            accept="image/*"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}

          <div className="flex justify-between">
            <button
              onClick={handleAddMission}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
            >
              <FaPlus />
              Add Mission
            </button>
            <button
              onClick={toggleAdd}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
            >
              <FaArrowLeft />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Mission Form */}
      {editingIndex !== null && (
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Mission</h2>

          {/* <SearchableIconPicker
            selectedIcon={editFormValues.icon}
            setSelectedIcon={(icon) => handleEditChange("icon", icon)}
          />

          <input
            type="text"
            value={editFormValues.color}
            onChange={(e) => handleEditChange("color", e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Color (e.g., text-blue-500)"
          /> */}

          <input
            type="text"
            value={editFormValues.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Title"
          />

          <textarea
            value={editFormValues.body}
            onChange={(e) => handleEditChange("body", e.target.value)}
            className="w-full border rounded p-2 mb-2"
            placeholder="Description"
          />

          <input
            type="file"
            onChange={handleEditImageChange}
            className="w-full border rounded p-2 mb-2"
            accept="image/*"
          />

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="New Preview"
              className="w-full h-48 object-cover rounded mb-2"
            />
          ) : existingImage ? (
            <div className="relative">
              <img
                src={existingImage}
                alt="Existing Preview"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <button
                onClick={() => {
                  setImageDeleted(true);
                  setExistingImage(null);
                  setEditFormValues((prev) => ({ ...prev, image: null })); // Clear image in form values
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                <FaTrash />
              </button>
            </div>
          ) : null}

          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
            >
              <FaSave />
              Save Mission
            </button>
            <button
              onClick={() => setEditingIndex(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center gap-1"
            >
              <FaArrowLeft />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
