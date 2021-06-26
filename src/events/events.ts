
export const events = {
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

export const subscriptions = [
  events.vehicleBrand.sync.requestInitialize,
  events.vehicleType.sync.requestInitialize,
  events.vehicleModel.sync.requestInitialize,
  events.vehicleSubType.sync.requestInitialize,
  events.vehicleSubTypeBrandCargoSize.sync.requestInitialize
]

