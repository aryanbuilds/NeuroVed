import { Patient } from "../dashboard/Dash";

const initialPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    reports: [
      {
        date: "2023-12-15",
        content: "Annual checkup. Blood pressure normal. Cholesterol slightly elevated."
      },
      {
        date: "2023-10-05",
        content: "Patient reported mild headaches. Recommended rest and hydration."
      }
    ],
    prescriptions: [
      {
        date: "2023-12-15",
        medication: "Lipitor",
        dosage: "10mg daily"
      }
    ],
    followups: [
      "Schedule follow-up in 3 months to check cholesterol levels."
    ]
  },
  {
    id: "P002",
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    reports: [
      {
        date: "2024-01-10",
        content: "Patient reported joint pain in knees. X-ray shows mild osteoarthritis."
      }
    ],
    prescriptions: [
      {
        date: "2024-01-10",
        medication: "Ibuprofen",
        dosage: "400mg as needed for pain"
      },
      {
        date: "2024-01-10",
        medication: "Glucosamine",
        dosage: "1500mg daily"
      }
    ],
    followups: [
      "Recommended physical therapy sessions twice weekly."
    ]
  },
  {
    id: "P003",
    name: "Robert Johnson",
    phone: "+1 (555) 456-7890",
    email: "robert.johnson@example.com",
    address: "789 Pine St, Elsewhere, USA",
    reports: [],
    prescriptions: [],
    followups: []
  },
  {
    id: "P004",
    name: "Emily Davis",
    phone: "+1 (555) 234-5678",
    email: "emily.davis@example.com",
    address: "321 Elm St, Nowhere, USA",
    reports: [
      {
        date: "2024-02-05",
        content: "Patient reported frequent migraines. Prescribed medication and recommended stress management techniques."
      }
    ],
    prescriptions: [
      {
        date: "2024-02-05",
        medication: "Sumatriptan",
        dosage: "50mg as needed for migraines"
      }
    ],
    followups: [
      "Follow up in 1 month to assess efficacy of medication."
    ]
  },
  {
    id: "P005",
    name: "Michael Wilson",
    phone: "+1 (555) 876-5432",
    email: "michael.wilson@example.com",
    address: "654 Maple Ave, Someplace, USA",
    reports: [
      {
        date: "2024-01-20",
        content: "Annual physical. All vitals normal. Recommended continued exercise regimen."
      }
    ],
    prescriptions: [],
    followups: [
      "Schedule next annual physical in January 2025."
    ]
  }
];

export default initialPatients; 