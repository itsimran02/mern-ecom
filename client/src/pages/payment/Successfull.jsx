import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessfullPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-center max-w-md mb-6">
        Thank you for your purchase. Your payment was
        processed successfully. You’ll receive a
        confirmation email shortly.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessfullPage;
