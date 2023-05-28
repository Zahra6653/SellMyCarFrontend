const initialState = {
    inventoryCars:[],
    searchCars:{}
  };
  
  const InventoryReducers = (state = initialState, action) => {
    switch (action.type) {
      case 'INVENTORY_CARS':
        return {
          ...state,
          inventoryCars: action.payload,
        };
        case 'SEARCH_CARS':
        return {
          ...state,
          searchCars: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default InventoryReducers;