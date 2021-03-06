import { BlockToFrameTransformer } from '../block-to-frame.transformer';
import { getInputValue } from '../block-to-value.factories';
import _ from 'lodash';
import {
  generateInputState,
  arduinoStateByExplanation,
  arduinoStateByVariable,
} from '../frame-transformer.helpers';
import { findFieldValue } from '../../../blockly/helpers/block-data.helper';
import { Variable } from '../../arduino.frame';
import { VariableTypes } from '../../../blockly/dto/variable.type';

export const simpleLoop: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const times = Math.abs(
    getInputValue(blocks, block, variables, timeline, 'TIMES', 1, previousState)
  );

  return _.range(1, times + 1).reduce((prev, next) => {
    const beforeState = _.isEmpty(prev) ? previousState : prev[prev.length - 1];

    const loopFrame = arduinoStateByExplanation(
      block.id,
      block.blockName,
      timeline,
      `Running loop ${next} out of ${times} times.`,
      beforeState
    );

    return [
      ...prev,
      loopFrame,
      ...generateInputState(
        block,
        blocks,
        variables,
        timeline,
        'DO',
        loopFrame
      ),
    ];
  }, []);
};

export const forLoop: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const from = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'FROM',
    1,
    previousState
  );

  const to = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'TO',
    1,
    previousState
  );

  const by = Math.abs(
    getInputValue(blocks, block, variables, timeline, 'BY', 1, previousState)
  );

  const multiplyBy = from > to ? -1 : 1;

  let prevState = previousState;
  return _.range(from, to + multiplyBy, by * multiplyBy)
    .map((i, counter, array) => {
      const variableData = variables.find(
        (v) => v.id === findFieldValue(block, 'VAR')
      );

      const newVariable: Variable = {
        id: variableData.id,
        name: variableData.name,
        value: i,
        type: VariableTypes.NUMBER,
      };
      const loopFrame = arduinoStateByVariable(
        block.id,
        block.blockName,
        timeline,
        newVariable,
        `Running loop ${counter + 1} out ${array.length} times; i = ${i}`,
        prevState
      );
      const states = [
        loopFrame,
        ...generateInputState(
          block,
          blocks,
          variables,
          timeline,
          'DO',
          loopFrame
        ),
      ];
      prevState = _.cloneDeep(states[states.length - 1]);

      return states;
    })
    .flat(2);
};
