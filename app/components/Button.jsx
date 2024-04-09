
const Button = ({ classStyles, btnName, handleClick, disabled }) => (
  <button type="button" className={`bg-indigo-700 text-lg minlg:text-lg  sm:min-w-fit  cursor-pointer min-h-11 py-2 px-6 minlg:px-8 font-poppins font-semibold text-white hover:scale-105 hover:bg-indigo-600 duration-100  ${classStyles}`} onClick={handleClick} disabled={disabled}>
    {btnName}
  </button>
);

export default Button;
