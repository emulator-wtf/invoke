import { getBooleanInput, getInput, getMultilineInput, setFailed, warning } from '@actions/core';
import { exec } from '@actions/exec';

async function invoke() {
  try {
    const token = getInput('api-token', { required: true });
    const appApk = getInput('app');
    const testApk = getInput('test');
    const libraryTestApk = getInput('library-test');
    const outputsDir = getInput('outputs-dir');
    const outputs = getInput('outputs');
    const recordVideo = getInput('record-video') && getBooleanInput('record-video');

    const devices = getMultilineInput('devices').filter(x => x.length > 0);
    const timeout = getInput('timeout')
    const useOrchestrator = getInput('use-orchestrator') && getBooleanInput('use-orchestrator');
    const clearPackageData = getInput('clear-package-data') && getBooleanInput('clear-package-data');
    const withCoverage = getInput('with-coverage') && getBooleanInput('with-coverage');

    const additionalApks = getMultilineInput('additional-apks').filter(x => x.length > 0);
    const environmentVariables = getMultilineInput('environment-variables').filter(x => x.length > 0);
    
    const numUniformShards = getInput('num-uniform-shards');
    const numShards = getInput('num-shards');
    const numBalancedShards = getInput('num-balanced-shards');

    const dirsToPull = getMultilineInput('directories-to-pull').filter(x => x.length > 0);

    const sideEffects = getInput('side-effects') && getBooleanInput('side-effects');
    const numFlakyTestAttempts = getInput('num-flaky-test-attempts');

    const fileCache = getInput('file-cache') ? getBooleanInput('file-cache') : true;
    const fileCacheTtl = getInput('file-cache-ttl');
    const testCache = getInput('test-cache') ? getBooleanInput('test-cache') : true;

    const async = getInput('async') && getBooleanInput('async');

    const args = ['--token', token];

    if (libraryTestApk) {
      if (appApk || testApk) {
        warning('library-test should be used without app and test');
        setFailed('library-test should be used without app and test');
        return;
      }
      args.push('--library-test', libraryTestApk);
    } else if (!appApk) {
      warning('app must be specified');
      setFailed('app must be specified');
      return;
    } else if (!testApk) {
      warning('test must be specified');
      setFailed('test must be specified');
      return;
    } else {
      args.push('--app', appApk, '--test', testApk);
    }

    if (outputsDir) {
      args.push('--outputs-dir', outputsDir);
    }

    if (outputs) {
      args.push('--outputs', outputs);
    }

    if (recordVideo) {
      args.push('--record-video');
    }

    if (devices) {
      devices.forEach(device => {
        args.push('--device', device);
      });
    }

    if (timeout) {
      args.push('--timeout', timeout);
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
    } else if (numBalancedShards) {
      args.push('--num-balanced-shards', numBalancedShards);
    }

    if (dirsToPull.length > 0) {
      args.push('--directories-to-pull', dirsToPull.join(','));
    }

    if (sideEffects) {
      args.push('--side-effects');
    }

    if (numFlakyTestAttempts) {
      args.push('--num-flaky-test-attempts', numFlakyTestAttempts);
    }

    if (!fileCache) {
      args.push('--no-file-cache');
    }

    if (fileCacheTtl) {
      args.push('--file-cache-ttl', fileCacheTtl);
    }

    if (!testCache) {
      args.push('--no-test-cache');
    }

    if (async) {
      args.push('--async');
    }

    await exec('ew-cli', args);
  } catch (e) {
    warning(`ew-cli invoke failed: ${e}`);
    setFailed(e);
  }
}

invoke();
