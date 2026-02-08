//In the dataProcessor.js file, develop a main program that integrates the scripts that you have written as well as read an environment file:
//Install dotenv with the command npm install dotenv.
//Create a .env file. Inside the file create two values, USER_NAME and WEEKLY_GOAL, set the values to your name and weekly workout minutes goal respectively.
//USER_NAME=Rebecca
//WEEKLY_GOAL=150
//At the top of the file, add require('dotenv').config(); at the top to load environment variables.
//require('dotenv').config();
//console.log(process.env.USER_NAME); // "Rebecca"
//console.log(process.env.WEEKLY_GOAL); // "150"
//At the top of the file, import the functions that you wrote in workoutReader.js and healthReader.js.
//Call the functions written in workoutReader.js and healthReader.js using async/await. Using the data that is returned, display:
//The USER_NAME environment variable to personalize the output.
//A summary of the data found when calling the functions written in workoutReader.js and healthReader.js.
//A message indicating if they have met the WEEKLY_GOAL based on the total workout minutes calculated.
//Finally, be sure to handle errors gracefully and provide helpful feedback to users.

require('dotenv').config();
console.log(process.env.USER_NAME); // "Rebecca"
console.log(process.env.WEEKLY_GOAL); // "150"

const{workoutCalculator} = require('./workoutReader');
const {healthMetricsCounter} = require('./healthReader')

async function processFiles() {
    try{
        console.log('Processing data for: ' + process.env.USER_NAME);
        console.log('📁 Reading workout data...');
        const workoutResults = await workoutCalculator('./data/workouts.csv');

        console.log('📁 Reading health data...');
        const healthResults = await healthMetricsCounter('./data/health-metrics.json');

        if (!workoutResults || !healthResults ){
            console.log('❌ Unable to process all files');
            return;
        }
        console.log('\nSUMMARY:');
        console.log('Workouts founds: ' + workoutResults.totalWorkouts);
        console.log('Total workout minutes: ' + workoutResults.totalMinutes);
        console.log('Health entries found: '+ healthResults.totalEntries);
        console.log('Weekly goal: '+ process.env.WEEKLY_GOAL+' minutes');

        if (workoutResults.totalMinutes >= process.env.WEEKLY_GOAL){
            console.log('🎉 Congratulations '+ process.env.USER_NAME + '! You have exceeded your weekly goal!');
        } else {
            console.log('Keep going '+process.env.USER_NAME + '! You have almost achieved your weekly goal!');
        } 
        }catch (error){
            console.log('❌ Unexpected error:', error.message);

    }
}

processFiles()