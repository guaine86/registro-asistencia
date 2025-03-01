const miModulo = (() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', async ()=>{
        const response = await fetch('/api/token');
        const data = await response.json();
        document.getElementById('token').value = data.token;
    
        const formulario = document.querySelector('.formulario');
        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const datos = Object.fromEntries(new FormData(evento.target));
            console.log(datos);

            const response = await fetch('/api/registrar', {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'aplication/json',
                },
            });
            const result = await response.json();
            alert(result.message);
        });
    })
})();