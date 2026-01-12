/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/

import createApp, { appStart, appStop } from "../../../app";
import { expect } from "chai";
import { Express } from "express";
import { describe } from "mocha";
import mongoUnit from "mongo-unit";
import request from "supertest";

describe("store prompt template", () => {
  let app: Express;

  beforeEach(async () => {
    // await mongoUnit.load(require("../../fixtures/mongodb/data-default.js"));
    app = await createApp();
    await appStart();
  });

  afterEach(async () => {
    await appStop();
    await mongoUnit.drop();
  });

  it.skip(`can store new nn tf experiment`, async () => {
    const newExperiment = {
      cmi5LaunchParameters: {
        endpoint: "https://example.com",
      },
      activityId: "nn-tf",
      notebookStateStringified: "state",
      summary: {
        trainImageNormalization: true,
        testImageNormalization: true,
        hiddenLayerUnits: true,
        hiddenLayerActivation: true,
        modelOptimizer: true,
        lossFunction: true,
        fitTrainingData: true,
        fitTrainingLabels: true,
        validationSplitRatio: true,
        trainingEpochs: true,
        testAccuracyOutput: 0.9,
        testLossOutput: 0.1,
      },
      displayedHints: [],
    };
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `mutation SubmitNnTfNotebookExperiment(
            $cmi5LaunchParameters: Cmi5LaunchParametersType,
            $activityId: String,
            $notebookStateStringified: String
            $summary: NnTfSummaryInputType
            $displayedHints: [DisplayedHintsInputType]
          ){
            submitNnTfNotebookExperiment(
              cmi5LaunchParameters: $cmi5LaunchParameters,
              activityId: $activityId,
              notebookStateStringified: $notebookStateStringified,
              summary: $summary,
              displayedHints: $displayedHints
            )
          }`,
        variables: {
          ...newExperiment,
        },
      });
    expect(response.status).to.equal(200);
    expect(response.body.data.submitNnTfNotebookExperiment).to.equal(true);
  });
});
