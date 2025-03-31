const endpoint = 'http://localhost:3000/thoughts';

const api = {
    async getThoughts() {
        try {
            /* 
            const response = await fetch(endpoint);
            return await response.json(); 
            */
            const response = await axios.get(endpoint);
            return await response.data;
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamentos');
        }
    },

    async getThoughtById(id) {
        try {
            /* 
            const response = await fetch(endpoint+'/'+id);
            return await response.json();
            */
            const response = await axios.get(endpoint+'/'+id);
            return await response.data;
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento');
        }
    },

    async postThought(thought) {
        try {
            /*
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thought)
            });
            */
            await axios.post(endpoint, thought);
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar pensamento');
        }
    },

    async editThought(thought) {
        try {
            /*
            await fetch(endpoint+'/'+thought.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(thought)
            });
            */
           await axios.put(endpoint+'/'+thought.id, thought);
        } catch (error) {
            console.error(error);
            alert('Erro ao editar pensamento');
        }
    },

    async deleteThought(thought) {
        try {
            /*
            await fetch(endpoint+'/'+thought.id, {
                method: 'DELETE'
            });
            */
           await axios.delete(endpoint+'/'+thought.id, thought);
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento');
        }
    },

    async searchThoughtsByTerm(term) {
        try {
            const thoughts = await this.getThoughts();
            const lowerCaseTerm = term.toLowerCase();
    
            const filteredThoughts = thoughts.filter(thought => {
                return (thought.content.toLowerCase().includes(lowerCaseTerm)) || (thought.author.toLowerCase().includes(lowerCaseTerm));
            });
            
            return filteredThoughts;
        } catch (error) {
            console.error(error);
            alert('Erro ao filtrar pensamentos');
        }
    },

    async updateFavorite(id, favorite) {
        try {
            await axios.patch(endpoint+'/'+id, { favorite });
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar favorito');
        }
    }
}

export default api;
