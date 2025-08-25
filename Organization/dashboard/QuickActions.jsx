import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Plus, Users, FileText,BarChart3 } from "lucide-react";

export default function QuickActions({ router }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Manage your recruitment process efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent"
            onClick={() => router.push("/organization/postjob")}
          >
            <Plus className="h-5 w-5" />
            Post New Job
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
            <Users className="h-5 w-5" />
            Browse Candidates
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
            <FileText className="h-5 w-5" />
            View Applications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}