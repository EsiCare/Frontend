import Actor from "./actor";
import { SGPHType } from "./patient-history-Item";

interface HistoryItem {
    date  : string;
    doctor  : string;
    id  : string;
    lastedFor  : string;
    patient  : string;
    reason  : string;
    resume  : string;
};


interface TestItem {
    id: number;
    issueDate: string;
    conductionDate: string;
    status: "pending";
    resume: string;
    description: string;
    title: string;
    priorite: string;
    mesurements: {};
    patient: number;
    medicalCondition: number;
}

interface Patient {
    actor: Actor,
    history: any,
};

export default Patient;
export {
    HistoryItem,
    TestItem
} 