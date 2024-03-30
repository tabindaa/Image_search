const Button = ({ label, handleButtonClick }) => {
  return (
    <button
      className="w-24 mx-2 p-2 rounded bg-indigo-200 text-slate-700"
      onClick={() => handleButtonClick(label)}
    >
      {label}
    </button>
  );
};
export default Button;
