<template>
    <div>
        <h2>Cadastrar Candidato</h2>

        <b-form @submit.prevent="salvar()">
        
            <b-alert v-model="msgValida" variant="success" dismissible>
                Cadastro realizado com sucesso!
            </b-alert>
            <b-alert v-model="msgInvalida" variant="danger" dismissible>
                Falha ao realizar o cadastro!
            </b-alert>

            <div>
                <label for="nome">Nome</label>
                <b-form-input id="nome" name="nome" v-model="candidato.nome" placeholder="Nome do candidato"/>
            </div>

            <div>
                <label for="idade">Idade</label>
                <b-form-input min="1" type="number" id="idade" name="idade" v-model="candidato.idade" placeholder="Idade do candidato"/>
            </div>

            <div>
                <label for="telefone">Telefone</label>
                <b-form-input id="telefone" name="telefone" v-model="candidato.telefone" placeholder="Telefone do candidato"/>
            </div>

            <div>
                <b-form-group label="Sexo">
                    <b-form-radio name="sexo" type="radio" v-for="genero in generos" v-bind:value="genero" v-bind:key="genero" v-model="candidato.sexo">{{ genero }}</b-form-radio>
                </b-form-group>

            </div>

            <div>
                <label for="empresa">Empresa</label>
                <b-form-select id="empresa" name="empresa" v-model="candidato.idEmpresa" class="mb-3">
                    <option value="" disabled >Selecione uma empresa</option>
                    <option v-for="empresa in empresas" v-bind:value="empresa.id"> {{ empresa.nome }}</option>
                </b-form-select>
            </div>

            <div>
                <label for="observacao">Observação</label>
                <b-form-textarea
                    id="observacao" name="observacao" v-model="candidato.observacao"
                    placeholder="Observações"
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>
            </div>

            <h3>Conhecimentos</h3>
            <div>
                <label for="descricao">Conhecimento</label>
                <b-form-input  id="descricao" name="descricao" v-model="conhecimento.descricao" placeholder="Conhecimento do candidato"/>
                <label for="nivel">Nível</label>
                <b-form-input id="nivel" name="nivel" v-model="conhecimento.nivel" placeholder="Nível do conhecimento"/>
                <b-button type="button" @click="adicionar()" >Adicionar</b-button>
            </div>

            <b-table
            show-empty
            small
            stacked="md"
            :items="conhecimentos"
            :fields="fields"
        
            >
            

            <template v-slot:cell(deletar)="row">
                <b-button variant="danger" size="sm" @click="deletar(row.item)" class="mr-1">
                    <img src="../../assets/trash.png">
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                </ul>
                </b-card>
            </template>
            </b-table>

            <b-button variant="success" type="submit" v-show="!msgValida">Salvar</b-button>
            <b-button variant="success" v-show="msgValida" v-on:click.stop.prevent="novo">Novo</b-button>
            <router-link to="/listar-candidato" tag="b-button">Voltar</router-link>
        </b-form>
    </div>
</template>

<script>
import Candidato from '../../domain/candidato/Candidato';
import CandidatoService from '../../domain/candidato/CandidatoService';
import EmpresaService from '../../domain/empresa/EmpresaService';
import Conhecimento from '../../domain/conhecimento/Conhecimento';
import ConhecimentoService from '../../domain/conhecimento/ConhecimentoService';

export default {
    data() {
        return {
            candidato: new Candidato(),
            msgValida: undefined,
            msgInvalida: undefined,
            id: this.$route.params.id,
            empresas: [],
            generos: [],
            conhecimento: new Conhecimento(),
            conhecimentos: [],
            conhecimentosDeletados: [],
            fields: [
                { key: 'descricao', label: 'Conhecimento', class: 'text-center'},
                { key: 'nivel', label: 'Nível', class: 'text-center' },
                { key: 'deletar', label: 'Ação', class: 'text-center' }
            ]
        }
    },
    
    methods: {
        novo() {
            this.msgValida = undefined;
            this.msgInvalida = undefined;
            this.candidato = new Candidato();
        },

        salvar() {
            this.candidato.listConhecimento = this.conhecimentos;
            this.candidato.listConhecimentoDeletado = this.conhecimentosDeletados;
            console.log(this.conhecimentos)
            this.service.salvar(this.candidato)
            .then(
                () => this.msgValida = true,
                () => this.msgInvalida = true
            );
        },

        adicionar(){
            this.conhecimentos.push(this.conhecimento);
            this.conhecimento = new Conhecimento();
        },

        deletar(item) {
            this.conhecimentosDeletados.push(item);
            console.log(this.conhecimentosDeletados);
            this.conhecimentos.splice(this.conhecimentos.indexOf(item), 1);
        }
    },

    created() {
        this.service = new CandidatoService(this.$resource);
        this.serviceEmpresa = new EmpresaService(this.$resource);
        this.serviceConhecimento = new ConhecimentoService(this.$resource);
        this.serviceEmpresa.listar()
            .then(
            empresas => this.empresas = empresas,
            err => console.log(err)
             );
         this.service.buscarGenero()
            .then(
            generos => this.generos = generos,
            err => console.log(err)
             );
        if(this.id){
            this.service.buscar(this.id).then(candidato => this.candidato = candidato);
            this.serviceConhecimento.buscar(this.id)
            .then(conhecimentos => this.conhecimentos
             = conhecimentos);
        }
    }

}
</script>

<style scoped>


</style>