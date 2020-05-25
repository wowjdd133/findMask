import MapStore from "./mapStore";
import CoronaStore from "./coronaStore";

const stores = {
  MapStore: new MapStore(),
  CoronaStore: new CoronaStore(),
};

export default stores;
