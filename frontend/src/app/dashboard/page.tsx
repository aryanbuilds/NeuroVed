'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, FileText, Users } from "lucide-react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2D336B]">Dashboard</h1>
          <p className="text-[#7886C7]">Welcome back, {user?.firstName || 'User'}</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Patients</CardTitle>
            <CardDescription>Total patients under your care</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <span>+2 this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Reports</CardTitle>
            <CardDescription>Pending diagnostic reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="flex items-center mt-2 text-sm text-amber-600">
              <span>3 urgent</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Analytics</CardTitle>
            <CardDescription>Treatment success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Your most recent patient consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#A9B5DF] flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">Patient #{i}</div>
                      <div className="text-sm text-gray-500">Last visit: Today</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                New Report
              </Button>
              <Button className="justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
              <Button className="justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button className="justify-start" variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
