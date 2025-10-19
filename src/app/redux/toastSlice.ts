import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IToastState {
    toastType: 'success' | 'error' | 'blank' | 'info'
    message: string
}
const initialToast: IToastState = {
    toastType: 'blank',
    message: ''
}
const toastSlice = createSlice({
    name: 'toast',
    initialState: initialToast,
    reducers: {
        setToast: (state: IToastState, action: PayloadAction<IToastState>) => {
            state.toastType = action.payload.toastType;
            state.message = action.payload.message;
        }
    }
})
export const {setToast} = toastSlice.actions;
export default toastSlice.reducer