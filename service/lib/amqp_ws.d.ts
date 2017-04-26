import { Amqp } from './amqp';
import { Client } from './Client';
/**
 * @class       module:azure-iothub.AmqpWs
 * @classdesc   Constructs an {@linkcode Amqp} object that can be used in an application
 *              to connect to IoT Hub instance, using the AMQP protocol over secure websockets.
 *              This class overloads the constructor of the base {@link module:azure-iothub--amqp:Amqp} class from the AMQP transport, and inherits all methods from it.
 */
export declare class AmqpWs extends Amqp implements Client.Transport {
    constructor(config: Client.TransportConfigOptions);
    protected _getConnectionUri(): string;
}
