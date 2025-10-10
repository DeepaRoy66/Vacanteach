import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Users } from "lucide-react";

export default function CallToAction({ router }) {
  return (
    <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 shadow-xl rounded-2xl">
      <CardContent className="text-center py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Great Hire?
          </h2>

          {/* Subheading */}
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            Join thousands of companies using our platform to connect with top talent. 
            Post your job today and start receiving applications from qualified Applicants.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Post a Job */}
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 font-semibold rounded-xl px-6 py-3"
              onClick={() => router.push("/organization/postjob")}
            >
              <Plus className="h-5 w-5 mr-2" />
              Post a Job Now
            </Button>

            {/* Browse Talent */}
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 rounded-xl px-6 py-3"
              onClick={() => router.push("/organization/Applicants")}
            >
              <Users className="h-5 w-5 mr-2" />
              Browse Talent Pool
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
