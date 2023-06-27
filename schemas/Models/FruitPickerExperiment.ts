/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
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
