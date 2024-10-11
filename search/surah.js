const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

  // Full Kode Di Github Saya : https://github.com/Lenwyy/

  async function surah(no) {
    return new Promise(async (resolve, reject) => {
      axios.get(`https://kalam.sindonews.com/surah/${encodeURIComponent(no)}`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const result = [];
          const ar = [];
          const id = [];
          const lt = [];

          // Mendapatkan link audio
          $('div.breadcrumb-new > ul > li:nth-child(5)').each((c, d) => {
            result.audio = $(d).find('a').attr('href').replace('surah', 'audioframe');
          });

          // Mendapatkan teks ayat dalam bahasa Arab
          $('div.ayat-arab').each((a, b) => {
            ar.push($(b).text());
          });

          // Mendapatkan terjemahan Indonesia
          $('li > div.ayat-text').each((e, f) => {
            id.push($(f).text().replace(',', '').trim());
          });

          // Mendapatkan transliterasi latin
          $('div.ayat-latin').each((g, h) => {
            lt.push($(h).text().trim());
          });

          // Menyusun hasil
          for (let i = 0; i < ar.length; i++) {
            result.push({
              arab: ar[i],
              indo: id[i],
              latin: lt[i]
            });
          }

          resolve(result);
        })
        .catch(reject);
    });
  }

  // Endpoint untuk mengambil surah
  app.get('/surah', async (req, res) => {
    const search = req.query.search;
    if (!search) {
      return res.status(400).json({ error: 'Parameter "search" Tidak Ditemukan, Tolong Masukkan Nomor Surah' });
    }

    try {
      const hasil = await surah(search);
      res.status(200).json({ hasil });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
