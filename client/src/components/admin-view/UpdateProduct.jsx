import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BASE_API_URL } from "../../config/apiConfig";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
  });

  const handlesSubmit = async () => {
    if (
      !updateData.name ||
      !updateData.price ||
      !updateData.description
    ) {
      return toast.error("Please fill all fields");
    }
    const formData = new FormData();
    formData.append("name", updateData.name);
    formData.append("price", updateData.price);
    formData.append("description", updateData.description);

    updateData.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${BASE_API_URL}/admin/updateproduct/${productId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return toast.success(res.data.message);
      }
    } catch (error) {
      return toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <Toaster />
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Update Product
      </h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            value={updateData.name}
            onChange={(e) => {
              setUpdateData((state) => ({
                ...state,
                name: e.target.value,
              }));
            }}
            type="text"
            placeholder="Product Name"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Price
          </label>
          <input
            value={updateData.price}
            onChange={(e) => {
              setUpdateData((state) => ({
                ...state,
                price: e.target.value,
              }));
            }}
            type="number"
            placeholder="Product Price"
            id="price"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Description
          </label>
          <textarea
            value={updateData.description}
            onChange={(e) => {
              setUpdateData((state) => ({
                ...state,
                description: e.target.value,
              }));
            }}
            id="description"
            name="description"
            placeholder="Product description"
            className="w-full p-3 bg-transparent border border-gray-300 rounded-md outline-none resize-none min-h-[120px] focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            placeholder="Product Images"
            onChange={(e) => {
              setUpdateData((state) => ({
                ...state,
                images: [
                  ...state.images,
                  ...Array.from(e.target.files),
                ],
              }));
            }}
            className="mt-1 rounded bg-gray-600 text-white p-3 cursor-pointer"
          />

          {updateData.images.length >= 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {updateData.images.map((image, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img
                    className="object-cover w-full h-20"
                    src={URL.createObjectURL(image)}
                    onLoad={() =>
                      URL.revokeObjectURL(
                        URL.createObjectURL(image)
                      )
                    }
                    alt={`preview-${i}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handlesSubmit}
        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-center flex justify-center"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          " Save Changes "
        )}
      </button>
    </div>
  );
};

export default UpdateProduct;
