import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaPen, FaSave, FaArrowLeft, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

export default function SubSection({
  initialTitle,
  initialBody,
  initialBody2,
  initialImage,
  initialImages,
  initialVariant,
  initialAlignment,
  id,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [body2, setBody2] = useState(initialBody2);
  const [image, setImage] = useState(initialImage);
  const [images, setImages] = useState(initialImages);
  const [variant, setVariant] = useState(initialVariant);
  const [alignment, setAlignment] = useState(initialAlignment);
  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
    setBody2(initialBody2);
    setImage(initialImage);
    setImages(initialImages);
    setVariant(initialVariant);
    setAlignment(initialAlignment);
  }, [
    initialTitle,
    initialBody,
    initialBody2,
    initialImage,
    initialImages,
    initialVariant,
    initialAlignment,
  ]);
  const api = import.meta.env.VITE_URL;
  const { authToken } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title || "");
  const [editedBody, setEditedBody] = useState(body || "");
  const [editedBody2, setEditedBody2] = useState(body2 || "");
  const [editedImage, setEditedImage] = useState(null); // new uploaded File
  const [existingImage, setExistingImage] = useState(image || ""); // original image filename
  const [imageDeleted, setImageDeleted] = useState(false); // flag for backend

  const [editedImages, setEditedImages] = useState([]); // new images
  const [existingImages, setExistingImages] = useState(
    images ? [...images] : []
  ); // original gallery images

  const [editedVariant, setEditedVariant] = useState(variant || "normal");
  const [editedAlignment, setEditedAlignment] = useState(alignment || "normal");

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("body", editedBody);
      formData.append("body2", editedBody2);
      formData.append("variant", editedVariant);
      formData.append("alignment", editedAlignment);
      formData.append("imageDeleted", imageDeleted); // backend handles deletion
      if (editedImage) formData.append("image", editedImage);

      editedImages.forEach((file) => file && formData.append("images", file));
      formData.append("existingImages", JSON.stringify(existingImages));

      const res = await axios.patch(`${api}/subSection/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == 200) {
        setTitle(res.data.data.title);
        setBody(res.data.data.body);
        setBody2(res.data.data.body2);
        setImage(res.data.data.image);
        setImages(res.data.data.images);
        setVariant(res.data.data.variant);
        setAlignment(res.data.data.alignment);
        alert("saved");
      }
      console.log(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save.");
    }
  };

  const handleCancel = () => {
    setEditedTitle(title || "");
    setEditedBody(body || "");
    setEditedBody2(body2 || "");
    setEditedImage(null);
    setExistingImage(image || "");
    setImageDeleted(false);
    setEditedImages([]);
    setExistingImages(images ? [...images] : []);
    setEditedVariant(variant || "normal");
    setEditedAlignment(alignment || "normal");
    setIsEditing(false);
  };

  const removeExistingGalleryImage = (imgName) => {
    setExistingImages(existingImages.filter((img) => img !== imgName));
  };

  const removeNewGalleryImage = (index) => {
    const updated = [...editedImages];
    updated.splice(index, 1);
    setEditedImages(updated);
  };

  const removeMainImage = () => {
    setExistingImage("");
    setEditedImage(null);
    setImageDeleted(true);
  };

  const renderEditMode = () => (
    <div
      className={`relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 space-y-4 ${
        editedVariant === "green" ? "bg-green-300 text-white" : "text-black"
      }`}
    >
      {/* Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button
          onClick={handleSave}
          className="p-2 rounded-full bg-white text-black hover:bg-gray-200 shadow"
        >
          <FaSave size={18} />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 rounded-full bg-white text-black hover:bg-gray-200 shadow"
        >
          <FaArrowLeft size={18} />
        </button>
      </div>

      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        placeholder="Title"
        className="text-2xl sm:text-3xl md:text-4xl font-bold font-secondary bg-transparent border-b border-gray-400 focus:outline-none focus:border-primary w-full max-w-2xl"
      />
      <textarea
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
        rows={3}
        placeholder="Body"
        className="text-base md:text-lg lg:text-xl font-primary bg-transparent border border-gray-400 rounded p-2 focus:outline-none focus:border-primary w-full max-w-2xl"
      />
      {body2 !== undefined && (
        <textarea
          value={editedBody2}
          onChange={(e) => setEditedBody2(e.target.value)}
          rows={3}
          placeholder="Body 2"
          className="text-base md:text-lg lg:text-xl font-primary bg-transparent border border-gray-400 rounded p-2 focus:outline-none focus:border-primary w-full max-w-2xl"
        />
      )}

      {/* Main Image Upload + Preview */}
      <div className="flex flex-col items-center">
        <label className="text-sm mb-1">Main Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setEditedImage(e.target.files[0]);
            setImageDeleted(false);
          }}
          className="text-sm"
        />
        <div className="relative mt-2">
          {editedImage ? (
            <img
              src={URL.createObjectURL(editedImage)}
              alt="new"
              className="h-32 object-cover rounded"
            />
          ) : (
            existingImage && (
              <img
                src={`${api}/images/${existingImage}`}
                alt={existingImage}
                className="h-32 object-cover rounded"
              />
            )
          )}
          {(editedImage || existingImage) && (
            <button
              onClick={removeMainImage}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* Gallery Images */}
      <div className="flex flex-col items-center">
        <label className="text-sm mb-1">Gallery Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setEditedImages((prev) => [...prev, ...Array.from(e.target.files)])
          }
          className="text-sm"
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {existingImages.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={`${api}/images/${img}`}
                alt={img}
                className="h-20 w-20 object-cover rounded"
              />
              <button
                onClick={() => removeExistingGalleryImage(img)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {editedImages.map((file, idx) => (
            <div key={`new-${idx}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="new"
                className="h-20 w-20 object-cover rounded"
              />
              <button
                onClick={() => removeNewGalleryImage(idx)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Variant & Alignment */}
      <div className="flex space-x-4 mt-2">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Variant:</label>
          <select
            value={editedVariant}
            onChange={(e) => setEditedVariant(e.target.value)}
            className="border border-gray-400 rounded p-1 bg-transparent focus:outline-none focus:border-primary"
          >
            <option value="normal">Normal</option>
            <option value="green">Green</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm">Alignment:</label>
          <select
            value={editedAlignment}
            onChange={(e) => setEditedAlignment(e.target.value)}
            className="border border-gray-400 rounded p-1 bg-transparent focus:outline-none focus:border-primary"
          >
            <option value="normal">Normal</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDisplayMode = () => {
    if (alignment === "left") {
      return (
        <div
          className={`flex flex-col sm:flex-row items-center justify-center  py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5 ${
            variant === "green" ? "bg-green-300 text-white" : "text-black"
          }`}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleEdit}
              className="p-2 rounded-full bg-white text-black hover:bg-gray-200 shadow"
            >
              <FaPen size={18} />
            </button>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            {image && (
              <img
                src={`${api}/images/${image}`}
                loading="lazy"
                className="w-full sm:w-[110%] md:w-[100%] lg:w-[90%]"
                alt={image}
              />
            )}
            {images && (
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 500,
                  disableOnInteraction: true,
                }}
                spaceBetween={30}
                slidesPerView={1}
                className="w-full md:w-3/4"
              >
                {images.map((img, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <img
                        src={`${api}/images/${img}`}
                        loading="lazy"
                        alt={img}
                        className="h-[40vh] md:h-[70vh] object-fit shadow-lg "
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-start">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary">
                {title}
              </h2>
            )}
            {body && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-primary justify-center leading-relaxed w-full sm:w-[100%] md:w-[90%] lg:w-[80%]">
                {body}
              </p>
            )}
          </div>
        </div>
      );
    } else if (alignment === "right") {
      return (
        <div
          className={`flex flex-col sm:flex-row items-center justify-center py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5 ${
            variant === "green" ? "bg-green-300 text-white" : "text-black"
          }`}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleEdit}
              className="p-2 rounded-full bg-white text-black hover:bg-gray-200 shadow"
            >
              <FaPen size={18} />
            </button>
          </div>
          {/* Text on the Left */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:order-1">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary">
                {title}
              </h2>
            )}
            {body && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-primary justify-center leading-relaxed w-full sm:w-[100%] md:w-[90%] lg:w-[80%]">
                {body}
              </p>
            )}
          </div>

          {/* Image/Carousel on the Right */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:order-2">
            {image && (
              <img
                src={`${api}/images/${image}`}
                loading="lazy"
                className="w-full sm:w-[110%] md:w-[100%] lg:w-[90%]"
                alt={image}
              />
            )}
            {images && (
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                }}
                spaceBetween={30}
                slidesPerView={1}
                className="w-full md:w-3/4"
              >
                {images.map((img, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <img
                        src={`${api}/images/${img}`}
                        loading="lazy"
                        alt={img}
                        className=" w-full object-cover  shadow-lg "
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      );
    } else {
      // Original Structure when alignment is not left
      return (
        <div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={`flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center px-4 space-y-3 sm:space-y-4 md:space-y-5 ${
            variant === "green" ? "bg-green-300 text-white" : "text-black"
          }`}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleEdit}
              className="p-2 rounded-full bg-white text-black hover:bg-gray-200 shadow"
            >
              <FaPen size={18} />
            </button>
          </div>
          ;
          {image && (
            <img
              src={`${api}/images/${image}`}
              loading="lazy"
              className="w-full sm:w-[110vw] md:w-[100vw] lg:w-[60vw]"
              alt={image}
            />
          )}
          {images && (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 500,
                disableOnInteraction: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              className="w-full md:w-3/4"
            >
              {images.map((img, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img
                      src={`${api}/images/${img}`}
                      loading="lazy"
                      alt={img}
                      className="rounded-full  w-full object-cover shadow-lg"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-secondary">
              {title}
            </h2>
          )}
          {body && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]">
              {body}
            </p>
          )}
          {body2 && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-primary leading-relaxed w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]">
              {body2}
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {isEditing ? renderEditMode() : renderDisplayMode()}
    </div>
  );
}
