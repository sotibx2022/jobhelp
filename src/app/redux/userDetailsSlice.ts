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
    },
});
export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;