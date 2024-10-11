const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

    // Full Kode Di Github Saya : https://github.com/Lenwyy/

async function scrapeTafsir(searchQuery) {
    const url = `https://ypia.or.id/?s=${encodeURIComponent(searchQuery)}`;
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);      
        const tafsirResults = [];
        $('.entry-title a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            tafsirResults.push({ title, link });
        });
        return tafsirResults;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
}

app.get('/ypia', async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.status(400).json({ error: 'search parameter is required' });
    }

    try {
        const results = await scrapeTafsir(search);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tafsir data' });
    }
});
};