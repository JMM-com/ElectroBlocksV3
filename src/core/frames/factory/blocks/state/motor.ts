import { StateGenerator } from '../../state.factories';
import { getInputValue } from '../../value.factories';
import {
  getDefaultIndexValue,
  findComponent,
  arduinoStateByComponent
} from '../../factory.helpers';
import {
  MotorState,
  MOTOR_DIRECTION
} from '../../../state/arduino-components.state';
import {
  ArduinoState,
  ArduinoComponentType
} from '../../../state/arduino.state';
import { findFieldValue } from '../../../../blockly/helpers/block-data.helper';

export const moveMotor: StateGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const motorNumber = getDefaultIndexValue(
    1,
    4,
    getInputValue(blocks, block, variables, timeline, 'MOTOR', 1, previousState)
  );

  const speed = getDefaultIndexValue(
    1,
    4000,
    getInputValue(blocks, block, variables, timeline, 'SPEED', 1, previousState)
  );

  const motorState = getMotorState(
    previousState,
    motorNumber,
    speed,
    findFieldValue(block, 'DIRECTION')
  );

  return [
    arduinoStateByComponent(
      block.id,
      timeline,
      motorState,
      `Motor ${
        motorState.motorNumber
      } moves ${motorState.direction.toLowerCase()} at speed ${
        motorState.speed
      }.`,
      previousState
    )
  ];
};

const getMotorState = (
  state: ArduinoState,
  motorNumber: number,
  speed: number,
  direction: MOTOR_DIRECTION
): MotorState => {
  if (!state) {
    return {
      pins: [],
      type: ArduinoComponentType.MOTOR,
      direction,
      speed,
      motorNumber
    };
  }

  const motorState = findComponent<MotorState>(
    state,
    ArduinoComponentType.MOTOR,
    undefined,
    motorNumber
  );

  if (!motorState) {
    return {
      pins: [],
      type: ArduinoComponentType.MOTOR,
      direction,
      speed,
      motorNumber
    };
  }

  return { ...motorState, direction, speed, motorNumber };
};