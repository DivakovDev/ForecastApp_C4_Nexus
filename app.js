const express = require('express')
// path provides utilities for working with file and directory paths
const path = require('path')
// fs is for File System which allows to read files write files create/delete and watch for file changes
const fs = require('fs');
const app = express()
const port = 3000

// middleware that allows to read data from req.body
app.use(express.urlencoded({ extended: true }));

// here we write first text to {http://localhost:3000/} route
app.get('/', (req, res) => {
    res.send('Hello Lyusi please add /weather in the route to see the magic!')
})

// here we display the form in {/weather} route
app.get('/weather', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

// here we make req to get info from data.json file
app.post('/weather', (req,res)=>{
    const region = req.body.region;

    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
      if (err) {
        return res.send('Error reading forecast data.');
      }
    //   here we parse data form data.json file and make it readable and display it in the html down there
      const forecastData = JSON.parse(data);
      const forecast = forecastData[region] || 'No data available for this region.';
  
    //   here we return whole html file with response and forecast info!
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Weather Result</title>
        </head>
        <body>
          <h1>Weather Forecast</h1>
          <form action="/weather" method="POST">
            <select name="region">
              <option value="Sofia">Sofia</option>
              <option value="Plovdiv">Plovdiv</option>
              <option value="Varna">Varna</option>
            </select>
            <button type="submit">Get Forecast</button>
          </form>
          <div id="result">
            <h2>Forecast for ${region}: ${forecast}</h2>
          </div>
        </body>
        </html>
      `);
    });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });