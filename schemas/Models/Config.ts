/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import mongoose, { Document } from "mongoose";
import { GraphQLObjectType, GraphQLString } from "graphql";
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
  testString: String,
});

export const ConfigType = new GraphQLObjectType({
  name: "ConfigType",
  fields: () => ({
    testString: { type: GraphQLString },
  }),
});

export interface ConfigModel extends Document {
  testString: string;
}

export default mongoose.model("Config", ConfigSchema);
