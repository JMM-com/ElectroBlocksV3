import { ValueGenerator, getInputValue } from '../block-to-value.factories';
import { findFieldValue } from '../../../blockly/helpers/block-data.helper';
import { hexToRgb } from '../../../blockly/helpers/color.helper';
import _ from 'lodash';

export const colorPicker: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const color = findFieldValue(block, 'COLOUR');

  return hexToRgb(color);
};

export const randomColor: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  return {
    red: _.random(1, 256),
    green: _.random(1, 256),
    blue: _.random(1, 256),
  };
};

export const rgbColor: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const red = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'RED',
    0,
    previousState
  );
  const green = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'GREEN',
    0,
    previousState
  );
  const blue = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    'BLUE',
    0,
    previousState
  );

  return {
    red,
    green,
    blue,
  };
};
