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

import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType } from "graphql";
const Schema = mongoose.Schema;

export const NnTfSummaryInputType = new GraphQLInputObjectType({
  name: "NnTfSummaryInputType",
  fields: () => ({
    trainImageNormalization: { type: GraphQLBoolean },
    testImageNormalization: { type: GraphQLBoolean },
    hiddenLayerUnits: { type: GraphQLBoolean },
    hiddenLayerActivation: { type: GraphQLBoolean },
    modelOptimizer: { type: GraphQLBoolean },
    lossFunction: { type: GraphQLBoolean },
    fitTrainingData: { type: GraphQLBoolean },
    fitTrainingLabels: { type: GraphQLBoolean },
    validationSplitRatio: { type: GraphQLBoolean },
    trainingEpochs: { type: GraphQLBoolean },

    testAccuracyOutput: { type: GraphQLFloat },
    testLossOutput: { type: GraphQLFloat },
  }),
});

export interface NnTfSimulationsSummaryModel {
  testAccuracyOutput: number;
  testLossOutput: number;
}

export const NnTfSimulationsSummarySchema = new Schema({
  // Before run
  trainImageNormalization: { type: GraphQLBoolean },
  testImageNormalization: { type: GraphQLBoolean },
  hiddenLayerUnits: { type: GraphQLBoolean },
  hiddenLayerActivation: { type: GraphQLBoolean },
  modelOptimizer: { type: GraphQLBoolean },
  lossFunction: { type: GraphQLBoolean },
  fitTrainingData: { type: GraphQLBoolean },
  fitTrainingLabels: { type: GraphQLBoolean },
  validationSplitRatio: { type: GraphQLBoolean },
  trainingEpochs: { type: GraphQLBoolean },
  // Post run

  testAccuracyOutput: Number,
  testLossOutput: Number,
});

export interface NnTfNotebookExperimentModel extends NotebookExperimentModel {
  summary: NnTfSimulationsSummaryModel;
}

export const NnTfNotebookExperimentSchema = new Schema({
  summary: NnTfSimulationsSummarySchema,
}).add(NotebookExperimentSchema);

export default mongoose.model(
  "NnTfNotebookExperimentEntry",
  NnTfNotebookExperimentSchema
);
