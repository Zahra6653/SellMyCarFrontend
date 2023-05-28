export const InventoryAction = (inventoryCars) => {
  console.log(inventoryCars)
    return {
      type: 'INVENTORY_CARS',
      payload: inventoryCars,
    };
  };

  export const InventorySearchAction=(searchCars)=>{
    console.log(searchCars)
    return {
      type: 'SEARCH_CARS',
      payload: searchCars,
    };
  }