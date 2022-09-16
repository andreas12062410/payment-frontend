const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

DEBUG = true // ! Change to false in production

app.use(express.json())

apiKey = ""
projectIdentifier = "89"

const getProjectIssues = async (apiKey, projectIdentifier) => {
    try {
      const response = await axios.get(`https://kore.koders.in/projects/${projectIdentifier}/issues.json`, {headers: {'X-Redmine-API-Key': apiKey}})
      return response.data.issues
    } catch (error) {
      console.error(error)
    }
}

(async() =>console.log(await getProjectIssues(apiKey, projectIdentifier)))()

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.post('/milestones/', (req, res) => {
    const { apiKey, projectIdentifier } = req.body;
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });