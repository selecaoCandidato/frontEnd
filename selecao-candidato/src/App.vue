<template>
  <div>
    <div id="app">
      <h1>Seleção de Candidatos</h1>
    </div>

    <div class="menu">
      <comp-menu :rotas="routes"/>
    </div>

    <div class="conteudo">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
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
  width: 100%;
  text-align: center;
  vertical-align: top;
  display: inline-block;
}

.conteudo {
  width: 100%;
  padding: 2%;
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
