import PostJobPage from "../../../../../Organization/job/Postjob";

export default async function Page({ params }) {
  const orgId = params.id; // organization _id from URL
  console.log("Organization ID:", orgId);

  return <PostJobPage orgId={orgId} />;
}
