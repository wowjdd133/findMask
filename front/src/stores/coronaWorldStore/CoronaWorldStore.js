import { action, observable } from "mobx";
import CoronaWorldRepository from "./CoronaWorldRepository";

class CoronaWorldStore {
  @observable.ref
  worldData = [];

  @action
  async getWorldData() {
    try {
      const data = await CoronaWorldRepository.getWorldData();
      this.worldData = data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default CoronaWorldStore;
