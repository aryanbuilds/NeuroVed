import { Appointment } from "../dashboard/Dash";

const appointmentsData: Appointment[] = [
  {
    id: "001",
    patientId: "P001",
    date: "2024-03-15",
    time: "09:30"
  },
  {
    id: "002",
    patientId: "P002",
    date: "2024-03-16",
    time: "14:00"
  },
  {
    id: "003",
    patientId: "P004",
    date: "2024-03-10",
    time: "11:15"
  },
  {
    id: "004",
    patientId: "P001",
    date: "2024-04-20",
    time: "10:00"
  },
  {
    id: "005",
    patientId: "P003",
    date: "2024-03-22",
    time: "15:30"
  }
];

export default appointmentsData;
export type { Appointment }; 