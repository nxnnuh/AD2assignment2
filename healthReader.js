//In the healthReader.js file, create a script that:
//Reads JSON health data asynchronously using fs.readFile
//Counts the total number of health entries
//Handles errors when the JSON file is missing or invalid
//uses try/catch blocks for proper error handling
//healthMetricsCounter("./data/health-metrics.csv")
// Total health entries: 8 

const fs = require('fs/promises');

async function healthMetricsCounter(filepath) {
    try {
        const data = await fs.readFile(filepath,'utf8');
        const healthData = JSON.parse(data);

        const totalEntries = healthData.metrics.length;

        console.log("Total health entries: " + totalEntries);

        return{
            totalEntries
        };
    } catch(error) {
        if (error.code === 'ENOENT'){
            console.log('File not found - check the file path');
        } else if (error.name === 'SyntaxError'){
            console.log('❌ Invalid JSON - check the file format');
        } else {
            console.log('❌ Unknown error:', error.message);
        }
        return null;
    }
}

healthMetricsCounter('./data/health-metrics.json')