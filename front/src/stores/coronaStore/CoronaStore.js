import CoronaRepository from "./CoronaRepository";
import { observable, action } from "mobx";
import mapInfo from "../../data/map/mapInfo";

class CoronaStore {
  @observable.ref
  koreaData = [];
  @observable.ref
  cityData = [];

  @action
  async getKoreaData() {
    try {
      const data = await CoronaRepository.getKoreaData();
      this.koreaData = data;
    } catch (err) {
      console.error(err);
    }
  }

  @action
  async getCityData() {
    try {
      const data = await CoronaRepository.getCityData();
      this.addCityDataToLonLat(data).then((result) => {
        this.cityData = result;
      });
    } catch (err) {
      console.error(err);
    }
  }

  @action
  async addCityDataToLonLat(data) {
    data = mapInfo.map((info) => {
      Object.values(data).forEach((data) => {
        if (data != undefined) {
          if (info.name === data.countryName) {
            info = { ...data, ...info };
          }
        }
      });
      return info;
    });
    return data;
  }
}

export default CoronaStore;
