import SmokeTest from "./smokeTest.js";
import LoadTest from "./loadTest.js";
import StressTest from "./stressTest.js";
import StatusCode from "./statusCode.js";
import { group, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    scenarios: {        
            smokeTest: {
                executor: 'constant-vus',
                exec: 'smokeTest',
                vus: 1,
                duration: '5s',
            },
            loadTest: {
                executor: 'per-vu-iterations',
                exec: 'loadTest',
                vus: 50,
                iterations: 100,
                startTime: '5s',
                maxDuration: '1m',
            },
            stressTest: {
                executor: 'per-vu-iterations',
                exec: 'stressTest',
                vus: 500,
                iterations: 50,
                startTime: '10s',
                maxDuration: '3m',
            },
            statusCode: {
                executor: 'constant-vus',
                exec: 'statusCode',
                vus: 1,
                //iterations: 1,
                startTime: '30s',
                duration: '1m',
            },
        },
    
};


export function smokeTest() {
    group('Endpoint Get smokeTest - APi K6', () => {
        SmokeTest();
    });
};
export function loadTest() {
    group('Endpoint Get loadTest - APi K6', () => {
        LoadTest()
    });
};

export function stressTest() {
    group('Endpoint Get stressTest - APi K6', () => {
        StressTest()
    });
};

export function statusCode() {
    group('Endpoint Get statusCode - APi K6', () => {
        StatusCode()
    });
};
//run test => k6 run login/.rodarLoginGroups.js 