/// <reference types="node" />
import { EventEmitter } from 'events';
import { results, Message, Receiver, SharedAccessSignature } from 'azure-iot-common';
import { RestApiClient } from './rest_api_client';
import { Callback, DeviceMethodParams } from './interfaces';
/**
 * @class           module:azure-iothub.Client
 * @classdesc       Creates an IoT Hub service client. Normally, consumers will
 *                  call one of the factory methods,
 *                  {@link module:azure-iothub.Client.fromConnectionString|fromConnectionString} or
 *                  {@link module:azure-iothub.Client.fromSharedAccessSignature|fromSharedAccessSignature},
 *                  to create an IoT Hub service Client.
 * @param {Object}       transport   An object that implements the interface
 *                                   expected of a transport object, e.g.,
 *                                   {@link module:azure-iothub~Transport|Transport}.
 */
export declare class Client extends EventEmitter {
    private _transport;
    private _restApiClient;
    constructor(transport: Client.Transport, restApiClient?: RestApiClient);
    /**
     * @method            module:azure-iothub.Client#open
     * @description       Opens the connection to an IoT hub.
     * @param {Function}  done    The function to call when the operation is
     *                            complete. `done` will be passed an Error object
     *                            argument, which will be null if the operation
     *                            completed successfully.
     */
    open(done?: Callback<results.Connected>): void;
    /**
     * @method            module:azure-iothub.Client#close
     * @description       Closes the connection to an IoT hub.
     * @param {Function}  done    The function to call when the operation is
     *                            complete. `done` will be passed an Error object
     *                            argument, which will be null if the operation
     *                            completed successfully.
     */
    close(done?: Callback<results.Disconnected>): void;
    /**
     * @method            module:azure-iothub.Client#send
     * @description       Sends a message to a device.
     * @param {String}    deviceId  The identifier of an existing device identity.
     * @param {}          message   The body of the message to send to the device.
     *                              If `message` is not of type
     *                              {@link module:azure-iot-common.Message|Message},
     *                              it will be converted.
     * @param {Function}  done      The function to call when the operation is
     *                              complete. `done` will be called with two
     *                              arguments: an Error object (can be null) and a
     *                              transport-specific response object useful for
     *                              logging or debugging.
     */
    send(deviceId: string, message: Message | Message.BufferConvertible, done?: Callback<results.MessageEnqueued>): void;
    /**
     * @method            module:azure-iothub.Client#invokeDeviceMethod
     * @description       Invokes a method on a particular device.
     * @param {String}    deviceId            The identifier of an existing device identity.
     * @param {Object}    params              An object describing the method and shall have the following properties:
     *                                        - methodName          The name of the method that shall be invoked.
     *                                        - payload             [optional] The payload to use for the method call.
     *                                        - timeoutInSeconds    [optional] The number of seconds IoT Hub shall wait for the device
     *                                                              to send a response before deeming the method execution a failure.
     * @param {Function}  done                The callback to call with the result of the method execution.
     *
     * @throws {ReferenceError}  If one of the required parameters is null, undefined or empty.
     * @throws {TypeError}       If one of the parameters is of the wrong type.
     */
    invokeDeviceMethod(deviceId: string, methodParams: DeviceMethodParams, done?: Callback<any>): void;
    /**
     * @method            module:azure-iothub.Client#getFeedbackReceiver
     * @description       Returns a AmqpReceiver object which emits events when new feedback messages are received by the client.
     * @param {Function}  done      The function to call when the operation is
     *                              complete. `done` will be called with two
     *                              arguments: an Error object (can be null) and a
     *                              AmqpReceiver object.
     */
    getFeedbackReceiver(done: Callback<Client.ServiceReceiver>): void;
    /**
     * @method            module:azure-iothub.Client#getFileNotificationReceiver
     * @description       Returns a AmqpReceiver object which emits events when new file upload notifications are received by the client.
     * @param {Function}  done      The function to call when the operation is
     *                              complete. `done` will be called with two
     *                              arguments: an Error object (can be null) and a
     *                              AmqpReceiver object.
     */
    getFileNotificationReceiver(done: Callback<Client.ServiceReceiver>): void;
    private _disconnectHandler(reason);
    /**
     * @method            module:azure-iothub.Client.fromConnectionString
     * @description       Creates an IoT Hub service client from the given
     *                    connection string using the default transport
     *                    ({@link module:azure-iothub~Transport|Transport}).
     *
     * @param {String}    connStr       A connection string which encapsulates "device
     *                                  connect" permissions on an IoT hub.
     * @param {Function}  Transport     A transport constructor.
     *
     * @returns {module:azure-iothub.Client}
     */
    static fromConnectionString(connStr: string, transportCtor?: Client.TransportCtor): Client;
    /**
     * @method            module:azure-iothub.Client.fromSharedAccessSignature
     * @description       Creates an IoT Hub service client from the given
     *                    shared access signature using the default transport
     *                    ({@link module:azure-iothub~Transport|Transport}).
     *
     * @param {String}    sharedAccessSignature   A shared access signature which encapsulates
     *                            "service connect" permissions on an IoT hub.
     * @param {Function}  Transport     A transport constructor.
     *
     * @returns {module:azure-iothub.Client}
     */
    static fromSharedAccessSignature(sharedAccessSignature: string, transportCtor: Client.TransportCtor): Client;
}
export declare namespace Client {
    type Callback<T> = (err: Error, result?: T) => void;
    interface TransportConfigOptions {
        host: string;
        hubName: string;
        keyName: string;
        sharedAccessSignature: string | SharedAccessSignature;
    }
    interface ServiceReceiver extends Receiver {
        complete(message: Message, done?: Callback<results.MessageCompleted>): void;
        abandon(message: Message, done?: Callback<results.MessageAbandoned>): void;
        reject(message: Message, done?: Callback<results.MessageRejected>): void;
    }
    interface Transport extends EventEmitter {
        connect(done?: Callback<results.Connected>): void;
        disconnect(done: Callback<results.Disconnected>): void;
        send(deviceId: string, message: Message, done?: Callback<results.MessageEnqueued>): void;
        getFeedbackReceiver(done: Callback<ServiceReceiver>): void;
        getFileNotificationReceiver(done: Callback<ServiceReceiver>): void;
    }
    type TransportCtor = new (config: Client.TransportConfigOptions) => Client.Transport;
}
