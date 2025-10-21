import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsUIType, ContentUIType } from "../types/roadmapTypes";
const roadmapInitialState: ContentUIType[] = [];
const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: roadmapInitialState,
  reducers: {
    setRoadMapItems: (state, action: PayloadAction<ContentUIType[]>) => {
      return action.payload;
    },
    deleteRoadmapTitle: (state, action: PayloadAction<{ index: number }>) => {
      return state.filter((_, i) => i !== action.payload.index);
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
      return state.map((content, i) => {
        if (i !== titleIndex) return content;
        const updatedSubContents = content.subContents.filter(
          (_, j) => j !== subTitleIndex
        );
        return { ...content, subContents: updatedSubContents };
      });
    },
    editRoadMapSubTitle: (
      state,
      action: PayloadAction<{
        titleIndex: number;
        subTitleIndex: number;
        actionTitle: string;
        checked: boolean;
      }>
    ) => {
      const { titleIndex, subTitleIndex, actionTitle, checked } = action.payload;
      if (state[titleIndex]?.subContents[subTitleIndex] !== undefined) {
        state[titleIndex].subContents[subTitleIndex].actionSubTitle = actionTitle;
        state[titleIndex].subContents[subTitleIndex].checked = checked;
      }
    },
    addRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; actionTitle: string }>
    ) => {
      state[action.payload.titleIndex]?.subContents.push({
        actionSubTitle: action.payload.actionTitle,
        checked: false,
      });
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
