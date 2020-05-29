import coronaAPI from "../../apis/coronaWorldAPI";

class CoronaWorldRepository {
  async getWorldData() {
    try {
      const { data } = await coronaAPI.get("/summary");
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async getWorldWIPDataToISODate(prevTime, nowTime) {
    console.log(`/world?from=${prevTime}&to=${nowTime}`);
    try {
      const { data } = await coronaAPI.get(
        `/world?from=${prevTime}&to=${nowTime}`
      );
      //api.covid19api.com/world?from=2020-05-21T00:00:00Z&to=2020-05-28T00:00:00Z
      https: return data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new CoronaWorldRepository();
