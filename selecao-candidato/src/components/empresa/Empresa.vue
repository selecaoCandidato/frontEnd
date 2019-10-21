<template>
    <div>
        <h2>Cadastrar Empresa</h2>
        
        <form @submit.prevent="salvar()">
            <div v-show="msg">
                <label>{{msg}}</label>
            </div>

            <div>
                <label for="nome">Nome</label>
                <input id="nome" name="nome" v-model="empresa.nome">
            </div>

            <div>
                <label for="estado">Estado</label>
                <input id="estado" name="estado" v-model="empresa.estado">
            </div>

            <div>
                <label for="cidade">Cidade</label>
                <input id="cidade" name="cidade" v-model="empresa.cidade">
            </div>

            <button type="submit" v-show="!msg">Salvar</button>
            <button v-show="msg" v-on:click.stop.prevent="novo">Novo</button>
            <router-link to="/listar-empresa" tag="button">Voltar</router-link>
        </form>
    </div>
</template>

<script>
import Empresa from '../../domain/empresa/Empresa';
import EmpresaService from '../../domain/empresa/EmpresaService';

export default {
    data() {
        return {
            empresa: new Empresa(),
            msg: undefined,
            id: this.$route.params.id
        }
    },
    
    methods: {
        novo() {
            this.msg = undefined;
            this.empresa = new Empresa();
        },

        salvar() {
            this.service.salvar(this.empresa)
            .then(
                () => this.msg = "Salvo com sucesso",
                () => this.msg = "Erro ao Salvar"
            );
        }
    },

    created() {
        this.service = new EmpresaService(this.$resource);

        if(this.id){
            this.service.buscar(this.id).then(empresa => this.empresa = empresa);
        }
    }

}
</script>

<style scoped>


</style>