<template>
    <div>
        <h2>Empresas Cadastradas</h2>

        <table>
            <thead>
                <th>Nome</th>
                <th>Estado</th>
                <th>Cidade</th>
            </thead>
            <tbody>
                <tr v-for="empresa in empresas">
                    <td>{{ empresa.nome }}</td>
                    <td>{{ empresa.estado }}</td>
                    <td>{{ empresa.cidade }}</td>
                    <td>
                        <button type="submit" @click="deletar(empresa)">
                            <img src="../../assets/trash.png">
                        </button>
                        <router-link tag="button" :to="{ name:'editarCadastro', params: { id: empresa.id } }">
                            <img src="../../assets/edit.png">
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <router-link to="/empresa" tag="button" >Cadastrar Empresa</router-link>
    </div>
</template>

<script>
import EmpresaService from '../../domain/empresa/EmpresaService';

export default {

    data() {
        return {
            empresas: []
        }
    },

    created() {
        this.service = new EmpresaService(this.$resource);

        this.service.listar()
        .then(
            empresas => this.empresas = empresas,
            err => console.log(err)
        );
    },

    methods: {

        deletar(empresa) {
            this.service.deletar(empresa.id)
            .then(() => {
                let indice = this.empresas.indexOf(empresa, 1);
                this.empresas.splice(indice, 1);
            }, err => console.log(err.message));
        }

    }
}
</script>

<style scoped>

</style>