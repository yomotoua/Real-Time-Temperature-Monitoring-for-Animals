import Link from "next/link";

export default function ModifyPage() {
  return (
    <div className="font-sans p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">How to Modify Animal Data</h1>

      <p className="mb-4">
        You can manage all animals and temperature readings directly through the Django Admin interface.
        This is the recommended method during development and testing.
      </p>

      <div className="mb-6 text-sm">
        <h2 className="font-semibold mb-2">Steps:</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open your browser and go to: <code>http://127.0.0.1:8000/admin</code></li>
          <li>Log in using your admin credentials (e.g., <strong>admin1 / 1</strong>)</li>
          <li>To add or edit animals, click on <strong>Animals</strong></li>
          <li>To inspect or clear temperature readings, click on <strong>Temperature readings</strong></li>
        </ol>
      </div>

      <p className="mb-6 text-sm">
        You can add, rename, or delete animals, and monitor or reset their data with full control via the admin panel.
      </p>

    </div>
  );
}
