const CustomButton = ({ children, ...props }) => {
  return (
    <button
      className="border border-solid disabled:bg-gray-200 disabled:text-gray-400 bg-gray-500 text-white  rounded-md py-2 px-4"
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
