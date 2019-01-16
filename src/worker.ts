import {parentPort, workerData} from 'worker_threads';
import {WorkerMessage} from './index';

// Load the target module. The expectation is that the module has functions
// exported as named properties.
const target = require(workerData.filename);

parentPort!.on('message', async (message: WorkerMessage) => {
  try {
    const result = await target[message.functionName](...message.args);
    parentPort!.postMessage(result);
  } catch (e) {
    parentPort!.postMessage(e);
  }
});