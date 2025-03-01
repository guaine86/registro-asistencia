const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const sheets = google.sheets({version: 'v4', auth});

exports.registrarAsistencia = async(curso, nombre)=>{
    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Prueba!A:C',
        valueInputOption: 'RAW',
        resource: {
            values: [[curso, nombre, new Date().toISOString()]],
        }
    });
};