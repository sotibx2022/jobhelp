import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IScoreState {
  scoreValue: number;
}
const initialScore: IScoreState = {
  scoreValue: 0,
};
const profileScoreSlice = createSlice({
  name: "profileScore",
  initialState: initialScore,
  reducers: {
    setScoreValue: (state, action: PayloadAction<number>) => {
      state.scoreValue = action.payload;
    },
  },
});
export const { setScoreValue } = profileScoreSlice.actions;
export default profileScoreSlice.reducer;
