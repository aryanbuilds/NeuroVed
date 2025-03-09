'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Bell } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 ml-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#2D336B] hover:text-[#1E2245] flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span className="font-medium">Home</span>
            </Link>
            <h1 className="text-xl font-bold text-[#2D336B] ml-2">
              {activeView === "dash" && "Patient Dashboard"}
              {activeView === "ai" && "AI Doctor"}
              {activeView === "data" && "Data Analytics"}
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600 hidden md:block">
                {user?.emailAddresses[0]?.emailAddress}
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <RightBar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="ml-20 p-6 flex-1">
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-[#2D336B] mb-2">Welcome back, {user?.firstName || 'User'}</h2>
          <p className="text-[#7886C7]">
            {activeView === "dash" && "Manage your patients and appointments"}
            {activeView === "ai" && "Use AI to assist with diagnoses and treatments"}
            {activeView === "data" && "View analytics and insights about your practice"}
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="mt-6">
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
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.25m0 0v5.8a2.25 2.25 0 01-1.5 2.25m0 0a4.5 4.5 0 01-1.5.25m-4.5-9.5a2.25 2.25 0 00-1.5-2.25m1.5 2.25a4.5 4.5 0 001.5.25m7.5-3a4.5 4.5 0 00-4.5 0m4.5 0a4.5 4.5 0 01-4.5 0" />
                    </svg>
                  </span>
                  AI Doctor with Vision & Voice
                </CardTitle>
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
                  <p className="text-sm text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                    </svg>
                    Make sure the Gradio server is running at {gradioUrl}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Analytics Section */}
          {activeView === "data" && (
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </span>
                  Data Analytics
                </CardTitle>
                <CardDescription>
                  View and analyze patient data and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm transition-transform hover:scale-105">
                    <h3 className="text-lg font-semibold mb-2 text-blue-800">Total Patients</h3>
                    <p className="text-3xl font-bold text-blue-900">{patients.length}</p>
                    <p className="text-sm text-blue-600 mt-2">+2 this week</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100 shadow-sm transition-transform hover:scale-105">
                    <h3 className="text-lg font-semibold mb-2 text-purple-800">Total Reports</h3>
                    <p className="text-3xl font-bold text-purple-900">
                      {patients.reduce((sum, p) => sum + (p.reports ? p.reports.length : 0), 0)}
                    </p>
                    <p className="text-sm text-purple-600 mt-2">+5 this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-100 shadow-sm transition-transform hover:scale-105">
                    <h3 className="text-lg font-semibold mb-2 text-green-800">Total Appointments</h3>
                    <p className="text-3xl font-bold text-green-900">{appointments.length}</p>
                    <p className="text-sm text-green-600 mt-2">+3 this week</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-500 italic">No recent activity to display.</p>
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
