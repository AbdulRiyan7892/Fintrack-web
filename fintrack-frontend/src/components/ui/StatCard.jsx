import Card from "./Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color="text-slate-900"
}) {
  return (
    <Card className="flex justify-between items-start">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className={`mt-2 text-2xl font-semibold ${color}`}>
          {value}
        </h2>

        {subtitle && (
          <p className="text-sm text-gray-400 mt-3">
            {subtitle}
          </p>
        )}

      </div>

      {icon && (
        <div className="rounded-lg bg-slate-100 p-3 text-slate-500">
          {icon}
        </div>
      )}

    </Card>
  );
}