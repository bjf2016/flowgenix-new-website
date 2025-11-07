export const revalidate = 60;

export const metadata = {
  title: "Dentist Intake Bot Demo",
  description: "Sample intake flow: capture name, phone, reason, and preferred time window.",
  openGraph: { title: "Dentist Intake Bot Demo" }
};

export default function Page() {
  return (
    <main className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold tracking-tight">Dentist Intake Bot — Demo</h1>
      <p className="mt-2 text-muted-foreground">
        This demo will capture name, phone, reason for visit, and a preferred time window.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="Jane Patel" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="(555) 555-1234" />
        </div>
        <div>
          <label className="block text-sm font-medium">Reason for visit</label>
          <select className="mt-1 w-full rounded-md border px-3 py-2">
            <option>New patient exam</option>
            <option>Clear aligner consult</option>
            <option>Cleaning</option>
            <option>Emergency / pain</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Preferred time window</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="e.g., Tue–Thu, 9–11am" />
        </div>

        <button className="rounded-md px-4 py-2 bg-gray-300 cursor-not-allowed" disabled>
          Connect to Live Bot (coming next)
        </button>

        <p className="text-xs text-muted-foreground">
          Next step will wire this to Retell AI + n8n for an instant call-back.
        </p>
      </form>
    </main>
  );
}
