import coronaAPI from "../../apis/coronaApi";

class CoronaRepository {
  async getKoreaData() {
    try {
      const { data } = await coronaAPI.get();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async getCityData() {
    try {
      const { data } = await coronaAPI.get("/country/new");
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new CoronaRepository();
