import mongoose, { Schema, Document, Model } from "mongoose";
import {
  ContentUIType,
  IRoadMapContentsDBType,
  SingleRoadMapSubContent,
} from "../types/roadmapTypes";
interface SingleRoadMapSubContentDocs extends SingleRoadMapSubContent {
  actionSubTitle: string;
  checked: boolean;
}
interface ContentUISchemaDocs extends ContentUIType {
  actionTitle: string;
  subContents: SingleRoadMapSubContentDocs[];
}
interface IRoadMapContentsDBDoc extends IRoadMapContentsDBType, Document {}
// ✅ Subschemas
const singleRoadMapSubContentSchema = new Schema<SingleRoadMapSubContentDocs>({
  actionSubTitle: { type: String, required: true },
  checked: { type: Boolean, default: false },
});
const contentUISchema = new Schema<ContentUISchemaDocs>({
  actionTitle: { type: String, required: true },
  subContents: [singleRoadMapSubContentSchema],
});
// ✅ Main schema
const roadmapSchema = new Schema<IRoadMapContentsDBDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobTitle: { type: String, required: true },
    roadMapContents: [contentUISchema],
  },
  { timestamps: true } // optional but recommended
);
// ✅ Model
const RoadMapModel: Model<IRoadMapContentsDBDoc> =
  mongoose.models.RoadMap || mongoose.model<IRoadMapContentsDBDoc>("RoadMap", roadmapSchema);
export { RoadMapModel };
