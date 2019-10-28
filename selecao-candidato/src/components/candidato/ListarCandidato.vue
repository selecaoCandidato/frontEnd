<template>
  <div class="container-fluid pl-lg-5 pr-lg-5">
    <div class="row justify-content-center">

      <div class="card text-center col-sm-6">

        <div class="card-body">
        <h2>Candidatos Cadastrados</h2>

          <div class="table-responsive mt-5">
            <table class="table">
            <thead>
                <th>nome</th>
                <th>Telefone</th>
            </thead>
            <tbody>
                <tr v-for="candidato in candidatos">
                    <td>{{ candidato.nome }}</td>
                    <td>{{ candidato.telefone }}</td>
                    <td>
                        <button type="submit" @click="deletar(candidato)">
                            <img src="../../assets/trash.png">
                        </button>
                        <router-link tag="button" :to="{ name:'editarCadastroCandidato', params: { id: candidato.id } }">
                            <img src="../../assets/edit.png">
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
          </div>
        <router-link class="btn btn-primary" to="/candidato" tag="button" >Cadastrar Candidato</router-link>
    </div>
      </div>
    </div>
  </div>

</template>

<script>
import CandidatoService from '../../domain/candidato/CandidatoService';
import "bootstrap/dist/css/bootstrap.css";

export default {

    data() {
        return {
            candidatos: []
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
        /**
            Ao deletar vários itens consecutivos, aparentemente, o id de um item já excluído fica no cache e
            é usado para excluir o próximo item, causando um erro: 'No class br.com.selecao.candidato.entity.Candidato entity with id X exists!'
            O mesmo problema ocorre com a tela de listagem das empresas.
        **/
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
