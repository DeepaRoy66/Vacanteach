import PostJobPage from "../../../../../Organization/job/Postjob";

export default async function Page({ params }) {
  const { id: orgId } = await params; // await before using
  console.log("Organization ID:", orgId);

  return <PostJobPage orgId={orgId} />;
}
