<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
         <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="rota in rotas">
                <router-link class="nav-link" :to="rota.path ? rota.path : '/'">
                    {{ rota.titulo }}
                </router-link>
            </li>
        </ul>
    </nav>
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

</style>