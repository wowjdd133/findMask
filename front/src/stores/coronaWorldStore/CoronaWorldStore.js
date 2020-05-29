import { action, observable, computed } from "mobx";
import CoronaWorldRepository from "./CoronaWorldRepository";
import moment from "moment";

class CoronaWorldStore {
  @observable.ref
  worldData = [];
  @observable.ref
  worldWIPData = [];

  @action
  async getWorldData() {
    try {
      this.sleep(2000);
      console.log("get worldData");
      const data = await CoronaWorldRepository.getWorldData();
      this.worldData = data;
    } catch (err) {
      console.error(err);
    }
  }

  sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  @action
  async getWorldWIPDataToISODate() {
    try {
      console.log("get worldWPIData");
      const now = this.getNowTimeToTZero();
      const prev = this.getTimeToPrev();
      const data = await CoronaWorldRepository.getWorldWIPDataToISODate(
        prev.toISOString(),
        now.toISOString()
      );
      this.worldWIPData = data;
    } catch (err) {
      console.error(err);
    }
  }

  getNowTimeToTZero() {
    let now = moment();
    now.set("hour", 0);
    now.set("minute", 0);
    now.set("second", 0);
    now.set("millisecond", 0);

    return now;
  }

  getTimeToPrev() {
    let prev = moment();
    prev.subtract(90, "days");
    return prev;
  }
}

export default CoronaWorldStore;
