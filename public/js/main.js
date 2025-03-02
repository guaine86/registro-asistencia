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
        const response = await fetch('/api/token');
        const data = await response.json();
        document.getElementById('token').value = data.token;
    
        const formulario = document.querySelector('.formulario');
        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const datos = Object.fromEntries(new FormData(evento.target));

            if(!datos.curso || !datos.nombre){
                return lanzaSWAL("error", "Oops...", "Complete todos los campos!!");
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
            lanzaSWAL(icono, "Info Solicitud:", texto);
        });
    })
})();