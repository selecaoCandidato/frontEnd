  <template>
      <div class="container-fluid">
        <div class="row justify-content-center">

        <div class="card text-center">

          <div class="card-body">

              <h2 class="mb-4 mt-3">Cadastrar Candidatos</h2>

            <form @submit.prevent="salvar()">
                <div class="alert alert-success" role="alert" v-show="msg[1]==='sucesso'">
                  {{msg[0]}}
                </div>

                <div class="alert alert-danger" role="alert" v-show="msg[1]==='erro'">
                  {{msg[0]}}
                </div>

              <div class="form-group row">
                <label for="nome" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="nome" v-model="candidato.nome">
                </div>
               </div>

              <div class="form-group row">
                <label for="idade" class="col-sm-2 col-form-label">Idade</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control" id="idade" v-model="candidato.idade">
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Sexo</label>
                <div class="form-check col-sm-2">
                  <input class="form-check-input" type="radio" name="masculino" id="sexo-masculino" value="m" v-model="candidato.sexo">
                  <label class="form-check-label" for="sexo-masculino">Masculino</label>
                </div>
                <div class="form-check col-sm-1">
                  <input class="form-check-input" type="radio" name="feminino" id="sexo-feminino" value="f" v-model="candidato.sexo">
                  <label class="form-check-label" for="sexo-feminino">Feminino</label>
                </div>
              </div>

              <div class="form-group row">
                <label for="telefone" class="col-sm-2 col-form-label">Telefone</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="telefone" v-model="candidato.telefone">
                </div>
              </div>


              <div class="form-group row">
                <label for="empresa" class="col-sm-2 col-form-label">Empresa</label>
                <div class="col-sm-10">
                  <!--
                      Quando o formulário é preencido com os dados para serem editados, embora carregue carretamente os dados da empresa,
                      o valor não é setado no componente. Ainda desconheço o motivo, embora aparentemente o componente esteja configurado corretamente..
                  -->
                  <select id="empresa" class="browser-default custom-select custom-select-md mb-3" v-model="candidato.empresa">
                    <option v-for="empresa in empresas" v-bind:value="empresa" v-text="empresa.nome"></option>

                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="observacao" class="col-sm-2 col-form-label">Observação</label>
                <div class="col-sm-10">
                  <textarea class="form-control" id="observacao" rows="3" v-model="candidato.observacao"></textarea>
                </div>
              </div>

              <h2 class="mt-5 mb-4">Conhecimentos</h2>

              <div class="form-inline">
                <label for="conhecimento" class="form-group col-sm-3">Conhecimento</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" id="conhecimento" v-model="conhecimento.conhecimento">
                </div>

                <label for="nivel" class="form-group">Nível</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" id="nivel" v-model="conhecimento.nivel">
                </div>
                <div class="col-sm-2">
                <button class="btn btn-primary" v-on:click.stop.prevent="adicionar">Adicionar</button>
                </div>


                <div class="table-responsive mt-5">
                  <table class="table">
                    <thead>
                    <tr>
                      <th scope="col">Conhecimento</th>
                      <th scope="col">Nível</th>
                      <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr  v-for="conhecimentoSalvo in candidato.conhecimentos">
                      <th>{{conhecimentoSalvo.conhecimento}}</th>
                      <th>{{conhecimentoSalvo.nivel}}</th>
                      <th>
                        <button type="submit" v-on:click.stop.prevent="deletar(conhecimentoSalvo)">
                          <img src="../../assets/trash.png">
                        </button>
                      </th>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

                <button type="submit" v-show="msg.length < 1" class="btn btn-primary">Salvar</button>
                <button v-show="msg.length > 0" v-on:click.stop.prevent="novo" class="btn btn-primary">Novo</button>
                <router-link to="/listar-candidato" tag="button" class="btn btn-primary">Voltar</router-link>
            </form>
          </div>
        </div>
        </div>
      </div>
  </template>

  <script>
      import "bootstrap/dist/css/bootstrap.css";
      import Candidato from '../../domain/candidato/Candidato';
      import CandidatoService from '../../domain/candidato/CandidatoService';
      import EmpresaService from "../../domain/empresa/EmpresaService";
      import Conhecimento from "../../domain/conhecimento/Conhecimento";
      import Empresa from '../../domain/empresa/Empresa';

  export default {
      data() {
          return {
              candidato: new Candidato(),
              conhecimento: new Conhecimento(),
              msg: [],
              id: this.$route.params.id,
              empresas:[],
              empresa: new Empresa(),
              conhecimentos:[]
          }
      },

      methods: {
          novo() {
              this.msg = [];
              this.candidato = new Candidato();
              this.candidato.conhecimentos = [];
          },

          salvar() {
              this.service.salvar(this.candidato)
              .then(
                  () => this.msg = ["Salvo com sucesso", "sucesso"],
                  () => this.msg = ["Erro ao Salvar", "erro"]
              );
          },

          adicionar(){
              this.candidato.conhecimentos.push(this.conhecimento);
              this.conhecimento = new Conhecimento();
          },

          deletar(conhecimento){
              let indice = this.candidato.conhecimentos.indexOf(conhecimento, 1);

              //Não consegui entender o motivo do índice do primeiro elemento ser -1 quando deveria ser 0.
              this.candidato.conhecimentos.splice(indice < 0 ? 0 : indice, 1);
          }
      },

      created() {
          this.service = new CandidatoService(this.$resource);

          this.empresaService = new EmpresaService(this.$resource);

          this.empresaService.listar().then( empresas => this.empresas = empresas, err => console.log(err));

          if(this.id){
              this.service.buscar(this.id).then(candidato => this.candidato = candidato);

          }

          if(this.candidato.conhecimentos.length < 1) this.candidato.conhecimentos = [];
      }

  }
  </script>

  <style>
    .container{
      padding-top: 0;
    }
  </style>
