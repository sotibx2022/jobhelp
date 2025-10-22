import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsUIType, ContentUIType } from "../types/roadmapTypes";
interface RoadMapState {
  jobTitle: string, roadmapContents: ContentUIType[]
}
const roadmapInitialState: RoadMapState = { jobTitle: '', roadmapContents: [] };
const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: roadmapInitialState,
  reducers: {
    setRoadMapItems: (state, action: PayloadAction<RoadMapState>) => {
      return action.payload;
    },
    deleteRoadmapTitle: (state, action: PayloadAction<{ index: number }>) => {
      return {
        ...state,
        roadmapContents: state.roadmapContents.filter(
          (_, i) => i !== action.payload.index
        ),
      };
    },
    editRoadMapTitle: (
      state,
      action: PayloadAction<{ index: number; actionTitle: string }>
    ) => {
      state.roadmapContents[action.payload.index].actionTitle = action.payload.actionTitle;
    },
    addRoadMapTitle: (state, action: PayloadAction<{ actionTitle: string }>) => {
      state.roadmapContents.push({ actionTitle: action.payload.actionTitle, subContents: [] });
    },
    deleteRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; subTitleIndex: number }>
    ) => {
      const { titleIndex, subTitleIndex } = action.payload;
      state.roadmapContents = state.roadmapContents.map((content, i) => {
        if (i !== titleIndex) return content;
        return {
          ...content,
          subContents: content.subContents.filter(
            (_, j) => j !== subTitleIndex
          ),
        };
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
      if (state.roadmapContents[titleIndex]?.subContents[subTitleIndex] !== undefined) {
        state.roadmapContents[titleIndex].subContents[subTitleIndex].actionSubTitle = actionTitle;
        state.roadmapContents[titleIndex].subContents[subTitleIndex].checked = checked;
      }
    },
    addRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; actionTitle: string }>
    ) => {
      state.roadmapContents[action.payload.titleIndex]?.subContents.push({
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
