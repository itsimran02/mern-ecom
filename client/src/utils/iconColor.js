const getIconColor = (color) => {
  switch (color) {
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "purple":
      return "bg-purple-500";
    case "orange":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

export default getIconColor;
