import {
  VariableAction,
  ForLoopTextChange,
  UpdateSetupSensorBlockFields,
  UpdateSetupSensorBlockLoop,
  DisableBlock,
  EnableBlock,
  SaveSetupSensorData,
  ActionType,
  Action
} from './actions/actions';
import { deleteVariable } from './helpers/variable.helper';
import { getBlockById } from './helpers/block.helper';

export interface Updater {
  (action: Action): void;
}

const updateVariable = (action: VariableAction) => {
  if (action.actionType === 'delete') {
    deleteVariable(action.variableId);
  }
};

const updateForLoop = (action: ForLoopTextChange) => {
  const block = getBlockById(action.blockId);

  block.inputList[2].fieldRow[0].setValue(action.changeText);
};

const updateSetupSensorBlockFields = (action: UpdateSetupSensorBlockFields) => {
  const block = getBlockById(action.blockId);
  action.fields.forEach((field) => {
    block.setFieldValue(field.value, field.name);
  });
};

const updateSetupSensorBlockLoopField = (
  action: UpdateSetupSensorBlockLoop
) => {
  const block = getBlockById(action.blockId);
  block.setFieldValue(action.loop.toString(), 'LOOP');
};

const updateDisableBlock = (action: DisableBlock) => {
  const block = getBlockById(action.blockId);

  if (block.isEnabled()) {
    block.setEnabled(false);
  }

  block.setWarningText(action.warningText);
};

const updateEnableBlock = (action: EnableBlock) => {
  const block = getBlockById(action.blockId);

  if (!block.isEnabled()) {
    block.setEnabled(true);
    block.setWarningText(null);
  }
};

const updateSensorBlockData = (action: SaveSetupSensorData) => {
  const block = getBlockById(action.blockId);

  block.data = action.data;
};

const updaterList: { [key: string]: Updater } = {
  [ActionType.DELETE_VARIABLE]: updateVariable,
  [ActionType.DISABLE_BLOCK]: updateDisableBlock,
  [ActionType.ENABLE_BLOCK]: updateEnableBlock,
  [ActionType.FOR_LOOP_BLOCK_CHANGE]: updateForLoop,
  [ActionType.SETUP_SENSOR_BLOCK_FIELD_UPDATE]: updateSetupSensorBlockFields,
  [ActionType.SETUP_SENSOR_BLOCK_LOOP_FIELD_UPDATE]: updateSetupSensorBlockLoopField,
  [ActionType.SETUP_SENSOR_BLOCK_SAVE_DEBUG_DATA]: updateSensorBlockData
};

export const updater = (action: Action) => {
  if (!updaterList[action.type]) {
    throw new Error('No updater found for action type: ' + action.type);
  }

  return updaterList[action.type](action);
};
