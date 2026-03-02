const fs = require('fs');
eval(fs.readFileSync('data/ate_subjects.js', 'utf8'));
eval(fs.readFileSync('data/subjects_data.js', 'utf8'));
const appJs = fs.readFileSync('js/app.js', 'utf8');

global.document = {
    getElementById: (id) => {
        if (id === 'wiz-focus-units') return { selectedOptions: [] };
        return { value: 'presentation', selectedOptions: [] };
    },
    querySelector: () => ({ scrollIntoView: () => {} })
};
global.window = {};
global.navState = {
    dept: 'ATE',
    batch: 2027,
    teams: Array(12).fill({}),
    assignConfig: {
        courseCode: 'AU3601',
        courseName: 'Automotive Pollution and Control',
        courseOutcomes: {},
        units: {
            1: { title: 'U1', desc: 'Sources of Pollution. Various emissions from Automobiles — Formation — Effects of pollutants on environment human beings. Emission control techniques – Emission standards - National and international.' }
        }
    }
};

let renderCalled = false;
global.render = () => { renderCalled = true; };
global.setTimeout = (cb) => cb();

const modifiedAppJs = appJs.replace("document.addEventListener('DOMContentLoaded', () => {", "function dummyInit() {");
eval(modifiedAppJs);

try {
    generateAssignments();
    console.log("SUCCESS");
    console.log("Generated count: " + navState.assignConfig.generatedAssignments.length);
} catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e.message);
}
