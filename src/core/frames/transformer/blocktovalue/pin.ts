import { ValueGenerator } from '../block-to-value.factories';
import { findComponent } from '../frame-transformer.helpers';
import { PinState } from '../../arduino-components.state';
import { PinSensor } from '../../../blockly/dto/sensors.type';
import { ArduinoComponentType } from '../../arduino.frame';
import { findFieldValue } from '../../../blockly/helpers/block-data.helper';

export const getPinState = (setupBlockType: string): ValueGenerator => {
  return (blocks, block, variables, timeline, previousState) => {
    return findComponent<PinState>(
      previousState,
      ArduinoComponentType.PIN,
      findFieldValue(block, 'PIN')
    ).state;
  };
};
