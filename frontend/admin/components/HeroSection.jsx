import React, { useContext, useState } from "react";
import axios from "axios";
import { FaPen, FaSave, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

export default function HeroSection(props) {
  const {
    image: initialImage,
    title: initialTitle,
    id,
    body: initialBody,
  } = props;
  const api = import.meta.env.VITE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle || "");
  const { authToken } = useContext(AuthContext);
  const [editedBody, setEditedBody] = useState(initialBody || "");
  const [editedImage, setEditedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    initialImage ? `${api}/images/${initialImage}` : null
  );
  const [currentImage, setCurrentImage] = useState(initialImage);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedTitle);
      if (editedImage) {
        formData.append("image", editedImage);
      }

      const response = await axios.patch(`${api}/hero/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Hero section updated:", response.data);
      setIsEditing(false);
      if (response.data.image) {
        setCurrentImage(response.data.image);
        setPreviewImage(`${api}/images/${response.data.image}`);
      }
    } catch (error) {
      console.error("Error updating hero section:", error);
    }
  };

  const renderDisplayMode = () => (
    <>
      <img
        src={`${api}/images/${currentImage}`}
        alt="Background"
        className="w-full h-full object-cover"
      />
      <h1 className="absolute bottom-4 right-0 max-w-[90vw] sm:max-w-[50vw] lg:max-w-[25vw] bg-yellow-400 text-primary font-bold text-lg sm:text-xl md:text-2xl px-4 py-2 rounded shadow-lg">
        {initialTitle}
      </h1>
    </>
  );

  const renderEditMode = () => (
    <>
      <button
        onClick={toggleEdit}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Back"
      >
        <FaArrowLeft size={18} />
      </button>

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      )}
      {!previewImage && currentImage && (
        <img
          src={`${api}/images/${currentImage}`}
          alt="Current"
          className="w-full h-full object-cover"
        />
      )}

      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor="imageUpload"
        className="absolute bottom-20 left-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-300"
      >
        Upload New Image
      </label>

      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="absolute bottom-4 right-0 max-w-[90vw] sm:max-w-[50vw] lg:max-w-[25vw] bg-white text-primary font-bold text-lg sm:text-xl md:text-2xl px-4 py-2 rounded shadow-lg"
      />
    </>
  );

  return (
    <div className="relative w-full h-[75vh] bg-gray-200 overflow-hidden">
      {isEditing ? renderEditMode() : renderDisplayMode()}

      <button
        onClick={isEditing ? handleSave : toggleEdit}
        className="absolute top-4 right-4 p-2 rounded-full bg-white text-black hover:bg-gray-200 z-20"
        aria-label={isEditing ? "Save" : "Edit"}
      >
        {isEditing ? <FaSave size={18} /> : <FaPen size={18} />}
      </button>
    </div>
  );
}
