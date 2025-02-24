import { useSelector } from "react-redux";

const CommonForm = ({
  FormControls,
  buttonText,
  formData,
  setFormData,
  handlSubmit,
}) => {
  const { isLoading } = useSelector((state) => state.auth);

  let element = null;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const renderInput = (getControls) => {
    switch (getControls.componentType) {
      case "input":
        element = (
          <input
            value={formData[getControls.name] || ""}
            name={getControls.name}
            onChange={handleChange}
            type={getControls.type}
            placeholder={getControls.placeholder}
            id={getControls.name}
            required="true"
            className="outline-0 border-2  border-black py-2 px-3 text-[#07271e] mt-3 transition-all ease-in 0.3s"
          />
        );
        break;
      case "sleect":
        element = <select />;
        break;
      default:
        element = (
          <input
            name={getControls.name}
            onChange={handleChange}
            type={getControls.type}
            placeholder={getControls.placeholder}
            id={getControls.name}
            required="true"
            className="outline-0 border-2  border-black py-2 px-3 text-[#07271e] mt-3"
          />
        );
    }

    return element;
  };

  return (
    <form className="flex flex-col">
      <div className="flex flex-col">
        {FormControls.map((formItems, i) => (
          <div className="flex flex-col mb-6" key={i}>
            <label htmlFor={formItems.name}>
              {formItems.label}
            </label>
            {renderInput(formItems)}
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();

            handlSubmit();
          }}
          type="submit"
          className={` ${
            isLoading ? "bg-[#3d3d3d]" : "bg-black"
          } text-lg py-2 px-6 mt-8 cursor-pointer  text-white hover:bg-[#3d3d3d] transition-all ease-in active:scale-95 `}
        >
          {isLoading ? "Loading..." : buttonText}
        </button>
      </div>
    </form>
  );
};

export default CommonForm;
