/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import { GraphQLString, GraphQLList, GraphQLBoolean } from "graphql";
import {
  Cmi5LaunchParametersInputType,
  DisplayedHintsInputType,
} from "../Models/ExperimentBase";
import { PlaneSummaryInputType } from "../Models/PlaneExperiment";
import PlaneNotebookExperimentEntry from "../Models/PlaneExperiment";

import * as dotenv from "dotenv";
dotenv.config();

export const submitPlaneNotebookExperiment = {
  type: GraphQLBoolean,
  args: {
    cmi5LaunchParameters: { type: Cmi5LaunchParametersInputType },
    activityId: { type: GraphQLString },
    notebookStateStringified: { type: GraphQLString },
    summary: { type: PlaneSummaryInputType },
    displayedHints: { type: GraphQLList(DisplayedHintsInputType) },
  },

  // eslint-disable-next-line   @typescript-eslint/no-explicit-any
  async resolve(parent: any, args: any) {
    try {
      await PlaneNotebookExperimentEntry.create({ ...args });
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(String(e));
    }
  },
};
export default submitPlaneNotebookExperiment;
