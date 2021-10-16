import { getBooleanInput, getInput, getMultilineInput, setFailed, warning } from '@actions/core';
import { exec } from '@actions/exec';

async function invoke() {
  try {
    const token = getInput('api-token', { required: true });
    const appApk = getInput('app-apk', { required: true });
    const testApk = getInput('test-apk', { required: true });
    const outputsDir = getInput('outputs-dir');

    const devices = getMultilineInput('devices');
    const useOrchestrator = getInput('use-orchestrator') && getBooleanInput('use-orchestrator');
    const clearPackageData = getInput('clear-package-data') && getBooleanInput('clear-package-data');
    const withCoverage = getInput('with-coverage') && getBooleanInput('with-coverage');

    const additionalApks = getMultilineInput('additional-apks');
    const environmentVariables = getMultilineInput('environment-variables');
    
    const numShards = getInput('num-uniform-shards');

    const dirsToPull = getMultilineInput('directories-to-pull');

    let args = ['--token', token, '--app', appApk, '--test', testApk];

    if (outputsDir) {
      args.push('--outputs-dir', outputsDir);
    }

    if (devices) {
      devices.forEach(device => {
        args.push('--device', device)
      });
    }

    if (useOrchestrator) {
      args.push('--use-orchestrator');
    }

    if (clearPackageData) {
      args.push('--clearpackage-data');
    }

    if (withCoverage) {
      args.push('--with-coverage');
    }

    if (additionalApks) {
      args.push('--additional-apks', additionalApks.join(','));
    }

    // TODO(madis): this format sucks, support repeats here in CLI?
    if (environmentVariables) {
      args.push('--environment-variables', environmentVariables.join(','));
    }

    if (numShards) {
      args.push('--num-uniform-shards', numShards);
    }

    if (dirsToPull) {
      args.push('--directories-to-pull', dirsToPull.join(','));
    }

    await exec('ew-cli', args);
  } catch (e) {
    warning(`ew-cli invoke failed: ${e}`);
    setFailed(e);
  }
}

invoke();
