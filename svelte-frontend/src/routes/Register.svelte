<script>
    import { push } from 'svelte-spa-router';

    let errorMessage = '';

    let username = '';
    let password = '';

    async function handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('/register.php', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 201) {
                await push('/');
            } else {
                const json = await response.json();
                errorMessage = json.message;
                await push('/register');
            }
        } catch(err) {

        }
    }

    $: pushLogin = () => {
        push('/login');
    }
</script>
<style>
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .form {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .form h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }
  
    .form input[type="text"],
    .form input[type="password"] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #f2f2f2;
    }
  
    .form input[type="submit"] {
      background-color: #4caf50;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .form input[type="submit"]:hover {
      background-color: #45a049;
    }
  
    .form p {
      margin-top: 20px;
    }
  
    .error {
      color: red;
      font-weight: bold;
      margin-bottom: 20px;
    }
</style>
  
<div class="form-container">
    <form class="form" style="display: flex" on:submit|preventDefault={handleRegister}>
        <h2>Register</h2>
        <div class="error">{errorMessage}</div>
        <input type="text" bind:value={username} placeholder="Username" name="username" required />
        <input type="password" bind:value={password} placeholder="Password" name="password" required />
        <input type="submit" value="Register" />
        <p>Already have an account? <button on:click|preventDefault={pushLogin}>Login</button></p>
    </form>
</div>