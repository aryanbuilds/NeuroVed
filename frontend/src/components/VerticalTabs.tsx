import { useState } from 'react';
import DashboardContent from './DashboardContent';
import PatientReports from './PatientReports';
import AIAssistance from './AIAssistance';
import OverallReports from './OverallReports';

const tabs = [
  { name: 'Dashboard', content: <DashboardContent /> },
  { name: 'Patient Reports', content: <PatientReports /> },
  { name: 'AI Assistance', content: <AIAssistance /> },
  { name: 'Overall Reports', content: <OverallReports /> },
];

export default function VerticalTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex md:flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-4 text-left w-full ${activeTab === index ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'} hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={() => setActiveTab(index)}
            aria-selected={activeTab === index}
            role="tab"
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4 w-full md:w-3/4" role="tabpanel">
        {tabs[activeTab].content}
      </div>
    </div>
  );
} 