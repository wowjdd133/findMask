import { observable, action } from "mobx";
import MapRepository from "./MapRepository";

class MapStore {
  @observable.ref maskData = [];
  m = 5000;
  @observable.ref selectData = {};
  remainStat = new Map()
    .set("plenty", ["100개 이상", "images/green.png"])
    .set("some", ["30~99개", "images/orange.png"])
    .set("few", ["2~29개", "images/red.png"])
    .set("empty", ["0~1개", "images/gray.png"])
    .set("break", ["판매 중지", "images/black.png"]);
  map = null;
  marker = [];
  // constructor() {
  //   this.remainStat.set("plenty", "100개 이상")
  //   this.remainStat.set("some", "30~99개")
  //   this.remainStat.set("few", "2~29개")
  //   this.remainStat.set("empty", "0~1개")
  //   this.remainStat.set("break", "판매 중지");
  // }

  setMap(map) {
    this.map(map);
  }

  getMap() {
    return map;
  }

  setMarker(marker, stat) {
    this.marker.push({ marker, stat });
  }

  getMarker() {
    console.log(this.marker);
  }

  hideMarker(stats) {
    this.marker.forEach((data) => {
      data.marker.setVisible(true);
      if (data.stat == "plenty") {
        if (!stats[0]) data.marker.setVisible(false);
      } else if (data.stat == "some") {
        if (!stats[1]) data.marker.setVisible(false);
      } else if (data.stat == "few") {
        if (!stats[2]) data.marker.setVisible(false);
      } else if (data.stat == "empty") {
        if (!stats[3]) data.marker.setVisible(false);
      } else if (data.stat == "break") {
        if (!stats[4]) data.marker.setVisible(false);
      }
    });
  }

  @action
  async getData(lat, lng) {
    // console.log("lat: ", lat, "lng: ", lng);
    // await MapRepository.getData(lat, lng, this.m);
    const data = await MapRepository.getData(lat, lng, this.m);

    this.maskData = data.data;
  }

  getDataToCode(code) {
    this.selectData = this.maskData.stores.find((data) => data.code === code);
  }

  //받은 값에서 [0] 또는 [1]로 배열 내 값을 받으면 cannot read property 0,1 of underfined가 뜬다.
  getRemainStatToNum(stat) {
    let data = this.remainStat.get(stat);
    // console.log(data);
    return Object.values(data)[0];
  }

  getRemainStatToImage(stat) {
    // return Object.values(this.remainStat.get(stat))[1] || "";
    // console.log(typeof this.remainStat.get(stat));
    // console.log(this.remainStat.get(stat));
    try {
      let data = this.remainStat.get(stat);
      console.log(data);
      return Object.values(data)[1];
    } catch (err) {
      console.log(err);
    }
  }
}

export default MapStore;
