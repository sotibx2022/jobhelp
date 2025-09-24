import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IState {
    jobTitle: string
}
interface IjobActionPayload {
    jobTitle: string
}
const initialState: IState = {
    jobTitle: '',
}
const jobdetailsSlice = createSlice({
    name: 'jobDetails',
    initialState,
    reducers: {
        addJobDetails: (state: IState, action: PayloadAction<IjobActionPayload>) => {
            state.jobTitle = action.payload.jobTitle
        },
        setJobDetails:(state:IState,action:PayloadAction<IjobActionPayload>)=>{
        state.jobTitle=action.payload.jobTitle
    },
        removeJobDetails: (state: IState, action) => {
            state.jobTitle === ''
        }
    }
})
export const { addJobDetails, removeJobDetails,setJobDetails } = jobdetailsSlice.actions;
export default jobdetailsSlice.reducer