import { axiosInstance } from "../../../shared/lib/axiosInstance";

class AiApi {
  static async generateText(prompt) {
    const response = await axiosInstance.post("/ai/generate", prompt);

    return response.data;
  }
}

export default AiApi;
