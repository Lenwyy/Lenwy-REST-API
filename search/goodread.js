const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {


async function avzzzz(query) {
    const url = `https://www.goodreads.com/search?q=${encodeURIComponent(query)}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const books = [];
        $('.tableList tr').each((index, element) => {
            const title = $(element).find('a.bookTitle span').text().trim();
            const link = $(element).find('a.bookTitle').attr('href');
            const rating = $(element).find('span.minirating').text().trim();
            books.push({ title, link: `https://www.goodreads.com${link}`, rating });


            // Full Kode Di Github Saya : https://github.com/Lenwyy/
        });
        return books;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
}

app.get('/caribuku', async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.status(400).json({ error: 'search parameter is required' });
    }

    try {
        const results = await avzzzz(search);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book data' });
    }
});
};
