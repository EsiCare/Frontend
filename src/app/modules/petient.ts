import Actor from "./actor";
import { SGPHType } from "./patient-history-Item";

interface HistoryItem {
    doctor: string;
    created: string,
    duration: string,
    state: SGPHType,
    reason: string,
};

interface Petient {
    actor: Actor,
    history: any,
};

export default Petient;
export {
    HistoryItem
} 