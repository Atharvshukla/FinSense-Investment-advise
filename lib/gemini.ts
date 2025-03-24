import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function getGeminiResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function analyzeInvestmentStrategy(userProfile: any) {
  const prompt = `
    Based on the following user profile, suggest an investment strategy:
    Risk tolerance: ${userProfile.riskTolerance}
    Investment horizon: ${userProfile.investmentHorizon}
    Current portfolio: ${userProfile.currentPortfolio}
    Financial goals: ${userProfile.financialGoals}
    
    Provide a detailed investment strategy including:
    1. Asset allocation
    2. Investment vehicles
    3. Risk management
    4. Rebalancing schedule
  `;

  return await getGeminiResponse(prompt);
}