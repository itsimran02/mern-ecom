import { Link } from "react-router-dom";
import CommonForm from "../../components/ui/Form";
import { RegisterFormControls } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import toast from "react-hot-toast";

const formState = {
  userName: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const disptach = useDispatch();

  const [formData, setFormData] = useState(formState);
  const handlSubmit = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.userName
    ) {
      return toast.error("Please fill all fields");
    }

    disptach(registerUser(formData)).then((data) => {
      if (data?.payload?.data?.success) {
        toast.success(data?.payload.data.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-4xl text-center font-main font-bold">
          Register your account
        </h1>
        <p className="text-center ">
          Already have an account ?{" "}
          <Link to="/auth/login"> Login</Link>
        </p>
      </div>
      <CommonForm
        handlSubmit={handlSubmit}
        FormControls={RegisterFormControls}
        buttonText={"Register"}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default RegisterPage;
