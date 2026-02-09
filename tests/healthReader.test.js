const {healthMetricsCounter} = require('../healthReader.js');
describe('healthMetricsCounter', () => {
    test('reads valid JSON file and counts health entries',async() => {
        const result = await healthMetricsCounter('./data/health-metrics.json');

        expect(result).toEqual({
            totalEntries: 8
        });
    });
    test('handles missing JSON file', async () => {
        const result = await healthMetricsCounter('./data/missing.json');

        expect(result).toBeNull();
    });
});