//In the workoutReader.js file, create a script that:
//Uses the csv-parser package to read CSV workout data asynchronously
//Counts the total number of workouts in the CSV file
//Calculates total workout minutes in the CSV file using a basic for loop
//Handles errors when the CSV file is missing or corrupted
//Provides clear error messages to users
//workoutCalculator("./data/workouts.csv")
// Total workouts: 10 
// Total minutes: 330 

const fs = require('fs');
const csv = require('csv-parser');

function readWorkoutData(filepath) {
    return new Promise((resolve, reject)=>{
        const results = [];

        fs.createReadStream(filepath)
        .pipe(csv())
        .on('data',(row)=> {
            results.push(row);
        })
        .on('end',()=>{
            resolve(results);
        })
        .on('error',(error)=>{
            rejects(error);
        });
    });
}

async function workoutCalculator(filepath) {
    try{
        const workoutData = await readWorkoutData(filepath);

        let totalWorkouts = workoutData.length;
        let totalMinutes = 0;

        for (let i = 0; i < workoutData.length; i++){
            totalMinutes += parseInt(workoutData[i].duration);
        }

        console.log('Total workouts: ' + totalWorkouts);
        console.log('Total minutes: ' + totalMinutes);

        return{
            totalWorkouts,
            totalMinutes
        };
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log('❌ CSV file not found');
        }else{
            console.log('❌ Error processing workout data: ', error.message);
        }
        return null;
    }
}
module.exports = { workoutCalculator };

workoutCalculator("./data/workouts.csv")