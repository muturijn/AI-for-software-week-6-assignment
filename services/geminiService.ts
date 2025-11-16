
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateAIProposal = async (sensors: string[], description: string): Promise<string> => {
  const sensorList = sensors.join(', ');
  const prompt = `
    You are an expert in agricultural AI and IoT systems.
    Based on the following list of IoT sensors: ${sensorList}.
    And this user requirement: "${description}".

    Write a concise but detailed proposal for an AI model to predict crop yields.
    The proposal should include the following sections, formatted using Markdown:

    ### 1. Suggested Model Architecture
    - Recommend a specific model type (e.g., Random Forest Regressor, Gradient Boosting, LSTM, Transformer) and justify why it's suitable for this task and data.

    ### 2. Key Features
    - List the primary features that would be engineered from the provided sensor data.
    - Mention potential time-based features (e.g., weekly averages, growth stage trends) if applicable.

    ### 3. Expected Output & Benefits
    - Clearly state what the model will predict (e.g., bushels per acre).
    - Describe the key benefits for a farmer, such as resource optimization, risk management, and increased profitability.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating AI proposal:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};

export const generateDataFlowDiagram = async (sensors: string[], proposal: string): Promise<string> => {
  const sensorList = sensors.join(', ');
  const prompt = `
    You are a systems architect specializing in IoT and AI data pipelines.
    Based on this list of IoT sensors: ${sensorList}
    And the following AI model proposal for crop yield prediction:
    ---
    ${proposal}
    ---

    Create a simple, step-by-step data flow diagram as a numbered list in plain text.
    Use arrows "->" to show the flow of data.
    The diagram must start with the physical sensors and end with the farmer viewing the prediction.
    Keep it high-level and easy for a non-technical person to understand.

    Example format:
    1. [Source]: Description ->
    2. [Processing Step]: Description ->
    ...
    n. [Final Output]: Description
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating data flow diagram:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
