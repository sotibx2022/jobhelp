import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleJobTitle, UserRegisterData } from "../types/userAuth";
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
        setJobTitles: (state: UserSliceState, action: PayloadAction<SingleJobTitle>) => {
            state.user?.jobTitles?.map((item: SingleJobTitle, index) => {
                if (item.title === action.payload.title) {
                    return item.score = action.payload.score
                } else {
                    state.user?.jobTitles?.push({ title: action.payload.title, score: action.payload.score })
                }
            })
        }
    },
});
export const { setUserDetails, clearUserDetails, setJobTitles } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;