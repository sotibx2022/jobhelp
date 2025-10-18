import { UserRegisterData } from "./userAuth";
export interface UserState extends UserRegisterData {
    _id: string;
    score: string;
}