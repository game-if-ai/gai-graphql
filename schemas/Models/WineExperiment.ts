/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import * as mongoose from "mongoose";
import {
  Cmi5LaunchParametersObjectType,
  DisplayedHintsObjectType,
  NotebookExperimentModel,
  NotebookExperimentSchema,
} from "./ExperimentBase";

import {
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
} from "graphql";
const Schema = mongoose.Schema;

export const WineSummaryInputType = new GraphQLInputObjectType({
  name: "WineSummaryInputType",
  fields: () => ({
    dropsWineColumn: { type: GraphQLBoolean },
    dropsWineColumnWithAxis: { type: GraphQLBoolean },
    savesQualityColumnBeforeDropping: { type: GraphQLBoolean },
    dropsQualityColumn: { type: GraphQLBoolean },
    dropsQualityColumnWithAxis: { type: GraphQLBoolean },
    usesStandardScaler: { type: GraphQLBoolean },
    fitsWithStandardScaler: { type: GraphQLBoolean },
    transformsWithStandardScaler: { type: GraphQLBoolean },
    usesDataframe: { type: GraphQLBoolean },
    clusters: { type: GraphQLList(ClusterGroupInputType) },
  }),
});

export const WineSummaryType = new GraphQLObjectType({
  name: "WineSummaryType",
  fields: () => ({
    dropsWineColumn: { type: GraphQLBoolean },
    dropsWineColumnWithAxis: { type: GraphQLBoolean },
    savesQualityColumnBeforeDropping: { type: GraphQLBoolean },
    dropsQualityColumn: { type: GraphQLBoolean },
    dropsQualityColumnWithAxis: { type: GraphQLBoolean },
    usesStandardScaler: { type: GraphQLBoolean },
    fitsWithStandardScaler: { type: GraphQLBoolean },
    transformsWithStandardScaler: { type: GraphQLBoolean },
    usesDataframe: { type: GraphQLBoolean },
    clusters: { type: GraphQLList(ClusterGroupObjectType) },
  }),
});

interface ClusterGroup {
  numMembers: number;
  quality: number;
}

export const ClusterGroupInputType = new GraphQLInputObjectType({
  name: "ClusterGroupInputType",
  fields: () => ({
    numMembers: { type: GraphQLInt },
    quality: { type: GraphQLFloat },
  }),
});

export const ClusterGroupObjectType = new GraphQLObjectType({
  name: "ClusterGroupObjectType",
  fields: () => ({
    numMembers: { type: GraphQLInt },
    quality: { type: GraphQLFloat },
  }),
});

export const ClusterGroupSchema = new Schema({
  numMembers: { type: Number },
  quality: { type: Number },
});

export interface WineSummary {
  dropsWineColumn: boolean;
  dropsWineColumnWithAxis: boolean;
  savesQualityColumnBeforeDropping: boolean;
  dropsQualityColumn: boolean;
  dropsQualityColumnWithAxis: boolean;
  usesStandardScaler: boolean;
  fitsWithStandardScaler: boolean;
  transformsWithStandardScaler: boolean;
  usesDataframe: boolean;
  clusters: ClusterGroup[];
}

export const WineSummarySchema = new Schema({
  dropsWineColumn: { type: Boolean },
  dropsWineColumnWithAxis: { type: Boolean },
  savesQualityColumnBeforeDropping: { type: Boolean },
  dropsQualityColumn: { type: Boolean },
  dropsQualityColumnWithAxis: { type: Boolean },
  usesStandardScaler: { type: Boolean },
  fitsWithStandardScaler: { type: Boolean },
  transformsWithStandardScaler: { type: Boolean },
  usesDataframe: { type: Boolean },
  clusters: { type: [ClusterGroupSchema] },
});

export interface WineExperimentModel extends NotebookExperimentModel {
  summary: WineSummary;
}

export const WineExperimentSchema = new Schema({
  summary: WineSummarySchema,
}).add(NotebookExperimentSchema);

export const WineExperimentObjectType = new GraphQLObjectType({
  name: "WineExperimentObjectType",
  fields: () => ({
    cmi5LaunchParameters: { type: Cmi5LaunchParametersObjectType },
    activityId: { type: GraphQLString },
    notebookStateStringified: { type: GraphQLString },
    displayedHints: { type: GraphQLList(DisplayedHintsObjectType) },
    summary: { type: WineSummaryType },
  }),
});

export default mongoose.model("WineExperimentEntry", WineExperimentSchema);
