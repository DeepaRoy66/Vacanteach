import Applicants from "../../../../../Organization/Applicants/Applicants";


export default function Page({ params }) {
  const { id } = params; // org ID from URL
  return <Applicants orgId={id} />;
}
