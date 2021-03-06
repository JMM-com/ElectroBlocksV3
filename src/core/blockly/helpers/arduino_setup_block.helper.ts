import { getBlockByType, createBlock } from './block.helper';

/**
 * Creates the Arduino Setup Block
 *
 * @param {Blockly.workspace} workspace
 */
const showArduinoSetupBlock = () => {
  return createBlock('arduino_setup', 50, 10, false);
};

/**
 * Detaches all blocks connected to the setup block and the deletes it
 *
 * @param {Blockly.workspace} workspace
 */
const removeArduinoSetupBlock = () => {
  const block = getBlockByType('arduino_setup');

  // If the block was not found there is nothing do
  if (!block) {
    return;
  }

  // finds the block in the setup inputstatement field
  const firstBlockInSetup = block.getInputTargetBlock('setup');
  if (firstBlockInSetup) {
    // detaches it and moves it 100 pixels aways
    firstBlockInSetup.previousConnection.disconnect();
    firstBlockInSetup.moveBy(100, 100);
  }

  // This will delete the block
  block.dispose();
};

export const doesArduinoSetupBlockExist = () => {
  return getBlockByType('arduino_setup') !== undefined;
};

export { showArduinoSetupBlock, removeArduinoSetupBlock };
