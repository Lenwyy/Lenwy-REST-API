const axios = require('axios');

// Full Kode Di Github Saya : https://github.com/Lenwyy/

module.exports = function(app) {

    async function blackboxAIChat(message) {
        try {
          const response = await axios.post('https://www.blackbox.ai/api/chat', {
            messages: [{ id: null, content: message, role: 'user' }],
            id: null,
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            isChromeExt: false,
            githubToken: null
          });
      
          return response.data;
        } catch (error) {
          throw error;
        }
      }

// Endpoint untuk blackboxAIChat
app.get('/blackboxai', async (req, res) => {
    try {
      const text = req.query.text;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" tidak ditemukan' });
      }
      const response = await blackboxAIChat(text);
      res.status(200).json({
        status: 200,
        creator: "Lenwy",
        data: { response }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
