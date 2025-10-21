import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegisterData } from "../types/userAuth";
import { UserState } from "../types/userState";
interface UserSliceState {
    user: UserState | null;
}
const initialState: UserSliceState = {
    user: null,
};
const userDetailsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
        },
        clearUserDetails: (state) => {
            state.user = null;
        },
        addJobTitle: (state: UserSliceState, action: PayloadAction<{ jobTitle: string }>) => {
            state.user?.jobTitles?.push(action.payload.jobTitle)
        },
        updateUserScore: (state: UserSliceState, action: PayloadAction<{ score: number }>) => {
            if (state.user) {
                state.user.score = action.payload.score
            }
        }
    },
});
export const { setUserDetails, clearUserDetails,addJobTitle,updateUserScore } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;