const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

DEBUG = true; // ! Change to false in production

app.use(cors());
app.use(express.json());

apiKey = "";
projectIdentifier = "89";

const getProjectMilestones = async (apiKey, projectIdentifier) => {
  const milestones = new Set();
  try {
    const response = await axios.get(
      `https://kore.koders.in/projects/${projectIdentifier}/issues.json`,
      { headers: { "X-Redmine-API-Key": apiKey } }
    );
    for (let issue in response.data.issues) {
      try {
        milestones.add(response.data.issues[issue].fixed_version.id);
      } catch (err) {
        console.log("Issue not assigned to a version. Passing...");
      }
    }
    return milestones;
  } catch (error) {
    console.error(error);
  }
};

const getMilestoneData = async (apiKey, milestones) => {
  const milestonesData = {};
  try {
    for (let milestone of milestones) {
      try {
        const response = await axios.get(
          `https://kore.koders.in/versions/${milestone}.json`,
          { headers: { "X-Redmine-API-Key": apiKey } }
        );
        milestonesData[response.data.version.name] =
          response.data.version.status;
      } catch (err) {
        console.log("Milestone not found. Passing...");
      }
    }
    return milestonesData;
  } catch (error) {
    console.error(error.message);
    return err.message;
  }
};

// (async () => console.log(await getMilestoneData(apiKey, [23, 22])))();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/milestones/", async (req, res) => {
  const { apiKey, projectIdentifier } = req.body;
  console.log(req.body);
  if (apiKey && projectIdentifier) {
    const milestones = await getProjectMilestones(apiKey, projectIdentifier);
    if (milestones !== undefined) {
      const projectMileStone = await getMilestoneData(apiKey, milestones);
      return res.status(200).json(projectMileStone);
    }
  }
  // res.status(404).json({ msg: "Paramet" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
