<template>
    <div>
        <h2>Cadastrar Candidatos</h2>
        
        <form @submit.prevent="salvar()">
            <div v-show="msg">
                <label>{{msg}}</label>
            </div>

            <div class="form-group">
                <label for="nome">Nome</label>
                <input class="form-control" id="nome" name="nome" v-model="candidato.nome">
            </div>

            <div class="form-group">
                <label for="idade">Idade</label>
                <input class="form-control" id="idade" name="idade" v-model="candidato.idade">
            </div>

            <div class="form-group">

                <label for="sexo">Sexo</label>
                    <label for="feminino">Feminino</label>
                    <input type="radio" id="feminino" value="feminino" v-model="candidato.sexo">
            
                    <label for="masculino">Masculino</label>
                    <input type="radio" id="masculino" value="masculino" v-model="candidato.sexo">
                
            </div>
            <div class="form-group">
                <label for="telefone">Telefone</label>
                <input class="form-control" id="telefone" name="telefone" v-model="candidato.telefone">
            </div>

            <div class="form-group">

                <label for="empresa">Empresa</label>
                <select  class="form-control"v-model ="candidato.empresa">
                <option v-for = "option in options" v-bind:value="option.value">
                    {{option.text}}
                    </option>
                    </select>
            </div>

            <div class="form-group">
                <label for="observacao">Observação</label>
                <textarea class="form-control" id="observacao" name="observacao" v-model="candidato.observacao"></textarea>
            </div>
            

     <div>
        <h2>Conhecimentos </h2>

    <div>        
        <form @submit.prevent="adicionar()">

            <div>
                <label for="nome">Conhecimento</label>
                <input id="nome" name="nome" v-model="conhecimento.nome">
      
                <label for="nivel">Nivel</label>
                <input id="nivel" name="nivel" v-model="conhecimento.nivel">
            
                <button type="submit">Adicionar</button>
            </div>
        </form>
    </div>

        <table class ="table table-striped">
            <thead>
                <th scope="col"> Conhecimento</th>
                <th scope="col"> nivel</th>
                
            </thead>
            <tbody>
                <tr v-for="conhecimento in candidato.conhecimentos">
                    <td>{{ conhecimento.nome }}</td>
                    <td>{{ conhecimento.nivel }}</td>
                   
                    <td>
                        <button type="submit" @click="deletar(conhecimento)">
                            <img src="../../assets/trash.png">
                        </button>
                      
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
           

            <button class="btn btn-primary" type="submit" >Salvar</button>
            <router-link to="/listar-candidato" tag="button">Voltar</router-link>
        </form>
    </div>
</template>

<script>
import Candidato from '../../domain/candidato/Candidato';
import CandidatoService from '../../domain/candidato/CandidatoService';

import EmpresaService from '../../domain/empresa/EmpresaService';

import Conhecimento from '../../domain/conhecimento/Conhecimento';

export default {
    data() {
        return {
            conhecimento: new Conhecimento(),
            candidato: new Candidato(),
            msg: undefined,
            id: this.$route.params.id,
            options: []
        }
    },
    
    methods: {
        novo() {
            this.msg = undefined;
            this.candidato = new Candidato();
            this.candidato.conhecimentos = [];
        },

        salvar() {
            console.log(this.candidato);
            
            this.service.salvar(this.candidato)
            .then(
                (res) => {
                    console.log(res);
                    this.msg = "Salvo com sucesso"
                },
                (err) => {
                    console.log(err);
                    this.msg = "Erro ao Salvar"
                }
            );
        },
        adicionar(){
            this.candidato.conhecimentos.push(this.conhecimento);
            this.conhecimento = new Conhecimento();
        },
        deletar(conhecimento){
            let indice = this.candidato.conhecimentos.findIndex(obj=> obj.nome === conhecimento.nome && obj.nivel === conhecimento.nivel);
            this.candidato.conhecimentos.splice(indice, 1);
        }
    
    },


    created() {
        this.service = new CandidatoService(this.$resource);

        if(this.id){
            this.service.buscar(this.id).then(candidato => this.candidato = candidato);
        }

        this.empresaService = new EmpresaService(this.$resource);
         this.empresaService.listar()
        .then(
            empresas => {
                empresas.map((empresa, id) => {
                this.options.push({
                    value: empresa,
                    text: empresa.nome
                });
            });
            },
            err => console.log(err)
        );

    }
}
</script>

<style scoped>


</style>