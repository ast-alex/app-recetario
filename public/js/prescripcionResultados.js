
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-resultado-observacion').forEach(form => {
        form.addEventListener('submit', async (e) =>{
            e.preventDefault();

            const id = form.dataset.id;
            const resultado = form.querySelector('[name="resultado"]').value;
            const observacion = form.querySelector('[name="observacion"]').value;

            if(!resultado || !observacion){
                Swal.fire({
                    icon: 'warning',
                    title: 'Debe completar al menos un campo',
                    text: 'Ingrese un resultado o una observación.',
                });
                return;
            }

            try{
                const response = await fetch(`/prescripcion_prestacion/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({resultado, observacion})
                });

                if(!response.ok) throw new Error('Error al actualizar el resultado y la observación.');

                Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'Los datos han sido actualizados correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });

                //remplazo form por contenido fijo
                const container = form.parentElement;
                container.innerHTML = `
                    <p class="text-success mb-1">Resultado registrado</p>
                    <p class="small mb-1"><strong>Resultado:</strong> ${resultado || '-'}</p>
                    <p class="small mb-2"><strong>Observación:</strong> ${observacion || '-'}</p>
                `;
            }catch(error){
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al actualizar el resultado y la observación.',
                });
            }
        });
    })
});