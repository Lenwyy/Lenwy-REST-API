const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

  // Full Kode Di Github Saya : https://github.com/Lenwyy/

  // Fungsi scraper liputan6
  async function liputan6() {
    try {
      const AvoskyBaik = await axios.get('https://www.liputan6.com/');
      const $ = cheerio.load(AvoskyBaik.data);

      const latestNews = $('.articles--iridescent-list').eq(2).find('article');
      const results = [];

      latestNews.each(function () {
        try {
          const title = $(this).find('figure a').attr('title');
          const link = $(this).find('figure a').attr('href');
          const image = $(this).find('figure a picture img').attr('data-src');
          const tag = $(this).find('aside header a').text();

          results.push({ title, link, tag, image, source: 'liputan6' });
        } catch (e) {
          console.error('Error scraping article:', e);
        }
      });

      return results;
    } catch (error) {
      console.error('Error fetching:', error);
      return [];
    }
  }

  // Endpoint untuk scraper liputan6
  app.get('/liputan6', async (req, res) => {
    try {
      const data = await liputan6();
      if (data.length === 0) {
        return res.status(404).json({ message: 'Tidak ada berita terbaru yang ditemukan.' });
      }

      res.status(200).json({
        status: 200,
        creator: "Lenwy",
        data: data
      });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
    }
  });

};
