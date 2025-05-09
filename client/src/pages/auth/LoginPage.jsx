import { Link } from "react-router-dom";
import CommonForm from "../../components/ui/Form";
import { LoginFormControls } from "../../config";
import { useState } from "react";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../../store/auth-slice";

const formState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(formState);
  const handlSubmit = () => {
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload.message);
      } else {
        toast.error(data.payload);
      }
    });
  };

  return (
    <div className="py-12 px-6 border-[#dededf] border-2 w-full">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-4xl text-center font-main font-bold">
            Login to your account
          </h1>
          <p className="text-center">
            Dont have an account ?{" "}
            <Link to="/auth/register"> Register</Link>
          </p>
        </div>
        <CommonForm
          FormControls={LoginFormControls}
          buttonText={"Login"}
          handlSubmit={handlSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default LoginPage;
