import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleJobTitle, UserRegisterData } from "../types/userAuth";
import { UserState } from "../types/userState";
export interface UserSliceState {
    user: UserState | null;
    initialized: boolean,
}
const initialState: UserSliceState = {
    user: null,
    initialized: false
};
const userDetailsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
            state.initialized = true;
        },
        clearUserDetails: (state) => {
            state.user = null;
            state.initialized = false
        },
        setJobTitles: (state: UserSliceState, action: PayloadAction<SingleJobTitle>) => {
            state.user?.jobTitles?.map((item: SingleJobTitle, index) => {
                if (item.title === action.payload.title) {
                    return item.score = action.payload.score
                } else {
                    state.user?.jobTitles?.push({ title: action.payload.title, score: action.payload.score })
                }
            })
            state.initialized = true
        },
        userInitialized: (state) => {
            state.initialized = true
        }
    },
});
export const { setUserDetails, clearUserDetails, setJobTitles, userInitialized } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;