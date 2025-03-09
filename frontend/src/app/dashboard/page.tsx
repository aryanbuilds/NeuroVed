'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dash, { Patient, Appointment } from './Dash';
import RightBar from './RightBar';
import initialPatients from "../data/patients";
import appointmentsData from "../data/appointments";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [gradioUrl, setGradioUrl] = useState("http://localhost:7860"); // Default Gradio URL
  
  // State for patients and appointments
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData);
  const [activeView, setActiveView] = useState<"dash" | "ai" | "data">("dash");

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 ml-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#2D336B] hover:text-[#1E2245] flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span className="font-medium">Home</span>
            </Link>
            <h1 className="text-xl font-bold text-[#2D336B]">
              {activeView === "dash" && "Patient Dashboard"}
              {activeView === "ai" && "AI Doctor"}
              {activeView === "data" && "Data Analytics"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {user?.emailAddresses[0]?.emailAddress}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <RightBar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="ml-20 p-6">
        <div className="mb-4">
          <p className="text-[#7886C7]">Welcome back, {user?.firstName || 'User'}</p>
        </div>

        {/* Dashboard Content */}
        <div className="mt-4">
          {/* Patient Management Section */}
          {activeView === "dash" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <Dash 
                  patients={patients} 
                  setPatients={setPatients} 
                  appointments={appointments} 
                  setAppointments={setAppointments} 
                />
              </div>
            </div>
          )}
          
          {/* AI Doctor Section */}
          {activeView === "ai" && (
            <Card>
              <CardHeader>
                <CardTitle>AI Doctor with Vision & Voice</CardTitle>
                <CardDescription>
                  Speak your symptoms and upload images for AI-powered medical analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[700px] overflow-hidden">
                  <iframe 
                    src={gradioUrl} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="AI Doctor"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-sm text-gray-500">
                    Note: Make sure the Gradio server is running at {gradioUrl}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Analytics Section */}
          {activeView === "data" && (
            <Card>
              <CardHeader>
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>
                  View and analyze patient data and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2">Total Patients</h3>
                    <p className="text-3xl font-bold">{patients.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2">Total Reports</h3>
                    <p className="text-3xl font-bold">
                      {patients.reduce((sum, p) => sum + (p.reports ? p.reports.length : 0), 0)}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
                    <p className="text-3xl font-bold">{appointments.length}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <p className="text-gray-500">No recent activity to display.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
