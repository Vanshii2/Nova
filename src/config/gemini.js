// const GEMINI_API_KEY="AIzaSyBQBZUZ7w7qcNi5NwBfw8k_WvBRNQhB2gM"
// To run this code you need to install the following dependencies:
// 

// npm install -D @types/node



// EOF

// curl \
// -X POST \
// -H "Content-Type: application/json" \
// "https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${GEMINI_API_KEY}" -d '@request.json'


async function callGeminiApi() {
    if (apiKey === 'AIzaSyBQBZUZ7w7qcNi5NwBfw8k_WvBRNQhB2gM') {
        console.error("Please replace 'PASTE_YOUR_GEMINI_API_KEY_HERE' with your actual API key.");
        document.getElementById('output').textContent = "ERROR: API key not set in the script.";
        return;
    }

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Write a short, 5-line poem about a robot learning to dream.`
            },
          ]
        },
      ],
      generationConfig: {
        responseMimeType: 'text/plain',
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // If response is not OK, get the error message from the body
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
      }
      
      // The Gemini streaming API returns a single JSON array of chunks.
      const chunks = await response.json();
      
      let fullResponse = '';
      for (const chunk of chunks) {
        const chunkText = chunk.candidates[0].content.parts[0].text;
        console.log(chunkText); // Log each piece as it would have streamed
        fullResponse += chunkText;
      }

      // Display the final result on the page
      document.getElementById('output').textContent = fullResponse;

    } catch (e) {
      console.error("Failed to call API:", e);
      document.getElementById('output').textContent = `Error: ${e.message}`;
    }
  }

  // Run the function when the script loads
  export default callGeminiApi;