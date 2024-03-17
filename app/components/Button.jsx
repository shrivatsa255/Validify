const Button = ({ classStyles, btnName, handleClick, disabled }) => (
  <button type="button" className={`bg-indigo-700 text-sm minlg:text-lg min-w-28 sm:min-w-10 py-2 px-6 minlg:px-8 font-poppins font-semibold text-white hover:scale-110 hover:bg-indigo-600 duration-100 active:scale-90 active:bg-teal-500 ${classStyles}`} onClick={handleClick} disabled={disabled}>
    {btnName}
  </button>
);

export default Button;
