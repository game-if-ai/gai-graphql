import * as mongoose from "mongoose";
import {
  NotebookExperimentModel,
  NotebookExperimentSchema,
} from "./ExperimentBase";

import { GraphQLFloat, GraphQLInputObjectType } from "graphql";
const Schema = mongoose.Schema;

export const FruitPickerSummaryInputType = new GraphQLInputObjectType({
  name: "FruitPickerSummaryInputType",
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

export interface FruitPickerSimulationsSummaryModel {
  lowAccuracy: number;
  highAccuracy: number;
  averageAccuracy: number;
  averagePrecision: number;
  averageRecall: number;
  averageF1Score: number;
  lowF1Score: number;
  highF1Score: number;
}

export const FruitPickerSimulationsSummarySchema = new Schema({
  lowAccuracy: Number,
  highAccuracy: Number,
  averageAccuracy: Number,
  averagePrecision: Number,
  averageRecall: Number,
  averageF1Score: Number,
  lowF1Score: Number,
  highF1Score: Number,
});

export interface FruitPickerNotebookExperimentModel
  extends NotebookExperimentModel {
  summary: FruitPickerSimulationsSummaryModel;
}

export const FruitPickerNotebookExperimentSchema = new Schema({
  summary: FruitPickerSimulationsSummarySchema,
}).add(NotebookExperimentSchema);

export default mongoose.model(
  "FruitPickerNotebookExperimentEntry",
  FruitPickerNotebookExperimentSchema
);
