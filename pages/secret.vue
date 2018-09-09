<template>
    <div class="row justify-content-center">
        <div class="w-75 text-center">
            <h1 class="text-muted">Página super secreta</h1>
            <p>Si intentas acceder a esta URL no identificado, verás la página de error que te indica que no estás identificado.</p>
            <nuxt-link to="/login">Volver a la página de login</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
      middleware: 'auth'
    }
</script>