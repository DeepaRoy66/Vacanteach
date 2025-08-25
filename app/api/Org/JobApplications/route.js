import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../../lib/mongoose';
import JobApplication from '../../../../lib/models/JobApplication';
import Job from '../../../../lib/models/Job';

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const postedBy = searchParams.get('postedBy');

    if (!postedBy) {
      return NextResponse.json({ error: 'Missing postedBy parameter' }, { status: 400 });
    }

    // Find jobs posted by the organization
    const jobs = await Job.find({ postedBy }).select('_id');
    const jobIds = jobs.map(job => job._id);

    // Find applications for those jobs
    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'position jobLocation')
      .lean();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}