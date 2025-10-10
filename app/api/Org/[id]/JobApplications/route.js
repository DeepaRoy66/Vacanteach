import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import JobApplication from '@/lib/models/JobApplication';
import Job from '@/lib/models/Job';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params; 

    if (!id) {
      return NextResponse.json({ error: 'Missing organization id' }, { status: 400 });
    }

   
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid organization ID format' }, { status: 400 });
    }

   
    const jobs = await Job.find({ org_id: id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'position jobLocation description')
      .lean();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
