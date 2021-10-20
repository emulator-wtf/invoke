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
        while (_) try {
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
exports.__esModule = true;
var core_1 = require("@actions/core");
var exec_1 = require("@actions/exec");
function invoke() {
    return __awaiter(this, void 0, void 0, function () {
        var token, appApk, testApk, outputsDir, devices, useOrchestrator, clearPackageData, withCoverage, additionalApks, environmentVariables, numShards, dirsToPull, args_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = (0, core_1.getInput)('api-token', { required: true });
                    appApk = (0, core_1.getInput)('app', { required: true });
                    testApk = (0, core_1.getInput)('test', { required: true });
                    outputsDir = (0, core_1.getInput)('outputs-dir');
                    devices = (0, core_1.getMultilineInput)('devices').filter(function (x) { return x.length > 0; });
                    useOrchestrator = (0, core_1.getInput)('use-orchestrator') && (0, core_1.getBooleanInput)('use-orchestrator');
                    clearPackageData = (0, core_1.getInput)('clear-package-data') && (0, core_1.getBooleanInput)('clear-package-data');
                    withCoverage = (0, core_1.getInput)('with-coverage') && (0, core_1.getBooleanInput)('with-coverage');
                    additionalApks = (0, core_1.getMultilineInput)('additional-apks').filter(function (x) { return x.length > 0; });
                    environmentVariables = (0, core_1.getMultilineInput)('environment-variables').filter(function (x) { return x.length > 0; });
                    numShards = (0, core_1.getInput)('num-uniform-shards');
                    dirsToPull = (0, core_1.getMultilineInput)('directories-to-pull').filter(function (x) { return x.length > 0; });
                    args_1 = ['--token', token, '--app', appApk, '--test', testApk];
                    if (outputsDir) {
                        args_1.push('--outputs-dir', outputsDir);
                    }
                    if (devices) {
                        devices.forEach(function (device) {
                            args_1.push('--device', device);
                        });
                    }
                    if (useOrchestrator) {
                        args_1.push('--use-orchestrator');
                    }
                    if (clearPackageData) {
                        args_1.push('--clearpackage-data');
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
                    if (numShards) {
                        args_1.push('--num-uniform-shards', numShards);
                    }
                    if (dirsToPull.length > 0) {
                        args_1.push('--directories-to-pull', dirsToPull.join(','));
                    }
                    return [4, (0, exec_1.exec)('ew-cli', args_1)];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    (0, core_1.warning)("ew-cli invoke failed: " + e_1);
                    (0, core_1.setFailed)(e_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
invoke();
//# sourceMappingURL=index.js.map