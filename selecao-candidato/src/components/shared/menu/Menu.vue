<template>
    <b-navbar toggleable="lg" type="dark" variant="info"  fixed>
    
            <b-navbar-brand v-for="rota in rotas" :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</b-navbar-brand>
        
    </b-navbar>
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