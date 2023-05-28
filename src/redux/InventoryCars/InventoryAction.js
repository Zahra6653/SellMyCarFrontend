export const InventoryAction = (inventoryCars) => {
    return {
      type: 'INVENTORY_CARS',
      payload: inventoryCars,
    };
  };

  export const InventorySearchAction=(searchCars)=>{
    return {
      type: 'SEARCH_CARS',
      payload: searchCars,
    };
  }