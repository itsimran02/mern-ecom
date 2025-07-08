const PopUp = ({ onConfirm, onCancel }) => {
  return (
    <div className=" inset-0 flex items-center justify-center  z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
