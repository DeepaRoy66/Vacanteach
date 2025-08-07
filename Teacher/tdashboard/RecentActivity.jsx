
"use client";

import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card";
import { Badge } from "../../app/components/ui/badge";
import { AlertCircle, Calendar, CheckCircle, Eye, Clock } from "lucide-react";

export default function RecentActivity({ recentActivity }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                {activity.status === 'pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                {activity.status === 'scheduled' && <Calendar className="h-5 w-5 text-blue-500" />}
                {activity.status === 'received' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {activity.status === 'viewed' && <Eye className="h-5 w-5 text-purple-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <Badge variant={activity.status === 'received' ? 'default' : 'secondary'}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
