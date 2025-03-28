import api from './api.js';
import ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const thoughtForm = document.getElementById('pensamento-form');
    thoughtForm.addEventListener('submit', handleFormSubmit);
})

async function handleFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value;
    const content = document.getElementById('pensamento-conteudo').value;
    const author = document.getElementById('pensamento-autoria').value;

    try {
        id ? await api.editThought({ id, content, author }) : await api.postThought({ content, author });
        ui.renderThoughts();
    } catch (error) {
        console.error(error);
        alert('Erro ao salvar o pensamento');
    }
}

document.getElementById('botao-cancelar').onclick = ui.clearForm;
