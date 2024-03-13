/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Queries
import fetchConfig from "./query/fetchConfig";
import submitCafeNotebookExperiment from "./mutation/submit-cafe-notebook-experiment";
import submitNmtNotebookExperiment from "./mutation/submit-nmt-notebook-experiment";
import submitFruitPickerNotebookExperiment from "./mutation/submit-fruit-picker-notebook-experiment";
import submitPlaneNotebookExperiment from "./mutation/submit-plane-notebook-experiment";
import submitWineExperiment from "./mutation/submit-wine-experiment";
import fetchWineExperiments from "./query/fetch-wine-experiments";

const PublicRootQuery = new GraphQLObjectType({
  name: "PublicRootQueryType",
  fields: {
    fetchConfig,
    fetchWineExperiments,
  },
});

const PublicMutation = new GraphQLObjectType({
  name: "PublicMutation",
  fields: {
    submitCafeNotebookExperiment,
    submitNmtNotebookExperiment,
    submitFruitPickerNotebookExperiment,
    submitPlaneNotebookExperiment,
    submitWineExperiment,
  },
});

export default new GraphQLSchema({
  query: PublicRootQuery,
  mutation: PublicMutation,
});
