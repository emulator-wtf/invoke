"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@actions/core");
var exec_1 = require("@actions/exec");
function invoke() {
    return __awaiter(this, void 0, void 0, function () {
        var token, appApk, testApk, libraryTestApk, outputsDir, outputs, recordVideo, devices, timeout, useOrchestrator, clearPackageData, withCoverage, testTargets, additionalApks, environmentVariables, shardTargetRuntime, numUniformShards, numShards, numBalancedShards, dirsToPull, sideEffects, numFlakyTestAttempts, flakyTestRepeatMode, fileCache, fileCacheTtl, testCache, async, displayName, proxyHost, proxyPort, proxyUser, proxyPass, args_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = (0, core_1.getInput)('api-token', { required: true });
                    appApk = (0, core_1.getInput)('app');
                    testApk = (0, core_1.getInput)('test');
                    libraryTestApk = (0, core_1.getInput)('library-test');
                    outputsDir = (0, core_1.getInput)('outputs-dir');
                    outputs = (0, core_1.getInput)('outputs');
                    recordVideo = (0, core_1.getInput)('record-video') && (0, core_1.getBooleanInput)('record-video');
                    devices = (0, core_1.getMultilineInput)('devices').filter(function (x) { return x.length > 0; });
                    timeout = (0, core_1.getInput)('timeout');
                    useOrchestrator = (0, core_1.getInput)('use-orchestrator') && (0, core_1.getBooleanInput)('use-orchestrator');
                    clearPackageData = (0, core_1.getInput)('clear-package-data') && (0, core_1.getBooleanInput)('clear-package-data');
                    withCoverage = (0, core_1.getInput)('with-coverage') && (0, core_1.getBooleanInput)('with-coverage');
                    testTargets = (0, core_1.getMultilineInput)('test-targets').map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 0; });
                    additionalApks = (0, core_1.getMultilineInput)('additional-apks').filter(function (x) { return x.length > 0; });
                    environmentVariables = (0, core_1.getMultilineInput)('environment-variables').filter(function (x) { return x.length > 0; });
                    shardTargetRuntime = (0, core_1.getInput)("shard-target-runtime");
                    numUniformShards = (0, core_1.getInput)('num-uniform-shards');
                    numShards = (0, core_1.getInput)('num-shards');
                    numBalancedShards = (0, core_1.getInput)('num-balanced-shards');
                    dirsToPull = (0, core_1.getMultilineInput)('directories-to-pull').filter(function (x) { return x.length > 0; });
                    sideEffects = (0, core_1.getInput)('side-effects') && (0, core_1.getBooleanInput)('side-effects');
                    numFlakyTestAttempts = (0, core_1.getInput)('num-flaky-test-attempts');
                    flakyTestRepeatMode = (0, core_1.getInput)('flaky-test-repeat-mode');
                    fileCache = (0, core_1.getInput)('file-cache') ? (0, core_1.getBooleanInput)('file-cache') : true;
                    fileCacheTtl = (0, core_1.getInput)('file-cache-ttl');
                    testCache = (0, core_1.getInput)('test-cache') ? (0, core_1.getBooleanInput)('test-cache') : true;
                    async = (0, core_1.getInput)('async') && (0, core_1.getBooleanInput)('async');
                    displayName = (0, core_1.getInput)('display-name');
                    proxyHost = (0, core_1.getInput)('proxy-host');
                    proxyPort = (0, core_1.getInput)('proxy-port');
                    proxyUser = (0, core_1.getInput)('proxy-user');
                    proxyPass = (0, core_1.getInput)('proxy-password');
                    args_1 = ['--token', token];
                    if (libraryTestApk) {
                        if (appApk || testApk) {
                            (0, core_1.warning)('library-test should be used without app and test');
                            (0, core_1.setFailed)('library-test should be used without app and test');
                            return [2];
                        }
                        args_1.push('--library-test', libraryTestApk);
                    }
                    else if (!appApk) {
                        (0, core_1.warning)('app must be specified');
                        (0, core_1.setFailed)('app must be specified');
                        return [2];
                    }
                    else if (!testApk) {
                        (0, core_1.warning)('test must be specified');
                        (0, core_1.setFailed)('test must be specified');
                        return [2];
                    }
                    else {
                        args_1.push('--app', appApk, '--test', testApk);
                    }
                    if (outputsDir) {
                        args_1.push('--outputs-dir', outputsDir);
                    }
                    if (outputs) {
                        args_1.push('--outputs', outputs);
                    }
                    if (recordVideo) {
                        args_1.push('--record-video');
                    }
                    if (devices) {
                        devices.forEach(function (device) {
                            args_1.push('--device', device);
                        });
                    }
                    if (timeout) {
                        args_1.push('--timeout', timeout);
                    }
                    if (testTargets) {
                        args_1.push('--test-targets', testTargets.join(' '));
                    }
                    if (displayName) {
                        args_1.push('--display-name', displayName);
                    }
                    if (useOrchestrator) {
                        args_1.push('--use-orchestrator');
                    }
                    if (clearPackageData) {
                        args_1.push('--clear-package-data');
                    }
                    if (withCoverage) {
                        args_1.push('--with-coverage');
                    }
                    if (additionalApks.length > 0) {
                        args_1.push('--additional-apks', additionalApks.join(','));
                    }
                    if (environmentVariables.length > 0) {
                        args_1.push('--environment-variables', environmentVariables.join(','));
                    }
                    if (shardTargetRuntime) {
                        args_1.push('--shard-target-runtime', shardTargetRuntime);
                    }
                    else if (numBalancedShards) {
                        args_1.push('--num-balanced-shards', numBalancedShards);
                    }
                    else if (numShards) {
                        args_1.push('--num-shards', numShards);
                    }
                    else if (numUniformShards) {
                        args_1.push('--num-uniform-shards', numUniformShards);
                    }
                    if (dirsToPull.length > 0) {
                        args_1.push('--directories-to-pull', dirsToPull.join(','));
                    }
                    if (sideEffects) {
                        args_1.push('--side-effects');
                    }
                    if (numFlakyTestAttempts) {
                        args_1.push('--num-flaky-test-attempts', numFlakyTestAttempts);
                    }
                    if (flakyTestRepeatMode) {
                        args_1.push('--flaky-test-repeat-mode', flakyTestRepeatMode);
                    }
                    if (!fileCache) {
                        args_1.push('--no-file-cache');
                    }
                    if (fileCacheTtl) {
                        args_1.push('--file-cache-ttl', fileCacheTtl);
                    }
                    if (!testCache) {
                        args_1.push('--no-test-cache');
                    }
                    if (async) {
                        args_1.push('--async');
                    }
                    if (proxyHost) {
                        args_1.push('--proxy-host', proxyHost);
                    }
                    if (proxyPort) {
                        args_1.push('--proxy-port', proxyPort);
                    }
                    if (proxyUser) {
                        args_1.push('--proxy-user', proxyUser);
                    }
                    if (proxyPass) {
                        args_1.push('--proxy-password', proxyPass);
                    }
                    args_1.push('--ew-integration', 'github-action 0.9.5');
                    return [4, (0, exec_1.exec)('ew-cli', args_1)];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    (0, core_1.warning)("ew-cli invoke failed: ".concat(e_1));
                    (0, core_1.setFailed)(e_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
invoke();
//# sourceMappingURL=index.js.map