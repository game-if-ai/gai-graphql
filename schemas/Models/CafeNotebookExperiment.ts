import * as mongoose from "mongoose";
import {
  NotebookExperimentModel,
  NotebookExperimentSchema,
} from "./ExperimentBase";

import { GraphQLFloat, GraphQLInputObjectType } from "graphql";
const Schema = mongoose.Schema;

export const CafeSummaryInputType = new GraphQLInputObjectType({
  name: "CafeSummaryInputType",
  fields: () => ({
    lowAccuracy: { type: GraphQLFloat },
    highAccuracy: { type: GraphQLFloat },
    averageAccuracy: { type: GraphQLFloat },
    averagePrecision: { type: GraphQLFloat },
    averageRecall: { type: GraphQLFloat },
    averageF1Score: { type: GraphQLFloat },
    lowF1Score: { type: GraphQLFloat },
    highF1Score: { type: GraphQLFloat },
  }),
});

export interface CafeSimulationsSummaryModel {
  lowAccuracy: number;
  highAccuracy: number;
  averageAccuracy: number;
  averagePrecision: number;
  averageRecall: number;
  averageF1Score: number;
  lowF1Score: number;
  highF1Score: number;
}

export const CafeSimulationsSummarySchema = new Schema({
  lowAccuracy: Number,
  highAccuracy: Number,
  averageAccuracy: Number,
  averagePrecision: Number,
  averageRecall: Number,
  averageF1Score: Number,
  lowF1Score: Number,
  highF1Score: Number,
});

export interface CafeNotebookExperimentModel extends NotebookExperimentModel {
  summary: CafeSimulationsSummaryModel;
}

export const CafeNotebookExperimentSchema = new Schema({
  summary: CafeSimulationsSummarySchema,
}).add(NotebookExperimentSchema);

export default mongoose.model(
  "CafeNotebookExperimentEntry",
  CafeNotebookExperimentSchema
);
