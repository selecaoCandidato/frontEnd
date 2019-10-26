<template>
  <div>
    <comp-menu :rotas="routes"/>

    <div class="col-md-10 offset-md-1">
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


</style>
