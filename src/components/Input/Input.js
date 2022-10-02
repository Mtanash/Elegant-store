const Input = ({ label, value, onChange, readOnly, name, type, id }) => {
  return (
    <div className="flex gap-1 w-full items-center">
      <label className="font-semibold flex-[0.2]" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full p-2 py-3 flex-[0.8] text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue border-opacity-50 transition-colors"
        id={id}
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly || false}
      />
    </div>
  );
};

export default Input;
