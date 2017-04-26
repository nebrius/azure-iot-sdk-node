export declare type ConnectionState = 'connected' | 'disconnected';
export declare type DeviceStatus = 'enabled' | 'disabled';
export interface DeviceIdentity {
    deviceId: string;
    generationId?: string;
    etag?: string;
    connectionState?: ConnectionState;
    status?: DeviceStatus;
    statusReason?: string;
    connectionStateUpdatedTime?: string;
    statusUpdatedTime?: string;
    lastActivityTime?: string;
    cloudToDeviceMessageCount?: string;
    authentication?: Device.Authentication;
}
/**
 * @deprecated
 * @class           module:azure-iothub.Device
 * @classdesc       Creates a representation of a device for use in the
 *                  identity {@link module:azure-iothub.Registry} APIs.
 * @param {String}  jsonData        An optional JSON representation of the
 *                                  device, which will be mapped to properties
 *                                  in the object. If no argument is provided,
 *                                  Device roperties will be assigned default
 *                                  values.
 * @prop {String}   deviceId        Unique device identifier
 * @prop {String}   generationId    Used to disambiguate devices that have been
 *                                  deleted/recreated with the same `deviceId`
 * @prop {String}   etag            Weak entity tag assigned to this device
 *                                  identity description
 * @prop {String}   connectionState Whether the device is 'connected' or
 *                                  'disconnected'
 * @prop {String}   status          'enabled' (device authorized to connect,
 *                                  can send/receive messages) or 'disabled'
 * @prop {String}   statusReason    128-character string set when the device is
 *                                  disabled
 * @prop {String}   connectionStateUpdatedTime  Timestamp representing the last
 *                                  time `connectionState` changed
 * @prop {String}   statusUpdatedTime Timestamp representing the last time
 *                                  `status` changed
 * @prop {String}   lastActivityTime  Timestamp representing the last time the
 *                                  device authenticated, sent a message, or
 *                                  received a message
 * @prop {String}   cloudToDeviceMessageCount Number of c2d messages waiting to
 *                                  by delivered to the device
 * @prop {Object}   authentication  Contains the symmetric keys used to
 *                                  authenticate this device
 */
export declare class Device implements DeviceIdentity {
    deviceId: string;
    generationId?: string;
    etag?: string;
    connectionState?: ConnectionState;
    status?: DeviceStatus;
    statusReason?: string;
    connectionStateUpdatedTime?: string;
    statusUpdatedTime?: string;
    lastActivityTime?: string;
    cloudToDeviceMessageCount?: string;
    authentication?: Device.Authentication;
    constructor(jsonData?: any);
}
export declare namespace Device {
    interface _SymmetricKey {
        primaryKey: string;
        secondaryKey: string;
    }
    interface Authentication {
        SymmetricKey?: _SymmetricKey;
        symmetricKey?: _SymmetricKey;
        x509Thumbprint?: X509Thumbprints;
    }
    interface X509Thumbprints {
        primaryThumbprint?: string;
        secondaryThumbprint?: string;
    }
}
