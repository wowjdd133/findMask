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
}

export default new CoronaWorldRepository();
