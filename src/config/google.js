const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    // keyFile: process.env.GOOGLE_CREDENTIALS,
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        project_id: process.env.GOOGLE_PROJECT_ID,
        client_id: process.env.GOOGLE_CLIENT_ID,

    },
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const sheets = google.sheets({version: 'v4', auth});

exports.obtenerCursos = async()=>{
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Prueba!J2:J',
        });

        const cursos = response.data.values.flat();
    
        return cursos;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: `Error al obtener los cursos: ${error}`}),
        }
    }
};

exports.registrarAsistencia = async(curso, nombre, token)=>{
    try {
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Prueba!D:D',
        })
    
        const tokenUsados = response.data.values || [];
        if(tokenUsados.flat().includes(token)){
            return {
                statusCode: 400,
                body: JSON.stringify({error: 'Este token ya fue usado!'}),
            }
        }
    
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Prueba!A:D',
            valueInputOption: 'RAW',
            resource: {
                values: [[curso, nombre, new Date().toISOString(), token]],
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Asistencia registrada con exito!'})
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Error al registrar la asistencia!'}),
        }
    }
};