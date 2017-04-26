/// <reference types="node" />
import { EventEmitter } from 'events';
import { results, Message } from 'azure-iot-common';
import { Amqp as Base } from 'azure-iot-amqp-base';
import { Callback } from './interfaces';
import { Client } from './Client';
/**
 * @class       module:azure-iothub.Amqp
 * @classdesc   Constructs an {@linkcode Amqp} object that can be used in an application
 *              to connect to IoT Hub instance, using the AMQP protocol.
 *
 * @params {Object}  config    The configuration object that should be used to connect to the IoT Hub service.
 * @params {Object}  amqpBase  OPTIONAL: The Base AMQP transport object. Amqp will use azure-iot-common.Amqp if no argument is provided.
 */
export declare class Amqp extends EventEmitter implements Client.Transport {
    protected _config: Client.TransportConfigOptions;
    private _amqp;
    private _renewalTimeout;
    private _renewalNumberOfMilliseconds;
    constructor(config: Client.TransportConfigOptions, amqpBase?: Base);
    /**
     * @method             module:azure-iothub.Amqp#connect
     * @description        Establishes a connection with the IoT Hub instance.
     * @param {Function}   done   Called when the connection is established of if an error happened.
     */
    connect(done: Callback<results.Connected>): void;
    /**
     * @method             module:azure-iothub.Amqp#disconnect
     * @description        Disconnects the link to the IoT Hub instance.
     * @param {Function}   done   Called when disconnected of if an error happened.
     */
    disconnect(done: Callback<results.Disconnected>): void;
    /**
     * @method             module:azure-iothub.Amqp#send
     * @description        Sends a message to the IoT Hub.
     * @param {Message}  message    The [message]{@linkcode module:common/message.Message}
     *                              to be sent.
     * @param {Function} done       The callback to be invoked when `send`
     *                              completes execution.
     */
    send(deviceId: string, message: Message, done: Callback<results.MessageEnqueued>): void;
    /**
     * @deprecated
     * @method             module:azure-iothub.Amqp#getReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    getReceiver(done: Callback<any>): void;
    /**
     * @method             module:azure-iothub.Amqp#getFeedbackReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    getFeedbackReceiver(done: Callback<any>): void;
    /**
     * @method             module:azure-iothub.Amqp#getFileNotificationReceiver
     * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
     * @param {Function}   done      Callback used to return the {@linkcode AmqpReceiver} object.
     */
    getFileNotificationReceiver(done: Callback<any>): void;
    protected _getConnectionUri(): string;
    private _handleSASRenewal();
}
