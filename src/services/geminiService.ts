/**
 * Gemini Service - AI Style Consultant
 * This service handles communication with Google's Gemini API for style recommendations
 */

export const getStyleAdvice = async (userInput: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return 'API key not configured. Please add GEMINI_API_KEY to your environment variables.';
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an expert barber and style consultant at a premium barbershop called "Blade & Bourbon". 
                
A customer is asking for your style recommendation. Please provide a concise, personalized hair and beard style recommendation based on their description.

Keep the response to 2-3 sentences, professional, and tailored to a men's barbershop setting.

Customer's request: ${userInput}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      return 'Unable to get style recommendation at this moment. Please try again later.';
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    return 'Could not process your request. Please try again.';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'An error occurred while processing your request. Please try again later.';
  }
};
