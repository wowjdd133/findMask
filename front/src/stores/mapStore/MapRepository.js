/* eslint-disable class-methods-use-this */
import axios from "axios";

class MapRepository {
  // maxM = 5000
  async getData(lat, lng, scope) {
    try {
      const data = await axios.get(
        `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${scope}`
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new MapRepository();
