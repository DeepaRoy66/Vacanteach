import OrganizationDashboard from "../../../../Organization/dashboard/Orgdashboard"

export default async function Page({ params }) {
  const { id } = await params  
  return <OrganizationDashboard orgId={id} />
}
