import React from "react";
import { Card, CardContent } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Plus, Users } from "lucide-react";

export default function CallToAction({ router }) {
  return (
    <Card className="bg-gradient-to-r from-green-600 to-green-600 text-white border-0">
      <CardContent className="text-center py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Great Hire?</h2>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            Join thousands of companies using our platform to connect with top talent. Post your job today and
            start receiving applications from qualified candidates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 font-semibold"
              onClick={() => router.push("/organization/postjob")}
            >
              <Plus className="h-5 w-5 mr-2" />
              Post a Job Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
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