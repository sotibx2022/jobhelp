import { SingleJobTitle, UserRegisterData } from "./userAuth";
type UserWithoutSensitive = Omit<UserRegisterData,'password'|'confirmPassword'>
export interface UserState extends UserWithoutSensitive {
    _id: string;
    jobTitles?:SingleJobTitle[]
}