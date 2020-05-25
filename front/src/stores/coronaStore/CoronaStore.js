import CoronaRepository from "./CoronaRepository";
import { observable, action } from "mobx";

class CoronaStore {
  @observable
  koreaData = [];
  @observable
  cityData = [];

  @action
  async getKoreaData() {
    try {
      const data = await CoronaRepository.getKoreaData();

      console.log(data);
      this.koreaData = data;
    } catch (err) {
      console.error(err);
    }
  }

  @action
  async getCityData() {
    try {
      const data = await CoronaRepository.getCityData();
      this.cityData = data;
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default CoronaStore;
