import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentsUIType, ContentUIType } from "../types/roadmapTypes";
import { createRoadMapState } from "../(pages)/_components/roadmap/useFetchRoadMapItems";
export interface RoadMapState {
  jobTitle: string, roadMapContents: ContentUIType[]
}
const roadmapInitialState: RoadMapState = { jobTitle: '', roadMapContents: [] };
const roadmapSlice = createSlice({
  name: "roadmap",
  initialState: roadmapInitialState,
  reducers: {
    setRoadMapItems: (state, action: PayloadAction<RoadMapState>) => {
      return action.payload;
    },
    clearRoadMapItems: (state) => {
      return createRoadMapState()
    },
    deleteRoadmapTitle: (state, action: PayloadAction<{ index: number }>) => {
      return {
        ...state,
        roadMapContents: state.roadMapContents.filter(
          (_, i) => i !== action.payload.index
        ),
      };
    },
    editRoadMapTitle: (
      state,
      action: PayloadAction<{ index: number; actionTitle: string }>
    ) => {
      state.roadMapContents[action.payload.index].actionTitle = action.payload.actionTitle;
    },
    addRoadMapTitle: (state, action: PayloadAction<{ actionTitle: string }>) => {
      state.roadMapContents.push({ actionTitle: action.payload.actionTitle, subContents: [] });
    },
    deleteRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; subTitleIndex: number }>
    ) => {
      const { titleIndex, subTitleIndex } = action.payload;
      state.roadMapContents = state.roadMapContents.map((content, i) => {
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
      if (state.roadMapContents[titleIndex]?.subContents[subTitleIndex] !== undefined) {
        state.roadMapContents[titleIndex].subContents[subTitleIndex].actionSubTitle = actionTitle;
        state.roadMapContents[titleIndex].subContents[subTitleIndex].checked = checked;
      }
    },
    addRoadMapSubTitle: (
      state,
      action: PayloadAction<{ titleIndex: number; actionTitle: string }>
    ) => {
      state.roadMapContents[action.payload.titleIndex]?.subContents.push({
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
  clearRoadMapItems
} = roadmapSlice.actions;
export default roadmapSlice.reducer;
