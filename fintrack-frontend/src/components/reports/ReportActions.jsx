import {
  FileText,
  FileSpreadsheet,
  Mail,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ReportActions({
  onPdf,
  onExcel,
  onEmail,
}) {
  return (
    <Card className="mt-8">

      <h2 className="mb-5 text-lg font-semibold text-slate-800">
        Export Reports
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <Button
          variant="secondary"
          onClick={onPdf}
          className="justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
        >
          <FileText size={18} />
          <span className="ml-2">PDF</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onExcel}
          className="justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
        >
          <FileSpreadsheet size={18} />
          <span className="ml-2">Excel</span>
        </Button>

        <Button
          variant="secondary"
          onClick={onEmail}
          className="justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
        >
          <Mail size={18} />
          <span className="ml-2">Email</span>
        </Button>

      </div>

    </Card>
  );
}