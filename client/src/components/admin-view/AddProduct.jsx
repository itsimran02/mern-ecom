import { useState } from "react";
import { Upload, Plus, Loader2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    brand: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter(
      (_, i) => i !== index
    );

    URL.revokeObjectURL(imagePreviews[index]);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error("Valid price is required");
      return false;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (images.length === 0) {
      toast.error("At least one image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Product added successfully!");
      }

      setFormData({
        name: "",
        price: "",
        category: "",
        subCategory: "",
        description: "",
        brand: "",
      });
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600">
          Fill in the details below to add a new product to
          your store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Basic Information */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Product Price *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Clothing"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subCategory"
                className="text-sm font-medium text-gray-700"
              >
                Sub Category
              </label>
              <input
                id="subCategory"
                name="subCategory"
                type="text"
                value={formData.subCategory}
                onChange={handleInputChange}
                placeholder="e.g., Smartphones, T-shirts"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Enter brand name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Product Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product in detail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
              required
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Product Images
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="images"
                className="text-sm font-medium text-gray-700"
              >
                Upload Images * (Max 5 images)
              </label>
              <div className="relative">
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <Upload
                    className="text-gray-400 mb-2"
                    size={24}
                  />
                  <span className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG up to 10MB each
                  </span>
                </label>
              </div>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div className="aspect-square overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={16}
                />
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
