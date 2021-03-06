import { SyncComponent, CreateComponent } from '../svg.component';
import { ArduinoComponentType } from '../../frames/arduino.frame';
import { ArduinoReceiveMessageState } from '../../frames/arduino-components.state';
import { Text, Svg } from '@svgdotjs/svg.js';
import { findSvgElement, LED_COLORS } from '../svg-helpers';

export const arduinoMessageUpdate: SyncComponent = (state, frame, draw) => {
  if (state.type !== ArduinoComponentType.MESSAGE) {
    return;
  }
  const messageState = state as ArduinoReceiveMessageState;
  const arduino = draw.findOne('#arduino_main_svg');

  if (!messageState.hasMessage) {
    arduino.findOne('#MESSAGE').hide();
    findSvgElement('RX_LED', arduino as Svg).fill(LED_COLORS.LED_OFF);
    return;
  }

  const txLedColor = frame.sendMessage ? LED_COLORS.LED_ON : LED_COLORS.LED_OFF;
  findSvgElement('TX_LED', arduino as Svg).fill(txLedColor);

  const message = getMessage(frame.sendMessage, messageState.message);

  arduino.findOne('#MESSAGE').show();

  const title = arduino.findOne('#MESSAGE_ARDUINO_TITLE') as Text;
  const textSvg1 = arduino.findOne('#MESSAGE_ARDUINO_LINE_1') as Text;
  const textSvg2 = arduino.findOne('#MESSAGE_ARDUINO_LINE_2') as Text;
  arduino.findOne('#MESSAGE').show();
  title.node.innerHTML = frame.sendMessage
    ? 'Sending Message:'
    : 'Receiving Message:';
  textSvg1.node.innerHTML = message.slice(0, 17);
  textSvg2.node.innerHTML = message.slice(17);
  findSvgElement('RX_LED', arduino as Svg).fill(
    frame.sendMessage ? LED_COLORS.LED_OFF : LED_COLORS.LED_ON
  );
};

export const arduinoMessageCreate: CreateComponent = (state, frame, draw) => {
  if (state.type !== ArduinoComponentType.MESSAGE) {
    return;
  }
  const arduino = draw.findOne('#arduino_main_svg');
  arduino.findOne('#MESSAGE').show();
};

const getMessage = (sendMessage: string, receiveMessage: string) => {
  if (sendMessage) {
    return sendMessage.length > 34
      ? sendMessage.slice(0, 31) + '...'
      : sendMessage;
  }

  return receiveMessage.length > 34
    ? receiveMessage.slice(0, 31) + '...'
    : receiveMessage;
};
