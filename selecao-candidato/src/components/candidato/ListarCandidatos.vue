<template>
    <div>
        <h2>Candidatos Cadastrados</h2>

        <table class="table table-striped">
            <thead>
                <th scope="col">Nome</th>
                <th scope="col">telefone</th>
                
            </thead>
            <tbody>
                <tr v-for="candidato in candidatos">
                    <td>{{ candidato.nome }}</td>
                    <td>{{ candidato.telefone }}</td>
                   
                    <td>
                        <button class="btn" type="submit" @click="deletar(candidato)">
                            <img src="../../assets/trash.png">
                        </button>
                        <router-link class="btn " tag="button" :to="{ name:'editarCandidato', params: { id: candidato.id } }">
                            <img src="../../assets/edit.png">
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <router-link class="btn btn-primary" to="/candidato" tag="button" >Cadastrar Candidatos</router-link>
    </div>
</template>

<script>
import CandidatoService from '../../domain/candidato/CandidatoService';
export default {

    data() {
        return {
            candidatos: []
        }
    },

    created() {
        this.service = new CandidatoService(this.$resource);

        this.service.listar()
        .then(
            candidatos => this.candidatos = candidatos,
            err => console.log(err)
        );
    },

    methods: {

        deletar(candidato) {
            this.service.deletar(candidato.id)
            .then(() => {
                let indice = this.candidatos.indexOf(candidato, 1);
                this.candidatos.splice(indice, 1);
            }, err => console.log(err.message));
        }

    }
}
</script>

<style scoped>

</style>