import { addPath, debug, exportVariable, getInput, setFailed, warning } from '@actions/core';
import { exec } from '@actions/exec';

const EW_CLI_URL = "https://maven.emulator.wtf/releases/ew-cli";

async function invoke() {
  try {
    const token = getInput('api-token', { required: true });
    const appApk = getInput('app-apk', { required: true });
    const testApk = getInput('test-apk', { required: true });
    const outputsDir = getInput('outputs-dir');

    let args = ['--app', appApk, '--test', testApk];

    if (outputsDir) {
      args.push('--outputs-dir', outputsDir);
    }

    exec('ew-cli', args);
  } catch (e) {
    warning(`ew-cli invoke failed: ${e}`);
    setFailed(e);
  }
}

invoke();
