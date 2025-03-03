const miModulo = (() => {
    'use strict';

    function lanzaSWAL(icono, titulo,mensaje){
        return Swal.fire({
            icon: `${icono}`,
            title: `${titulo}`,
            text: `${mensaje}`
        })
    }    
    
    document.addEventListener('DOMContentLoaded', async ()=>{
        // const response = await fetch('/api/token');
        // const data = await response.json();
        // document.getElementById('token').value = data.token;
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token ') || window.location.pathname.split('/')[2];
        document.getElementById('token').value = token;

        const formulario = document.querySelector('.formulario');
        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const datos = Object.fromEntries(new FormData(evento.target));

            if(!datos.curso || !datos.nombre){
                return lanzaSWAL("error", "Oops...", "Complete todos los campos!!");
            }

            if(document.cookie.includes(`clase=${datos.curso}`)){
                return lanzaSWAL("error", "Oops..", "Ya has registrado tu asistencia para esta clase!!");
            }

            const response = await fetch('/api/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const result = await response.json();
            const icono = !result.message ? "info" : "success";
            const texto = !result.message ? result.error : result.message;
            // alert(result.message);
            if(result.message === 'Asistencia registrada con exito!'){
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 2*60*60*1000);
                document.cookie = `clase=${datos.curso}; expires=${expirationDate.toUTCString()}; path=/`;
            }
            
            lanzaSWAL(icono, "Info Solicitud:", texto);

            document.querySelector('#curso').disabled = true;
            document.querySelector('#nombre').disabled = true;
        });
    })
})();