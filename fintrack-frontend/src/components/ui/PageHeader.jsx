export default function PageHeader({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}