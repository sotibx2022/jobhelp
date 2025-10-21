import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsUIType, ContentUIType } from "../types/roadmapTypes";
const roadmapInitialState: ContentUIType[] = [];
const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: roadmapInitialState,
  reducers: {
    setRoadMapItems: (state, action: PayloadAction<ContentUIType[]>) => {
  console.log("📝 setRoadMapItems called");
  console.log("Action payload:", action.payload);
  console.log("State before update:", state);
  const newState = action.payload;
  console.log("State after update:", newState);
  return newState;
},
    deleteRoadmapTitle: (state, action: PayloadAction<{ index: number }>) => {
      const newState = state.filter((_, i) => i !== action.payload.index);
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
      action: PayloadAction<{ titleIndex: number; subTitleIndex: number; actionTitle: string; checked: boolean }>
    ) => {
      const { titleIndex, subTitleIndex, actionTitle, checked } = action.payload;
      console.log("📝 editRoadMapSubTitle called");
      console.log("Payload:", action.payload);
      console.log("Current state at titleIndex:", state[titleIndex]);
      console.log("Current subContents at subTitleIndex:", state[titleIndex]?.subContents[subTitleIndex]);
      if (state[titleIndex]?.subContents[subTitleIndex] !== undefined) {
        state[titleIndex].subContents[subTitleIndex].actionSubTitle = actionTitle;
        state[titleIndex].subContents[subTitleIndex].checked = checked;
        console.log("Updated subContents:", state[titleIndex].subContents[subTitleIndex]);
      } else {
        console.log("⚠️ SubContent at provided indexes does not exist");
      }
      console.log("State after editRoadMapSubTitle execution:", state);
    },
    addRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; actionTitle: string }>
    ) => {
      state[action.payload.titleIndex]?.subContents.push({ actionSubTitle: action.payload.actionTitle, checked: false });
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
