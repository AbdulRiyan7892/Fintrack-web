import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ReportSummary from "../../components/reports/ReportSummary";
import ReportActions from "../../components/reports/ReportActions";

import Card from "../../components/ui/Card";

import {
  downloadPdf,
  downloadExcel,
  emailReport,
  getMonthlyReport,
} from "../../api/reportApi";

function Reports() {
  const currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, [month, year]);

  const loadReport = async () => {
    try {
      setLoading(true);

      const response = await getMonthlyReport(month, year);

      setReport(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const handlePdf = async () => {
    try {
      const response = await downloadPdf(month, year);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `MonthlyReport-${month}-${year}.pdf`;

      link.click();

      toast.success("PDF Downloaded");
    } catch (error) {
      console.error(error);
      toast.error("PDF Download Failed");
    }
  };

  const handleExcel = async () => {
    try {
      const response = await downloadExcel(month, year);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `MonthlyReport-${month}-${year}.xlsx`;

      link.click();

      toast.success("Excel Downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Excel Download Failed");
    }
  };

  const handleEmail = async () => {
    try {
      const response = await emailReport(month, year);

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Email Failed"
      );
    }
  };

  return (
    <div className="space-y-7">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-medium text-blue-600">
            Reports
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-slate-900">
            Financial Reports
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Analyze, export and share your monthly financial reports.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={month}
            onChange={(e) =>
              setMonth(Number(e.target.value))
            }
            className="h-11 rounded-lg border border-gray-300 bg-white px-4"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) =>
              setYear(Number(e.target.value))
            }
            className="h-11 rounded-lg border border-gray-300 bg-white px-4"
          >
            {[2025, 2026, 2027, 2028, 2029].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="space-y-6">

          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-gray-200"
              />
            ))}

          </div>

        </div>

      ) : (

        <>

          <ReportSummary report={report} />

          <Card>

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  Monthly Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Summary for {month}/{year}
                </p>

              </div>

              <div
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  report?.totalSavings >= 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {report?.totalSavings >= 0
                  ? "Positive Cash Flow"
                  : "Negative Cash Flow"}
              </div>

            </div>

          </Card>

          <ReportActions
            onPdf={handlePdf}
            onExcel={handleExcel}
            onEmail={handleEmail}
          />

        </>

      )}

    </div>
  );
}

export default Reports;