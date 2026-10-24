import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "text-slate-900",
}) {
  return (
    <Card className="flex items-center justify-between">

      <div>

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h2 className={`mt-2 text-3xl font-semibold ${color}`}>
          {value}
        </h2>

        {subtitle && (
          <p className="mt-2 text-xs text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      <div className="text-slate-400">

        {icon}

      </div>

    </Card>
  );
}