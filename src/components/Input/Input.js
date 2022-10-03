const Input = ({
  label,
  value,
  onChange,
  readOnly,
  name,
  type,
  id,
  required,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
        id={id}
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly || false}
        required={required || false}
      />
    </div>
  );
};

export default Input;
