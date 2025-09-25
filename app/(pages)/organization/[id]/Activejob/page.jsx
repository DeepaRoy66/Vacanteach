import ActiveJobs from "../../../../../Organization/ActiveJob/Activejob"

export default function Page({ params }) {
  const { id } = params // ✅ "id" comes from [id] folder name in your route
  return <ActiveJobs orgId={id} />
}
