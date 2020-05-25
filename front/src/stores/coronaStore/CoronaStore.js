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
        console.log(result);
        this.cityData = result;
      });
    } catch (err) {
      console.error(err);
    }
  }

  @action
  async addCityDataToLonLat(data) {
    console.log(data);
    data = mapInfo.map((info) => {
      Object.values(data).forEach((data) => {
        if (data != undefined) {
          if (info.name === data.countryName) {
            // data.lon = info.lon;
            // data.lat = info.lat;
            info = { ...data, ...info };
          }
        }
      });
      return info;
    });
    return data;
  }
  // console.log(this.cityData);
  // console.log(mapInfo);
  // // mapInfo.map((info) => {
  // //   Object.values(this.cityData).forEach((data) => {
  // //     if (data != undefined) {
  // //       if (info.name === data.countryName) {
  // //         // data.lon = info.lon;
  // //         // data.lat = info.lat;
  // //         info = { ...data, ...info };
  // //       }
  // //     }
  // //   });
  // //   return info;
  // // });
  // Object.values(this.cityData).forEach((data) => {
  //   if (data != undefined) {
  //     mapInfo.map((info) => {
  //       if (info.name === data.countryName) {
  //         info = { ...info, ...data };
  //         console.log(info);
  //       }
  //     });
  //   }
  // });
  // this.cityData = mapInfo;
}

export default CoronaStore;
