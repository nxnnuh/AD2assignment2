// Test your workoutReader.js module here
const {workoutCalculator} = require('../workoutReader.js');

describe('workoutCalculator',()=>{
    test('reads valid CSV file and returns workout totals', async () =>{
        const result = await workoutCalculator('./data/workouts.csv');

        expect(result).toEqual({
            totalWorkouts: 10,
            totalMinutes:330
        });
    });

    test('handles missing CSV file gracefully',async()=>{
        const result = await workoutCalculator('./data/missing.csv');

        expect(result).toBeNull();
    });
});