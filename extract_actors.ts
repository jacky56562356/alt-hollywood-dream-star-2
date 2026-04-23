import { GoogleGenAI, Type } from '@google/genai';
import * as fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const urls = [
  "https://i.ibb.co/fY46H6Dd/3.png",
  "https://i.ibb.co/v40LfrmN/4.png",
  "https://i.ibb.co/mVLL5mQs/2.png",
  "https://i.ibb.co/KpBnB6Mf/5.png",
  "https://i.ibb.co/7JMjy3DF/6.png",
  "https://i.ibb.co/60K4WqJV/7.png",
  "https://i.ibb.co/1YMZF3XS/9.png",
  "https://i.ibb.co/RJMv66s/Carin-Yates-Photography10-27-2024-2-pp-removebg-preview.png",
  "https://i.ibb.co/YF8W9F1R/20260106125626-1547-151.jpg",
  "https://i.ibb.co/Y7v0Wdb0/20250.jpg",
  "https://i.ibb.co/VF6CD9f/20250828205506-172-151.jpg",
  "https://i.ibb.co/Lzc28kLd/20250829092942-174-151.jpg",
  "https://i.ibb.co/C51JFvqS/20250829092953-175-151.jpg",
  "https://i.ibb.co/bgQnZQrP/1cbde033c8e622982d9b59686f383e73.jpg",
  "https://i.ibb.co/yTbPZXb/Wechat-IMG18.jpg",
  "https://i.ibb.co/VpH98tPD/retouched-Carin-Yates-Photography2-3-2024-retouched-sean4.jpg",
  "https://i.ibb.co/CKX0y0xN/Wechat-IMG1393.jpg",
  "https://i.ibb.co/F4K7rZqY/retouched-Carin-Yates-Photography2-3-2024-m-Scarlett-4169.jpg",
  "https://i.ibb.co/yc5YBNzL/retouched-Carin-Yates-Photography2-3-2024-Charlene-3m-30.jpg",
  "https://i.ibb.co/nsVwcdPG/20260122131604-1622-151.jpg",
  "https://i.ibb.co/3m7NqcW0/20260122132047-1628-151.jpg",
  "https://i.ibb.co/GfGWD3mn/20260122132516-1633-151.jpg",
  "https://i.ibb.co/RpLLMkCc/20260122134407-1644-151.jpg",
  "https://i.ibb.co/1kdG6hS/DSC00074-edited.jpg",
  "https://i.ibb.co/CT2wNVk/DSC00028-edited.jpg",
  "https://i.ibb.co/Z6FPqV6P/a1644427b71929307a2b9360bbca9fc3.jpg",
  "https://i.ibb.co/1f4HbvLx/DSC00033-edited.jpg"
];

async function processImages() {
  const results = [];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mimeType = response.headers.get('content-type') || 'image/jpeg';

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            inlineData: {
              data: base64,
              mimeType: mimeType
            }
          },
          "Extract the actor's name, age (or age range), skills/specialties, and credits/experience from this image. Return ONLY a valid JSON object with keys: 'name', 'ageRange', 'skills' (array of strings), 'credits' (array of strings). If a field is not found, use an empty string or empty array. Translate any Chinese text to English. Make sure the name is properly capitalized. If the image doesn't contain text, return empty strings/arrays."
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ageRange: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              credits: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });
      
      const data = JSON.parse(result.text);
      data.imageUrl = url;
      data.id = data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'unknown-' + Math.random().toString(36).substring(7);
      results.push(data);
      console.log(`Processed: ${data.name || url}`);
    } catch (e: any) {
      console.error(`Error processing ${url}:`, e.message);
    }
  }
  fs.writeFileSync('extracted_actors.json', JSON.stringify(results, null, 2));
  console.log('Done!');
}

processImages();
