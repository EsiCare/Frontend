export default interface HospitalInfo {
  id: string;
  name: string;
}

interface HospitalStat {
  doctor_count: number;
  nurse_count: number;
  administrative_count: number;
  radiologist_count: number;
  laborantin_count: number;
}

interface WorkerInfo {
  SSN: string;
  dateAdded: string;
  email: string;
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export {
  HospitalStat,
  WorkerInfo,
}