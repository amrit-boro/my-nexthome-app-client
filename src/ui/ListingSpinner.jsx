const ListingSpinner = ({
  size = 8,
  color = "blue-500",
  centered = false,
  className = "",
}) => {
  const spinner = (
    <div
      className={`w-${size} h-${size} border-4 border-t-${color} border-gray-200 rounded-full animate-spin`}
    ></div>
  );

  if (centered) {
    return (
      <div className={`flex justify-center items-center my-4 ${className}`}>
        {spinner}
      </div>
    );
  }

  return (
    <div className={`flex justify-center my-4 ${className}`}>{spinner}</div>
  );
};

export default ListingSpinner;
