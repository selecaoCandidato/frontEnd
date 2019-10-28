<template>
    <ul class="nav justify-content-md-center">
      <li class="nav-item" v-for="rota in rotas">
        <router-link :to="rota.path ? rota.path : '/'" class="nav-link active">
            <h4>{{ rota.titulo }}</h4>
        </router-link>
      </li>
    </ul>



</template>

<script>
export default {
    props: {
        rotas: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
ul{

    padding-top: 10px;

}
</style>
