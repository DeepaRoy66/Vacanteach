import JobListPage from "../../../../../Organization/job/Jobpage";


export default async function Page({ params }) {
  // Await the params before using its properties
  const { id } = await params;
  const orgId = id; // organization _id from URL
  
  console.log("Organization ID:", orgId);

  return <JobListPage orgId={orgId} />;
}