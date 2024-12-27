type SGPHType = "Pending" | "Failed" | "Completed"; 


export default interface PatientHistoryItem {
  id?: number | null;
  nss?: string | null;
  name?: string | null;
  gender?: string | null;
  address?: string | null;
  entered_at?: string | null;
  dateOfBirth ?:  string | null;
  email ?:  string | null;
  emergencyContactName ?:  string | null;
  emergencyContactPhone ?:  string | null;
  phoneNumber ?:  string | null;
}


export type {
    SGPHType
}