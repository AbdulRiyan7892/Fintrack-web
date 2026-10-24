import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold text-slate-800">
        Quick Actions
      </h2>

      <div className="space-y-4">

        <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/transactions?new=income")}
        >
            + Add Income
        </Button>

        <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/transactions?new=expense")}
        >
            + Add Expense
        </Button>

        <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/budget?new=true")}
        >
            + Create Budget
        </Button>

      </div>
    </Card>
  );
}