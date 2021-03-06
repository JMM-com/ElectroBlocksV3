import { BlockToFrameTransformer } from '../block-to-frame.transformer';
import { getInputValue } from '../block-to-value.factories';
import {
  arduinoStateByExplanation,
  generateInputState,
} from '../frame-transformer.helpers';

export const ifElse: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const excuteBlocksInsideIf = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'IF0',
    false,
    previousState
  );

  if (excuteBlocksInsideIf) {
    const explanation =
      'Executing blocks inside "DO" because what is connected is true.';
    const ifFrame = arduinoStateByExplanation(
      block.id,
      block.blockName,
      timeline,
      explanation
    );
    return [
      ifFrame,
      ...generateInputState(
        block,
        blocks,
        variables,
        timeline,
        'DO0',
        previousState
      ),
    ];
  }

  if (block.inputStatements.find((i) => i.name === 'ELSE')) {
    const explanation =
      'Executing blocks inside "ELSE" because what is connected is false.';
    const ifFrame = arduinoStateByExplanation(
      block.id,
      block.blockName,
      timeline,
      explanation
    );
    return [
      ifFrame,
      ...generateInputState(
        block,
        blocks,
        variables,
        timeline,
        'ELSE',
        previousState
      ),
    ];
  }
  const explanation =
    'Not executing blocks inside "DO" because waht is connected is false.';
  return [
    arduinoStateByExplanation(block.id, block.blockName, timeline, explanation),
  ];
};
