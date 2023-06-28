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

import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
const Schema = mongoose.Schema;

export const NMTSummaryInputType = new GraphQLInputObjectType({
  name: "NMTSummaryInputType",
  fields: () => ({
    callsFitOnTexts: { type: GraphQLBoolean },
    callsTextsToSequences: { type: GraphQLBoolean },
    callsPadSequences: { type: GraphQLBoolean },
    callsPadSequencesWithPaddingPost: { type: GraphQLBoolean },
    callsPadSequencesTwice: { type: GraphQLBoolean },
    callsPadSequencesTwiceWithPaddingPost: { type: GraphQLBoolean },
    callsReshape: { type: GraphQLBoolean },
    callsReshapeOnXAndY: { type: GraphQLBoolean },
    callsArgmax: { type: GraphQLBoolean },
    callsJoin: { type: GraphQLBoolean },
    hasValidationOutput: { type: GraphQLBoolean },
    dataIsNumpyArray: { type: GraphQLBoolean },
    keywordZeroLookup: { type: GraphQLBoolean },
    preprocessedDataCorrectDimensions: { type: GraphQLBoolean },
    outputCorrectlyFormatted: { type: GraphQLBoolean },
  }),
});

export interface NMTSimulationsSummaryModel {
  callsFitOnTexts: boolean;
  callsTextsToSequences: boolean;
  callsPadSequences: boolean;
  callsPadSequencesWithPaddingPost: boolean;
  callsPadSequencesTwice: boolean;
  callsPadSequencesTwiceWithPaddingPost: boolean;
  callsReshape: boolean;
  callsReshapeOnXAndY: boolean;
  callsArgmax: boolean;
  callsJoin: boolean;
  hasValidationOutput: boolean;
  dataIsNumpyArray: boolean;
  keywordZeroLookup: boolean;
  preprocessedDataCorrectDimensions: boolean;
  outputCorrectlyFormatted: boolean;
}

export const NMTSimulationsSummarySchema = new Schema({
  // Before run
  callsFitOnTexts: Boolean,
  callsTextsToSequences: Boolean,
  callsPadSequences: Boolean,
  callsPadSequencesWithPaddingPost: Boolean,
  callsPadSequencesTwice: Boolean,
  callsPadSequencesTwiceWithPaddingPost: Boolean,
  callsReshape: Boolean,
  callsReshapeOnXAndY: Boolean,
  callsJoin: Boolean,
  callsArgmax: Boolean,
  hasValidationOutput: Boolean,
  // Post run
  dataIsNumpyArray: Boolean,
  keywordZeroLookup: Boolean,
  preprocessedDataCorrectDimensions: Boolean,
  outputCorrectlyFormatted: Boolean,
});

export interface NMTNotebookExperimentModel extends NotebookExperimentModel {
  summary: NMTSimulationsSummaryModel;
}

export const NMTNotebookExperimentSchema = new Schema({
  summary: NMTSimulationsSummarySchema,
}).add(NotebookExperimentSchema);

export default mongoose.model(
  "NMTNotebookExperimentEntry",
  NMTNotebookExperimentSchema
);
