import { BlockEvent } from '../../../dto/event.type';
import { DisableBlock, ActionType } from '../../actions';
import { multipleTopBlocks } from '../../../dto/block.type';
import { ARDUINO_UNO_PINS } from '../../../selectBoard';

// This happens when the arduino runs out of a certain type of pin
// The drop down box will populate with NO_PINS in it
// These blocks should be disabled so that don't get processed
export const disableSetupBlocksUsingSamePinNumbers = (
  event: BlockEvent
): DisableBlock[] => {
  const { blocks } = event;
  return blocks
    .filter((block) => multipleTopBlocks.includes(block.blockName))
    .filter((block) => block.blockName !== 'procedures_defnoreturn')
    .filter((block) => block.pins.includes(ARDUINO_UNO_PINS.NO_PINS))
    .map((block) => {
      return {
        blockId: block.id,
        warningText: 'Arduino is out of pins',
        type: ActionType.DISABLE_BLOCK,
      };
    });
};
