const fs = require('fs');
const axios = require('axios');
const buffer = require('buffer');
const PDFDocument = require('pdfkit');

const makeRequest = async (url) => {
    return await axios.get(url, {
        responseType: 'arraybuffer',
    });
};

async function genpdf() {
    var resp = await makeRequest('https://fonts.gstatic.com/s/rasa/v3/xn7vYHIn1mWmTqI.ttf')
    const buf = buffer.Buffer.from(resp.data);

    const doc = new PDFDocument({
            size: [297 * 15, 210 * 15],
            info: {
                Title: 'test',
                Author: 'test',
            },
        });
        ;

    doc.registerFont('rasa', buf);

    doc.pipe(fs.createWriteStream('output.pdf'));

    doc.font('rasa')
       .fontSize(25 * 15)
       .text('Argh', 100, 100);

    doc.end();
}

try {
    genpdf();
} catch (ex) {
    console.log(ex);
}
