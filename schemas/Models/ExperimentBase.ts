/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;
import { LaunchParameters } from "@xapi/cmi5";
import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

const AgentSchema = new Schema({
  objectType: { type: String, default: "Agent" },
  mbox: { type: String },
  mbox_sha1sum: { type: String },
  openid: { type: String },
  account: { type: Schema.Types.Mixed },
  name: { type: String },
});

const LaunchParametersSchema = new Schema({
  endpoint: { type: String },
  fetch: { type: String },
  actor: { type: AgentSchema },
  registration: { type: String },
  activityId: { type: String },
});

const DisplayedHintsSchema = new Schema({
  message: String,
  conditionDescription: String,
});

export const NotebookExperimentSchema = new Schema(
  {
    cmi5LaunchParameters: { type: LaunchParametersSchema },
    activityId: { type: String },
    notebookStateStringified: { type: String },
    displayedHints: { type: [DisplayedHintsSchema] },
  },
  { timestamps: true }
);

export interface NotebookExperimentModel extends Document {
  cmi5LaunchParameters: LaunchParameters;
  activityId: string;
  notebookStateStringified: string;
  displayedHints: string[];
}

const AccountInputType = new GraphQLInputObjectType({
  name: "AccountInputType",
  fields: () => ({
    homePage: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const AccountObjectType = new GraphQLObjectType({
  name: "AccountObjectType",
  fields: () => ({
    homePage: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const ActorInputType = new GraphQLInputObjectType({
  name: "ActorInputType",
  fields: () => ({
    objectType: { type: GraphQLString },
    name: { type: GraphQLString },
    mbox: { type: GraphQLString },
    mbox_sha1sum: { type: GraphQLString },
    account: { type: AccountInputType },
    openid: { type: GraphQLString },
  }),
});

export const ActorObjectType = new GraphQLObjectType({
  name: "ActorObjectType",
  fields: () => ({
    objectType: { type: GraphQLString },
    name: { type: GraphQLString },
    mbox: { type: GraphQLString },
    mbox_sha1sum: { type: GraphQLString },
    account: { type: AccountObjectType },
    openid: { type: GraphQLString },
  }),
});

export const Cmi5LaunchParametersInputType = new GraphQLInputObjectType({
  name: "Cmi5LaunchParametersType",
  fields: () => ({
    endpoint: { type: GraphQLString },
    fetch: { type: GraphQLString },
    registration: { type: GraphQLString },
    activityId: { type: GraphQLString },
    actor: { type: ActorInputType },
  }),
});

export const Cmi5LaunchParametersObjectType = new GraphQLObjectType({
  name: "Cmi5LaunchParametersObjectType",
  fields: () => ({
    endpoint: { type: GraphQLString },
    fetch: { type: GraphQLString },
    registration: { type: GraphQLString },
    activityId: { type: GraphQLString },
    actor: { type: ActorObjectType },
  }),
});

export const DisplayedHintsInputType = new GraphQLInputObjectType({
  name: "DisplayedHintsInputType",
  fields: () => ({
    message: { type: GraphQLString },
    conditionDescription: { type: GraphQLString },
  }),
});

export const DisplayedHintsObjectType = new GraphQLObjectType({
  name: "DisplayedHintsObjectType",
  fields: () => ({
    message: { type: GraphQLString },
    conditionDescription: { type: GraphQLString },
  }),
});
