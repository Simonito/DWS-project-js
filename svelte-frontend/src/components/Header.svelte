<script>
    import { push, replace } from "svelte-spa-router";

    export let username = 'lols';

    async function logout() {
        const response = await fetch('/logout.php', {
            method: 'GET',
        });

        if (response.status === 200) {
            push('/login');
        } else {
            username = "MAAAAH";
            replace('/login');
        }
    }

</script>
  
<div id="header">
    <div>
    </div>
    <div>
        <p>Hello, {username}!</p>
    </div>
    <button on:click|preventDefault={logout}>Logout</button>
</div>


<style>
    #header {
        background-color: #4caf50;
        padding: 10px;
        /* padding-top: 50px; */
        text-align: center;
        color: white;
        border-radius: 4px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        width: 80%;
    }

    /* p {
        color: black;
        margin-top: 20px;
    } */

    button {
        background-color: #45a049;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #398438;
    }
</style>
  