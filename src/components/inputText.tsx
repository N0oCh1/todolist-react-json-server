
interface InputTextProps {
  label?:string;
  placeholder?:string;
  type: "text" | "password" | "email" | "number";
  name: string;
}

const InputText = (props:InputTextProps) => {
const { label, placeholder, type, name } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-white">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="border-1 border-white bg-gray-800 text-white px-2 py-1 rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}

export default InputText;