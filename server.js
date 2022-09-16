const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
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

const getBudget = async (apiKey, issueIdentifier) => {
  try {
    const { data } = await axios.get(
      `https://kore.koders.in/issues/${issueIdentifier}`,
      {
        headers: {
          "X-Redmine-API-Key": apiKey,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 OPR/90.0.4480.78 (Edition std-1)",
        },
      }
    );
    const $ = cheerio.load(data);
    const tableItems = $(".billing-details tbody tr");
    for (let i = 0; i < tableItems.length; i++) {
      const el = tableItems[i];
      if ($(el).children("th").text() === "Budget") {
        return $(el).children("td").text().replace("₹", "");
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getIssuesFromMilestone = async (apiKey, milestoneIdentifier) => {
  const issues = new Set();
  try {
    const response = await axios.get(
      `https://kore.koders.in/projects/${projectIdentifier}/issues.json`,
      { headers: { "X-Redmine-API-Key": apiKey } }
    );
    for (let issue in response.data.issues) {
      try {
        if (response.data.issues[issue].fixed_version.id == milestoneIdentifier)
          issues.add(response.data.issues[issue].id);
      } catch (err) {
        console.log("Issue not assigned to a version. Passing...");
      }
    }
    return issues;
  } catch (error) {
    return err.message;
  }
};

const getMilestonesData = async (apiKey, milestones) => {
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
    return err.message;
  }
};

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.post("/milestones/", async (req, res) => {
  const { apiKey, projectIdentifier } = req.body;
  if (apiKey && projectIdentifier) {
    const milestones = await getProjectMilestones(apiKey, projectIdentifier);
    if (milestones) {
      const projectMileStones = await getMilestonesData(apiKey, milestones);
      res.status(200).json(projectMileStones);
    }
  } else res.status(404);
});

app.post("/get-budget/", async (req, res) => {
  const { apiKey, milestoneIdentifier } = req.body;
  const issues = await getIssuesFromMilestone(apiKey, milestoneIdentifier);
  let amount = 0;
  for (let issue in issues) {
    issue_budget = await getBudget(issue, apiKey);
    if (issue_budget !== null) amount += issue_budget;
  }
  res.send(200).json(amount);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
