import{GooglenerativeAI} from "@google/generative-ai";
const  genAI = new GooglenerativeAI("AIzaSyDOA85O_3T3bHf7UfZJdK9PH9dCYKYdb_k");
const fetchApi = async(prompt)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text;
    
}
export default fetchApi;