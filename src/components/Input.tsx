interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
}

export function InputField({
  label,
  placeholder,
  id,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full border rounded-md p-2"
        placeholder={placeholder}
      />
    </div>
  );
}
