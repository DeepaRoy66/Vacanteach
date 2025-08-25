import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongoose';
import JobApplication from '../../../lib/models/JobApplication';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const jobId = formData.get('jobId');
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const coverLetter = formData.get('coverLetter');
    const cv = formData.get('cv');

    if (!jobId || !fullName || !email || !cv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate PDF file type
    if (cv.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed for CV' }, { status: 400 });
    }

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', cv); // ImgBB API accepts PDFs as well
    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const imgbbData = await imgbbResponse.json();
    if (!imgbbResponse.ok || !imgbbData.success) {
      return NextResponse.json({ error: 'Failed to upload CV to ImgBB' }, { status: 500 });
    }

    const cvUrl = imgbbData.data.url;

    const application = new JobApplication({
      jobId,
      fullName,
      email,
      coverLetter,
      cv: cvUrl,
    });

    await application.save();

    return NextResponse.json({ 
      message: 'Application submitted successfully',
      applicationId: application._id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}