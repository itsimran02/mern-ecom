import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userName, email } = useSelector(
    (state) => state.auth.user
  );
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res?.data?.message);
        window.location.href = "/auth/login";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <Toaster />
      <div className="flex items-center justify-center flex-col gap-2 mt-4">
        <div>
          <div className="size-[60px]">
            <img src="data:image/png;base64,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" />{" "}
          </div>
          <h2 className=" text-center font-bold ">
            {userName}
          </h2>
        </div>
        <p className="">{email}</p>
        <button
          onClick={handleLogout}
          className="cursor-pointer px-[20px] py-[10px] bg-black text-white rounded-xl hover:bg-gray-900 active:scale-95 transition-all ease-out"
        >
          logOut
        </button>
      </div>
    </section>
  );
};

export default Profile;
