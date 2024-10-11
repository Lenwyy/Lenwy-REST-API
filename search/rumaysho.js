const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

    // Full Kode Di Github Saya : https://github.com/Lenwyy/

async function scrapeTafsir(searchQuery) {
    const url = `https://rumaysho.com/?s=${encodeURIComponent(searchQuery)}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const tafsirResults = [];
        $('.post-title a').each((index, element) => {
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

app.get('/rumaysho', async (req, res) => {
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
