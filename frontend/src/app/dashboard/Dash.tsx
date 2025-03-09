'use client';

import React, { useState, MouseEvent } from "react";

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  reports?: { date: string; content: string }[];
  prescriptions?: { date: string; medication: string; dosage?: string }[];
  followups?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
}

interface DashProps {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

const Dash: React.FC<DashProps> = ({ patients, setPatients, appointments, setAppointments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(patients.length > 0 ? patients[0].id : "");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // Modal states
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDate, setReportDate] = useState("");
  const [reportContent, setReportContent] = useState("");

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [prescriptionMedication, setPrescriptionMedication] = useState("");
  const [prescriptionDosage, setPrescriptionDosage] = useState("");

  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [followupContent, setFollowupContent] = useState("");

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);

  const displayedPatients =
    searchTerm.trim().length > 0 ? filteredPatients : filteredPatients.slice(0, 5);

  const handleSchedule = () => {
    if (!appointmentDate || !appointmentTime || !selectedPatient) {
      alert("Please select both a date and time for the appointment.");
      return;
    }
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString().padStart(3, "0"),
      patientId: selectedPatient.id,
      date: appointmentDate,
      time: appointmentTime,
    };
    setAppointments([...appointments, newAppointment]);
    setAppointmentDate("");
    setAppointmentTime("");
    alert("Appointment scheduled successfully!");
  };

  const handleAddReport = () => {
    if (!reportDate || !reportContent || !selectedPatient) {
      alert("Please enter a date and report content.");
      return;
    }
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? {
            ...patient,
            reports: [...(patient.reports || []), { date: reportDate, content: reportContent }],
          }
        : patient
    );
    setPatients(updatedPatients);
    alert("Report added successfully!");
    setShowReportModal(false);
    setReportDate("");
    setReportContent("");
  };

  const handleAddPrescription = () => {
    if (!prescriptionDate || !prescriptionMedication || !selectedPatient) {
      alert("Please enter a date and medication details.");
      return;
    }
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? {
            ...patient,
            prescriptions: [
              ...(patient.prescriptions || []),
              { date: prescriptionDate, medication: prescriptionMedication, dosage: prescriptionDosage },
            ],
          }
        : patient
    );
    setPatients(updatedPatients);
    alert("Prescription added successfully!");
    setShowPrescriptionModal(false);
    setPrescriptionDate("");
    setPrescriptionMedication("");
    setPrescriptionDosage("");
  };

  const handleAddFollowup = () => {
    if (!followupContent || !selectedPatient) {
      alert("Please enter followup notes.");
      return;
    }
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? { ...patient, followups: [...(patient.followups || []), followupContent] }
        : patient
    );
    setPatients(updatedPatients);
    alert("Followup added successfully!");
    setShowFollowupModal(false);
    setFollowupContent("");
  };

  const handleModalBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowReportModal(false);
      setShowPrescriptionModal(false);
      setShowFollowupModal(false);
    }
  };

  const handleSendEmail = () => {
    if (!selectedPatient) return;
    
    const emailBody = `
Prescription:
${(selectedPatient.prescriptions || [])
  .map((p) => `${p.date}: ${p.medication} ${p.dosage || ""}`)
  .join("\n")}

Reports:
${(selectedPatient.reports || [])
  .map((r) => `${r.date}: ${r.content}`)
  .join("\n")}

Followups:
${(selectedPatient.followups || []).join("\n")}
    `;
    const subject = `Clinical Summary for ${selectedPatient.name}`;
    const mailtoLink = `mailto:${selectedPatient.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  if (patients.length === 0) {
    return <div className="p-4">No patients available</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Left Sidebar */}
      <div className="p-4 border-r border-gray-200 min-w-[220px] w-auto">
        <div className="mb-6" style={{ maxHeight: "50%" }}>
          <h2 className="text-xl font-semibold mb-4">Patients</h2>
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className="space-y-2 overflow-y-auto"
            style={{ maxHeight: "calc(100% - 80px)", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {displayedPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className={`p-3 bg-white rounded-lg shadow cursor-pointer transition transform hover:scale-105 hover:bg-blue-50 ${
                  selectedPatient && selectedPatient.id === patient.id ? "border border-blue-500" : ""
                }`}
              >
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">ID: {patient.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedPatient && (
        <div className="flex flex-col flex-1 ml-4 mr-[72px] p-4 space-y-6">
          {/* Patient Details & Appointment Scheduler */}
          <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{selectedPatient.name}</h1>
                <p className="text-md">Patient ID: {selectedPatient.id}</p>
                <p className="text-sm mt-1">Phone: {selectedPatient.phone}</p>
                <p className="text-sm">Email: {selectedPatient.email}</p>
                <p className="text-sm">Address: {selectedPatient.address}</p>
              </div>
            </div>
            {/* Appointment Scheduler */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex flex-col space-y-1">
                <label className="text-sm">Date</label>
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm">Time</label>
                <input
                  type="time"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>
              <button
                onClick={handleSchedule}
                className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded transition transform hover:scale-105 hover:bg-blue-600"
              >
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-white p-4 rounded-lg shadow border flex justify-around items-center space-x-4">
            <button
              onClick={() => setShowReportModal(true)}
              className="flex flex-col items-center transition transform hover:scale-110 hover:text-blue-500"
            >
              <span className="material-icons-outlined text-2xl mb-1">note_add</span>
              <span className="text-sm">Upload Report</span>
            </button>
            <button
              onClick={() => setShowPrescriptionModal(true)}
              className="flex flex-col items-center transition transform hover:scale-110 hover:text-blue-500"
            >
              <span className="material-icons-outlined text-2xl mb-1">medication</span>
              <span className="text-sm">Prescription</span>
            </button>
            <button
              onClick={() => setShowFollowupModal(true)}
              className="flex flex-col items-center transition transform hover:scale-110 hover:text-blue-500"
            >
              <span className="material-icons-outlined text-2xl mb-1">post_add</span>
              <span className="text-sm">Followup</span>
            </button>
            <button
              onClick={() => alert("Voice recording feature coming soon!")}
              className="flex flex-col items-center transition transform hover:scale-110 hover:text-blue-500"
            >
              <span className="material-icons-outlined text-2xl mb-1">mic</span>
              <span className="text-sm">Voice Notes</span>
            </button>
            <button
              onClick={handleSendEmail}
              className="flex flex-col items-center transition transform hover:scale-110 hover:text-blue-500"
            >
              <span className="material-icons-outlined text-2xl mb-1">mail</span>
              <span className="text-sm">Send Email</span>
            </button>
          </div>

          {/* Clinical Summary */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-bold mb-2">Clinical Summary</h2>
            <p className="text-gray-700">
              This section will contain the AI-generated summary of the patient&apos;s condition and clinical recommendations.
            </p>
          </div>

          {/* Patient History Section with Four Columns */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-bold mb-4">Patient History</h2>
            <div className="flex space-x-6">
              {/* Reports */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Reports</h3>
                {(selectedPatient.reports || []).length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPatient.reports?.map((r, idx) => (
                      <li key={idx} className="p-2 border rounded shadow-sm">
                        <span className="font-medium">{r.date}:</span> {r.content}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No reports available.</p>
                )}
              </div>
              {/* Prescriptions */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Prescriptions</h3>
                {(selectedPatient.prescriptions || []).length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPatient.prescriptions?.map((p, idx) => (
                      <li key={idx} className="p-2 border rounded shadow-sm">
                        <span className="font-medium">{p.date}:</span> {p.medication}
                        {p.dosage && <span> - {p.dosage}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No prescriptions available.</p>
                )}
              </div>
              {/* Followups */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Followups</h3>
                {(selectedPatient.followups || []).length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPatient.followups?.map((f, idx) => (
                      <li key={idx} className="p-2 border rounded shadow-sm">{f}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No followups available.</p>
                )}
              </div>
              {/* Appointments */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Appointments</h3>
                {appointments
                  .filter((app) => app.patientId === selectedPatient.id)
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .length > 0 ? (
                  <ul className="space-y-2">
                    {appointments
                      .filter((app) => app.patientId === selectedPatient.id)
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((app) => (
                        <li key={app.id} className="p-2 border rounded shadow-sm">
                          <span className="font-medium">{app.date} {app.time}</span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No appointments scheduled.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showReportModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleModalBackgroundClick}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              Add Report
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Content</label>
              <textarea
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={4}
                placeholder="Enter report details..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleAddReport} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save
              </button>
              <button 
                onClick={() => setShowReportModal(false)} 
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrescriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleModalBackgroundClick}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Add Prescription
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={prescriptionDate}
                onChange={(e) => setPrescriptionDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
              <input
                type="text"
                value={prescriptionMedication}
                onChange={(e) => setPrescriptionMedication(e.target.value)}
                placeholder="Medication name/details"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage (optional)</label>
              <input
                type="text"
                value={prescriptionDosage}
                onChange={(e) => setPrescriptionDosage(e.target.value)}
                placeholder="Dosage or instructions"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleAddPrescription} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save
              </button>
              <button 
                onClick={() => setShowPrescriptionModal(false)} 
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showFollowupModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleModalBackgroundClick}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Add Followup
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Followup Notes</label>
              <textarea
                value={followupContent}
                onChange={(e) => setFollowupContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
                placeholder="Enter followup details..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleAddFollowup} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save
              </button>
              <button 
                onClick={() => setShowFollowupModal(false)} 
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dash; 