<template>
    <div>
        <h2>Cadastrar Empresa</h2>
        
        <form @submit.prevent="salvar()">
            <div v-show="msg" :class ="msgClass">
                <label>{{msg}}</label>
            </div>

            <div class="form-group">
                <label for="nome">Nome</label>
                <input class="form-control" id="nome" name="nome" v-model="empresa.nome" required>
            </div>

            <div class="form-group">
                <label for="estado">Estado</label>
                <input class="form-control" id="estado" name="estado" v-model="empresa.estado" required>
            </div>

            <div class="form-group">
                <label for="cidade">Cidade</label>
                <input class="form-control" id="cidade" name="cidade" v-model="empresa.cidade" required>
            </div>

            <button class="btn btn-primary" type="submit" v-show="!msg">Salvar</button>
            <button class="btn btn-primary" v-show="msg" v-on:click.stop.prevent="novo">Novo</button>
            <router-link class="btn" to="/listar-empresa" tag="button">Voltar</router-link>
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
            this.msgClass = undefined;
            this.empresa = new Empresa();
        },

        salvar() {
            if(this.empresa.nome!==" " && this.empresa.estado!== " " && this.empresa.cidade!== "" ){
            this.service.salvar(this.empresa)
            .then(
                (res) =>{
                    this.msg = "Salvo com sucesso";
                    this.msgClass="alert alert-success";
                } ,
                (err) =>{
                    this.msg = "Erro ao Salvar";
                    this.msgClass="alert alert-danger";
                } 
            );
            }else{
                this.msg = "Preencha todos os campos";
                this.msgClass="alert alert-danger";
            }
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