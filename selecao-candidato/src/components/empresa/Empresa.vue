<template>
  <div class="container-fluid pl-lg-5 pr-lg-5">
    <div class="row justify-content-center">

      <div class="card text-center col-sm-6">

        <div class="card-body">
            <h2>Cadastrar Empresa</h2>

            <form @submit.prevent="salvar()">

              <!--
                menos de uma hora pra entregar, vai ter que ir desse jeito mesmo, esqueci que foi usado o valor dessa
                variável para ocultar o botão de salvar e novo '-'
              -->
              <div class="alert alert-success" role="alert" v-show="msg==='Salvo com sucesso'">
                {{msg}}
              </div>

              <div class="alert alert-danger" role="alert" v-show="msg==='Erro ao Salvar'">
                {{msg}}
              </div>

              <div class="form-group row">
                <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" v-model="empresa.nome">
                </div>
              </div>

              <div class="form-group row">
                <label for="estado" class="col-sm-2 col-form-label">Estado</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="estado" v-model="empresa.estado">
                </div>
              </div>

              <div class="form-group row">
                <label for="cidade" class="col-sm-2 col-form-label">Cidade</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="cidade" v-model="empresa.cidade">
                </div>
              </div>

                <button class="btn btn-primary" type="submit" v-show="!msg">Salvar</button>
                <button class="btn btn-primary" v-show="msg" v-on:click.stop.prevent="novo">Novo</button>
                <router-link class="btn btn-primary" to="/listar-empresa" tag="button">Voltar</router-link>
            </form>
        </div>
      </div>
    </div>
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
