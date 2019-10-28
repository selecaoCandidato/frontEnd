<template>
    <div>
        <h2>Cadastrar Empresa</h2>
        
        <b-form @submit.prevent="salvar()">

            <b-alert v-model="msgValida" variant="success" dismissible>
                Cadastro realizado com sucesso!
            </b-alert>
            <b-alert v-model="msgInvalida" variant="danger" dismissible>
                Falha ao realizar o cadastro!
            </b-alert>

            <div>
                <label for="nome">Nome</label>
                <b-form-input id="nome" name="nome" v-model="empresa.nome"/>
            </div>

            <div>
                <label for="estado">Estado</label>
                <b-form-input id="estado" name="estado" v-model="empresa.estado"/>
            </div>

            <div>
                <label for="cidade">Cidade</label>
                <b-form-input id="cidade" name="cidade" v-model="empresa.cidade"/>
            </div>

            <b-button variant="success" type="submit" v-show="!msgValida">Salvar</b-button>
            <b-button variant="success" v-show="msgValida" v-on:click.stop.prevent="novo">Novo</b-button>
            <router-link to="/listar-empresa" tag="b-button">Voltar</router-link>
        </b-form>
    </div>
</template>

<script>
import Empresa from '../../domain/empresa/Empresa';
import EmpresaService from '../../domain/empresa/EmpresaService';

export default {
    data() {
        return {
            empresa: new Empresa(),
            msgValida: undefined,
            msgInvalida: undefined,
            id: this.$route.params.id
        }
    },
    
    methods: {
        novo() {
            this.msgValida = undefined;
            this.msgInvalida = undefined;
            this.empresa = new Empresa();
        },

        salvar() {
            this.service.salvar(this.empresa)
            .then(
                () => this.msgValida = true,
                () => this.msgInvalida = true
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