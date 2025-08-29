import OrganizationDashboard from "../../../../Organization/dashboard/Orgdashboard"

export default async function Page({ params }) {
  const { id } = await params  // <-- organization _id from URL
  return <OrganizationDashboard orgId={id} />
}
