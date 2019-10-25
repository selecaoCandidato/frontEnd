<template>
    <div>
        <h2>Cadastrar Candidatos</h2>

        <form @submit.prevent="salvar()">
            <div v-show="msg">
                <label>{{msg}}</label>
            </div>

            <div>
                <label for="nome">Nome</label>
                <input id="nome" name="nome" v-model="candidato.nome">
            </div>

            <div>
                <label for="idade">Idade</label>
                <input id="idade" name="idade" v-model="candidato.idade">
            </div>

            <div>
                <label for="sexo">Sexo</label>
                <input id="sexo" name="sexo" v-model="candidato.sexo">
            </div>

             <div>
                <label for="telefone">Telefone</label>
                <input id="telefone" name="telefone" v-model="candidato.telefone">
            </div>

             <div>
                <label for="empresa">Empresa</label>
                <input id="empresa" name="empresa" v-model="candidato.empresa">
            </div>

            <div>
                <label for="observacao">Observação</label>
                <input id="observacao" name="observacao" v-model="candidato.observacao">
            </div>


            <button type="submit" v-show="!msg">Salvar</button>
            <button v-show="msg" v-on:click.stop.prevent="novo">Novo</button>
            <router-link to="/listar-candidato" tag="button">Voltar</router-link>
        </form>
    </div>
</template>

<script>
import Candidato from '../../domain/candidato/Candidato';
import EmpresaService from '../../domain/candidato/CandidatoService';

export default {
    data() {
        return {
            candidato: new Candidato(),
            msg: undefined,
            id: this.$route.params.id
        }
    },

    methods: {
        novo() {
            this.msg = undefined;
            this.candidato = new Candidato();
        },

        salvar() {
            this.service.salvar(this.candidato)
            .then(
                () => this.msg = "Salvo com sucesso",
                () => this.msg = "Erro ao Salvar"
            );
        }
    },

    created() {
        this.service = new CandidatoService(this.$resource);

        if(this.id){
            this.service.buscar(this.id).then(candidato => this.candidato = candidato);
        }
    }

}
</script>

<style scoped/>
