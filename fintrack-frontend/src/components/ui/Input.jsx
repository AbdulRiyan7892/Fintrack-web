export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          h-11
          px-4
          rounded-lg
          border
          border-gray-300
          bg-white
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          transition
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}