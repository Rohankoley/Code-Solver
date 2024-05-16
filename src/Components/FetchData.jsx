import { GoogleGenerativeAI } from "@google/generative-ai";
// import { VertexAI } from "@google-cloud/vertexai";
const genAI = new GoogleGenerativeAI("AIzaSyDOA85O_3T3bHf7UfZJdK9PH9dCYKYdb_k");

const fetchApi = async (prompt)=>{
// Access your API key as an environment variable (see "Set up your API key" above)

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
console.log(text)
return text;

}


export default fetchApi;