import { GraphQLString, GraphQLList, GraphQLBoolean } from "graphql";
import {
  Cmi5LaunchParametersInputType,
  DisplayedHintsInputType,
} from "../Models/ExperimentBase";
import FruitPickerNotebookExperimentEntry from "../Models/FruitPickerExperiment";
import { FruitPickerSummaryInputType } from "../Models/FruitPickerExperiment";

import * as dotenv from "dotenv";
dotenv.config();

export const submitFruitPickerNotebookExperiment = {
  type: GraphQLBoolean,
  args: {
    cmi5LaunchParameters: { type: Cmi5LaunchParametersInputType },
    activityId: { type: GraphQLString },
    notebookStateStringified: { type: GraphQLString },
    summary: { type: FruitPickerSummaryInputType },
    displayedHints: { type: GraphQLList(DisplayedHintsInputType) },
  },

  async resolve(parent: any, args: any) {
    try {
      await FruitPickerNotebookExperimentEntry.create({ ...args });
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(String(e));
    }
  },
};
export default submitFruitPickerNotebookExperiment;
