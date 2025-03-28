import api from './api.js';

const thoughtsList = document.getElementById('lista-pensamentos');

const ui = {

    async fillForm(thoughtId) {
        const thought = await api.getThoughtById(thoughtId);
        document.getElementById('pensamento-id').value = thought.id;
        document.getElementById('pensamento-conteudo').value = thought.content;
        document.getElementById('pensamento-autoria').value = thought.author;
        document.querySelector('.overlay').scrollIntoView({ behavior: 'smooth' });
    },

    clearForm() {
        document.getElementById('pensamento-form').reset();
    },

    async renderThoughts() {
        thoughtsList.innerHTML = '';

        try {
            const thoughts = await api.getThoughts();
            thoughts.forEach(ui.addThoughtInTheList);
        } catch (error) {
            console.error(error);
            alert('Erro ao renderizar os pensamentos');
        }
    },

    blankList() {
        document.createElement
    },

    addThoughtInTheList(thought) {
        const li = document.createElement('li');
        li.setAttribute('data-id', thought.id);
        li.classList.add('li-pensamento');

        const quotationIcon = document.createElement('img');
        quotationIcon.src = 'assets/images/aspas-azuis.png';
        quotationIcon.alt = 'Aspas azuis';
        quotationIcon.classList.add('icone-aspas');

        const thoughtContent = document.createElement('div');
        thoughtContent.textContent = thought.content;
        thoughtContent.classList.add('pensamento-conteudo');

        const thoughtAuthor = document.createElement('div');
        thoughtAuthor.textContent = thought.author;
        thoughtAuthor.classList.add('pensamento-autoria');
        
        const editButton = document.createElement('button');
        editButton.classList.add('botao-editar');
        editButton.onclick = () => ui.fillForm(thought.id);

        const editIcon = document.createElement('img');
        editIcon.src = 'assets/images/icone-editar.png';
        editIcon.alt = 'Editar';
        editButton.appendChild(editIcon);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('botao-excluir');
        deleteButton.onclick = async () => {
            try {
                await api.deleteThought(thought);
                ui.renderThoughts();
            } catch (error) {
                console.error(error);
                alert('Erro ao excluir pensamento')
            }
        }

        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'assets/images/icone-excluir.png';
        deleteIcon.alt = 'Excluir';
        deleteButton.appendChild(deleteIcon);

        const icons = document.createElement('div');
        icons.classList.add('icones');
        icons.appendChild(editButton);
        icons.appendChild(deleteButton);

        li.appendChild(quotationIcon);
        li.appendChild(thoughtContent);
        li.appendChild(thoughtAuthor);
        li.appendChild(icons);
        thoughtsList.appendChild(li);
    }
}

export default ui;
