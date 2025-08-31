var express = require("express")
var router =  express.Router()

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");
const { default: axios } = require("axios");

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyCU12yA_xs2WllbOG1FMLGyfrQwgA45SuQ");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [
  ],
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage("Anh muốn hỏi về lịch sử hình thành sài gòn, việt nam ?");
  // TODO: Following code needs to be updated for client-side apps.
  const candidates = result.response.candidates;
  for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if(part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  console.log(result.response.text());
  return result.response.text()
}


router.get('/api/ai', async (req, res)=> {
    let result = await run()
    res.send(result)
})

async function runpromt(jsonData) { // Nhận dữ liệu JSON làm tham số
  try {
    const prompt = `Phân tích dữ liệu JSON sau:
${JSON.stringify(jsonData.data)}
Hãy đưa ra nhận xét, các chỉ số thống kê, và tóm tắt thông tin quan trọng.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });
    const response = result.response;
    const text = response.text();

    console.log(text);
    return text;
  } catch (error) {
    console.error("Lỗi khi gọi API Gemini:", error);
    return "Lỗi khi xử lý yêu cầu.";
  }
}

router.get("/api/analyze", async (req, res) => { // Sử dụng POST thay vì GET

  // const jsonData = req.body; // Lấy dữ liệu JSON từ request body
  const uri = "http://127.0.0.1:4000/apis/bizfly/laydata"
  const jsonData = await axios.get(uri)

  if (!jsonData) {
    return res.status(400).send("Không có dữ liệu JSON được cung cấp.");
  }

  const result = await runpromt(jsonData);
  res.send(result);
})

module.exports = router