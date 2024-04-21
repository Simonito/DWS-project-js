<script>
    import Router from 'svelte-spa-router'
    import LogIn from './routes/LogIn.svelte'
    import Register from './routes/Register.svelte'
    import HomePage from './routes/HomePage.svelte'
</script>


<Router routes={
    {
        '/': HomePage,
        '/login': LogIn,
        '/register': Register,
    }
}/>
