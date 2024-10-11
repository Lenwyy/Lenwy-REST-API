const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

  // Full Kode Di Github Saya : https://github.com/Lenwyy/

  async function getJadwalSholat(city) {
    try {
      const url = `https://umrotix.com/jadwal-sholat/${encodeURIComponent(city)}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const result = {};

      // Mendapatkan nama kota
      result.kota = $("h1.text-center")
        .first()
        .text()
        .replace("Jadwal Sholat ", "")
        .trim();

      // Mendapatkan jadwal sholat dan tanggal
      $("body > div > div.main-wrapper.scrollspy-action > div:nth-child(3)").each(function (a, b) {
        result.tanggal = $(b).find("> div:nth-child(2)").text();

        result.jadwal = {
          imsak: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)")
            .text(),
          subuh: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)")
            .text(),
          dzuhur: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)")
            .text(),
          ashar: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)")
            .text(),
          maghrib: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)")
            .text(),
          isyak: $(b)
            .find("> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)")
            .text(),
        };
      });

      return result;
    } catch (error) {
      console.error('Error:', error);
      return "Terjadi kesalahan saat mengambil jadwal sholat.";
    }
  }

  // Endpoint untuk mendapatkan jadwal sholat
  app.get('/jadwalsholat', async (req, res) => {
    try {
      const { search } = req.query;
      if (!search) {
        return res.status(400).json({ error: 'Parameter "search" tidak ditemukan, harap masukkan nama kota.' });
      }

      const response = await getJadwalSholat(search);
      res.status(200).json({
        status: 200,
        creator: "Lenwy",
        data: response
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

};
