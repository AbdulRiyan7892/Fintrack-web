import { Eye, EyeOff } from "lucide-react";

function Input({
  icon,
  type,
  placeholder,
  value,
  onChange,
  showPassword,
  togglePassword,
}) {
  return (
    <div className="relative">

      <span className="absolute left-4 top-4 text-slate-400">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          py-3
          pl-12
          pr-12
          outline-none
          transition
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-200
        "
      />

      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-4 text-slate-500"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      )}
    </div>
  );
}

export default Input;