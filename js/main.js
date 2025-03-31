import api from './api.js';
import ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const thoughtForm = document.getElementById('pensamento-form');
    const searchInput = document.getElementById('campo-busca');

    thoughtForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', handleSearch);
    document.getElementById('botao-cancelar').onclick = ui.clearForm;
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

async function handleSearch() {
    const searchTerm = document.getElementById('campo-busca').value;    

    try {
        const filteredThoughts = await api.searchThoughtsByTerm(searchTerm);
        ui.renderThoughts(filteredThoughts);
    } catch (error) {
        console.error(error);
        alert('Erro ao pesquisar pensamentos');
    }
}
