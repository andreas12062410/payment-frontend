const Redmine = require('node-redmine');
const express = require('express');
const app = express();
const port = 3000;

DEBUG = True // ! Change to false in production

const redmineObj = (host, api) => {
    /**
     * @param {string} host
     * @param {string} api
     * @returns {string}  the object of Redmine class is returned
     */
    const config = {
      apiKey: api,
    };
    return new Redmine(host, config);
};

app.use(express.json())

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.post('/milestones/', (req, res) => {
    try{
        const { apiKey, projectIdentifier } = req.body;
 
        // protocol required in Hostname, supports both HTTP and HTTPS
        const redmine = redmineObj("https://kore.koders.in", apiKey);
         
        redmine.projects({}, fetchData = (data, err) => {


        })

        // redmine.issues({limit: 2}, function(err, data) {
        //   if (err) throw err;
         
        //   for (let i in data.issues) {
        //     dump_issue(data.issues[i]);
        //   }
         
        //   console.log('total_count: ' + data.total_count);
        // });
    }
    catch (error) {
        if (DEBUG === True)
            console.log(`Something went wrong. Please try again. Reason ${error}`)
        else
            console.log("Something went wrong. Please try again.")
    }

});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});