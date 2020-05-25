import { observable, action } from "mobx";
import MapRepository from "./MapRepository";

class MapStore {
  @observable.ref maskData = [];
  @observable.ref selectData = {};
  @observable loading = true;
  //주변 탐지범위
  m = 5000;
  remainStat = new Map()
    .set("plenty", ["100개 이상", "images/green.png"])
    .set("some", ["30~99개", "images/orange.png"])
    .set("few", ["2~29개", "images/red.png"])
    .set("empty", ["0~1개", "images/gray.png"])
    .set("break", ["판매 중지", "images/black.png"]);
  map = null;
  marker = [];
  overlay = [];

  //마커와 오버레이 숨기는 함수.
  //marker = marker.stat지님
  hideMarker(stats) {
    this.marker.forEach((data, index) => {
      data.marker.setVisible(true);
      this.overlay[index].setVisible(true);
      if (data.stat == "plenty") {
        if (!stats[0]) {
          data.marker.setVisible(false);
          this.overlay[index].setVisible(false);
        }
      } else if (data.stat == "some") {
        if (!stats[1]) {
          data.marker.setVisible(false);
          this.overlay[index].setVisible(false);
        }
      } else if (data.stat == "few") {
        if (!stats[2]) {
          data.marker.setVisible(false);
          this.overlay[index].setVisible(false);
        }
      } else if (data.stat == "empty") {
        if (!stats[3]) {
          data.marker.setVisible(false);
          this.overlay[index].setVisible(false);
        }
      } else if (data.stat == "break") {
        if (!stats[4]) {
          data.marker.setVisible(false);
          this.overlay[index].setVisible(false);
        }
      }
    });
  }

  //판매처 data 받아오는 함수.
  @action
  async getData(lat, lng) {
    this.loading = true;
    const data = await MapRepository.getData(lat, lng, this.m);
    this.maskData = data.data;
  }

  @action
  loadingComplete() {
    this.loading = false;
  }

  @action
  emptyingSelectData() {
    this.selectData = null;
  }

  //cick한 판매처의 code값을 통해 데이터 받아옴.
  getDataToCode(code) {
    this.selectData = this.maskData.stores.find((data) => data.code === code);
  }

  //받은 값에서 [0] 또는 [1]로 배열 내 값을 받으면 cannot read property 0,1 of underfined가 뜬다.
  getRemainStatToNum(stat) {
    try {
      let data = this.remainStat.get(stat);
      return Object.values(data)[0];
    } catch (err) {
      console.log(err);
    }
  }

  //stat에 맞는 이미지 src 반환
  getRemainStatToImage(stat) {
    try {
      let data = this.remainStat.get(stat);
      return Object.values(data)[1];
    } catch (err) {
      console.log(err);
    }
  }

  @action
  async addDistanceToData(lat, lon) {
    this.maskData.stores.map((store) => {
      store.remain_stat = this.getRemainStatToNum(store.remain_stat);
      store.distance = this.getDistanceFromLatLon(
        lat,
        store.lat,
        lon,
        store.lng
      );
    });
  }

  @action
  async sortData() {
    this.maskData.stores.sort((a, b) =>
      a.distance < b.distance ? -1 : a.distance == b.distance ? 0 : 1
    );
  }

  @action
  async changeTimeToElapsedTime() {
    await this.maskData.stores.map((store) => {
      store.stock_at = this.getElaspedTime(store.stock_at);
    });
  }

  getElaspedTime(time) {
    const now = new Date();
    const timeValue = new Date(
      (time || "").replace(/-/g, "/").replace(/[TZ]/g, " ").split(".")[0]
    );
    const min = 60;
    //date.getTime() -> msec. so /1000
    let elaspedTime;
    elaspedTime = (now.getTime() - timeValue.getTime()) / 1000;

    let result = "0분전";

    if (elaspedTime < min) return result;
    else if (elaspedTime < min * 60)
      result = Math.floor(elaspedTime / min) + "분 전";
    else if (elaspedTime < min * 60 * 24)
      result = Math.floor(elaspedTime / min / 60) + "시간 전";
    else result = Math.floor(elaspedTime / min / 60 / 24) + "일 전";

    console.log(time + "    " + result);

    return result;
  }

  getDistanceFromLatLon(lat1, lat2, lon1, lon2) {
    const deg2rad = (deg) => {
      return (deg * Math.PI) / 180.0;
    };

    const rad2deg = (rad) => {
      return (rad * 180) / Math.PI;
    };

    let theta = lon1 - lon2;
    let dist =
      Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));

    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;

    return (dist * 1.609344).toFixed(2);
  }
}

export default MapStore;
