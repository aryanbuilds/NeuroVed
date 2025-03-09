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
  },
  {
    id: "006",
    patientId: "P005",
    date: "2024-03-23",
    time: "16:00"
  },
  {
    id: "007",
    patientId: "P006",
    date: "2024-03-24",
    time: "17:00"
  },
  {
    id: "008",
    patientId: "P007",
    date: "2024-03-25",
    time: "18:00"
  },
  {
    id: "009",
    patientId: "P008",
    date: "2024-03-26",
    time: "19:00"
  }
];

export default appointmentsData;
export type { Appointment };