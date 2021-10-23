import { getBooleanInput, getInput, getMultilineInput, setFailed, warning } from '@actions/core';
import { exec } from '@actions/exec';

async function invoke() {
  try {
    const token = getInput('api-token', { required: true });
    const appApk = getInput('app', { required: true });
    const testApk = getInput('test', { required: true });
    const outputsDir = getInput('outputs-dir');

    const devices = getMultilineInput('devices').filter(x => x.length > 0);
    const useOrchestrator = getInput('use-orchestrator') && getBooleanInput('use-orchestrator');
    const clearPackageData = getInput('clear-package-data') && getBooleanInput('clear-package-data');
    const withCoverage = getInput('with-coverage') && getBooleanInput('with-coverage');

    const additionalApks = getMultilineInput('additional-apks').filter(x => x.length > 0);
    const environmentVariables = getMultilineInput('environment-variables').filter(x => x.length > 0);
    
    const numUniformShards = getInput('num-uniform-shards');
    const numShards = getInput('num-shards');

    const dirsToPull = getMultilineInput('directories-to-pull').filter(x => x.length > 0);

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
      args.push('--clear-package-data');
    }

    if (withCoverage) {
      args.push('--with-coverage');
    }

    if (additionalApks.length > 0) {
      args.push('--additional-apks', additionalApks.join(','));
    }

    if (environmentVariables.length > 0) {
      args.push('--environment-variables', environmentVariables.join(','));
    }

    if (numShards) {
      args.push('--num-shards', numShards);
    } else if (numUniformShards) {
      args.push('--num-uniform-shards', numUniformShards);
    }

    if (dirsToPull.length > 0) {
      args.push('--directories-to-pull', dirsToPull.join(','));
    }

    await exec('ew-cli', args);
  } catch (e) {
    warning(`ew-cli invoke failed: ${e}`);
    setFailed(e);
  }
}

invoke();
