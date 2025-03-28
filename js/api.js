const endpoint = 'http://localhost:3000/thoughts';

const api = {
    async getThoughts() {
        try {
            const response = await fetch(endpoint);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamentos');
        }
    },

    async getThoughtById(id) {
        try {
            const response = await fetch(endpoint+'/'+id);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento');
        }
    },

    async postThought(thought) {
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thought)
            });
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar pensamento');
        }
    },

    async editThought(thought) {
        try {
            await fetch(endpoint+'/'+thought.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thought)
            });
        } catch (error) {
            console.error(error);
            alert('Erro ao editar pensamento');
        }
    },

    async deleteThought(thought) {
        try {
            await fetch(endpoint+'/'+thought.id, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento');
        }
    }
}

export default api;
