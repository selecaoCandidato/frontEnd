<template>
    <div>
        <h2>Candidatos Cadastrados</h2>
        <b-table
            show-empty
            
            stacked="md"
            :items="candidatos"
            :fields="fields"
        
            >
            

            <template v-slot:cell(acao)="row">
                <b-button variant="outline-danger" @click="deletar(row.item)" class="mr-1">
                    <img src="../../assets/trash.png">
                </b-button>
                <router-link tag="b-button" :to="{ name:'editarCandidato', params: { id: row.item.id } }">
                            <img src="../../assets/edit.png">
                        </router-link>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
                </b-card>
            </template>
            </b-table>

        <router-link to="/candidato" tag="b-button" size="sm" >Cadastrar Candidato</router-link>
    </div>
</template>

<script>
import CandidatoService from '../../domain/candidato/CandidatoService';

export default {

    data() {
        return {
            candidatos: [],
            fields: [
                { key: 'nome', label: 'Nome', class: 'text-center'},
                { key: 'idade', label: 'Idade', class: 'text-center' },
                { key: 'telefone', label: 'Telefone', class: 'text-center' },
                { key: 'empresa', label: 'Empresa', class: 'text-center' },
                { key: 'acao', label: 'Ações', class: 'text-center' }
            ]
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