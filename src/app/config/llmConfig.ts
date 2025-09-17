import { ChatGroq } from "@langchain/groq";
import { config } from '@/app/config/envConfiguration';
export const llmModel = new ChatGroq(
   {apiKey:config.groqSecretKey,
     model:"llama-3.1-8b-instant",
    temperature:0.2,}        
)