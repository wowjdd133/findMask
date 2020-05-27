import MapStore from "./mapStore";
import CoronaStore from "./coronaStore";
import CoronaWorldStore from "./coronaWorldStore";

const stores = {
  MapStore: new MapStore(),
  CoronaStore: new CoronaStore(),
  CoronaWorldStore: new CoronaWorldStore(),
};

export default stores;
