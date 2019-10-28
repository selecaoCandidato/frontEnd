<template>
	<div>
		<div id="app" class="jumbotron">

		<h1 class="display-4">Seleção de Candidatos</h1>

		<div class="menu">
			<comp-menu :rotas="routes"/>
		</div>

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
import "bootstrap/dist/css/bootstrap.css";

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
}

h1, h2 {
	font-weight: normal;
}

.jumbotron{
  padding: 20px;
  margin-bottom: 0px;
}
</style>
