<template>
  <div>
    <div id="app">
      <h1>Seleção de Candidatos</h1>
    </div>

    <div class="menu">
      <comp-menu :rotas="routes"/>
    </div>

    <div class="conteudo">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {
  
  components: {
    'comp-menu': Menu
  },

  data () {
    return {
      routes: routes.filter(route => route.titulo)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

.menu {
  width: 10%;
  height: 500px;
  vertical-align: top;
  display: inline-block;
}

.conteudo {
  width: 80%;
  display: inline-block;
}

</style>
