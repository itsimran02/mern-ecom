import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <XCircle className="text-red-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">
        Payment Cancelled
      </h1>
      <p className="text-gray-700 text-center max-w-md mb-6">
        Your payment was not completed. If this was a
        mistake, please try again or contact support.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CancelPage;
