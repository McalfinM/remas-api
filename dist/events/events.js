"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptions = exports.events = void 0;
exports.events = {
    vehicleBrand: {
        service: {
            create: 'onVehicleBrandServiceCreate',
            update: 'onVehicleBrandServiceUpdate',
            delete: 'onVehicleBrandServiceDelete'
        },
        sync: {
            requestInitialize: 'onVehicleBrandSyncRequestInitialize',
            initialize: 'onVehicleBrandSyncInitialize'
        }
    },
    vehicleType: {
        service: {
            create: 'onVehicleTypeServiceCreate',
            update: 'onVehicleTypeServiceUpdate',
            delete: 'onVehicleTypeServiceDelete'
        },
        sync: {
            requestInitialize: 'onVehicleTypeSyncRequestInitialize',
            initialize: 'onVehicleTypeSyncInitialize'
        }
    },
    vehicleModel: {
        service: {
            create: 'onVehicleModelServiceCreate',
            update: 'onVehicleModelServiceUpdate',
            delete: 'onVehicleModelServiceDelete'
        },
        sync: {
            requestInitialize: 'onVehicleModelSyncRequestInitialize',
            initialize: 'onVehicleModelSyncInitialize'
        }
    },
    vehicleSubType: {
        service: {
            create: 'onVehicleSubTypeServiceCreate',
            update: 'onVehicleSubTypeServiceUpdate',
            delete: 'onVehicleSubTypeServiceDelete'
        },
        sync: {
            requestInitialize: 'onVehicleSubTypeSyncRequestInitialize',
            initialize: 'onVehicleSubTypeSyncInitialize'
        }
    },
    vehicleSubTypeBrandCargoSize: {
        service: {
            create: 'onVehicleSubTypeBrandCargoSizeCreate',
            update: 'onVehicleSubTypeBrandCargoSizeUpdate',
            delete: 'onVehicleSubTypeBrandCargoSizeDelete'
        },
        sync: {
            requestInitialize: 'onVehicleSubTypeBrandCargoSizeSyncRequestInitialize',
            initialize: 'onVehicleSubTypeBrandCargoSizeSyncInitialize'
        }
    },
};
exports.subscriptions = [
    exports.events.vehicleBrand.sync.requestInitialize,
    exports.events.vehicleType.sync.requestInitialize,
    exports.events.vehicleModel.sync.requestInitialize,
    exports.events.vehicleSubType.sync.requestInitialize,
    exports.events.vehicleSubTypeBrandCargoSize.sync.requestInitialize
];
