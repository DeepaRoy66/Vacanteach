import TeacherDashboard from "../../../../Teacher/tdashboard/Teacherdashboard"


export default async function Page({ params }) {
  const { id } = await params  // <-- organization _id from URL
  return <TeacherDashboard teacherId={id} />
}
