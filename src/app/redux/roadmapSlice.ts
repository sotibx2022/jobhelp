import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsType, ContentType } from "../types/roadmapTypes";
const roadmapInitialState: ContentsType = [];
const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: roadmapInitialState,
  reducers: {
    setRoadMapItems: (state, action: PayloadAction<ContentsType>) => {
      return action.payload;
    },
   deleteRoadmapTitle: (state, action: PayloadAction<{ index: number }>) => {
  console.log('Current state:', JSON.parse(JSON.stringify(state)));
  console.log('Deleting index:', action.payload.index);
  const newState = state.filter((_, i) => i !== action.payload.index);
  console.log('New state after deletion:',JSON.parse(JSON.stringify(newState)) );
  return newState;
},
    editRoadMapTitle: (
      state,
      action: PayloadAction<{ index: number; actionTitle: string }>
    ) => {
      state[action.payload.index].actionTitle = action.payload.actionTitle;
    },
    addRoadMapTitle: (state, action: PayloadAction<{ actionTitle: string }>) => {
      state.push({ actionTitle: action.payload.actionTitle, subContents: [] });
    },
    deleteRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; subTitleIndex: number }>
    ) => {
      const { titleIndex, subTitleIndex } = action.payload;
      // Return new state array
      return state.map((content, i) => {
        if (i !== titleIndex) return content; // keep other items as-is
        // Filter the subContents array immutably
        const updatedSubContents = content.subContents.filter(
          (_, j) => j !== subTitleIndex
        );
        return { ...content, subContents: updatedSubContents };
      });
    },
    editRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; subTitleIndex: number; actionTitle: string }>
    ) => {
      const { titleIndex, subTitleIndex, actionTitle } = action.payload;
      if (state[titleIndex]?.subContents[subTitleIndex] !== undefined) {
        state[titleIndex].subContents[subTitleIndex] = actionTitle;
      }
    },
    addRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; actionTitle: string }>
    ) => {
      state[action.payload.titleIndex]?.subContents.push(action.payload.actionTitle);
    },
  },
});
export const {
  addRoadMapTitle,
  editRoadMapTitle,
  deleteRoadmapTitle,
  setRoadMapItems,
  deleteRoadMapSubTitle,
  editRoadMapSubTitle,
  addRoadMapSubTitle,
} = roadmapSlice.actions;
export default roadmapSlice.reducer;
