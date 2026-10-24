import Button from "../ui/Button";

function EmailPreferenceCard({
    frequency,
    setFrequency,
    onSave
}) {

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
                Notification Preferences
            </h2>

            <p className="mt-1 mb-6 text-sm text-slate-500">
                Receive automatic financial reports by email.
            </p>

            <select
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            >
                <option value="NONE">None</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
            </select>

            <div className="mt-5">
                <Button onClick={onSave}>
                    Save Preferences
                </Button>
            </div>

        </div>
    );
}

export default EmailPreferenceCard;