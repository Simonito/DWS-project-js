<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { push, replace} from 'svelte-spa-router';
    import moment from 'moment';

    const dispatch = createEventDispatcher();

    let category = '';
    let amount = 0;
    let paid_at = '';
    let errorMessage = '';

    let categories = ["Life", "Housing", "Other"];
    let cat_to_id = {
        "Life": 0,
        "Housing": 1,
        "Other": 2,
    };

    async function refreshCategories() {
        const response = await fetch('/data-category.php', {
            method: 'GET',
        });

        if (response.status === 200) {
            const cats_res = await response.json();
            categories = cats_res.categories.map((cat) => cat.name);
            cat_to_id = cats_res.categories.reduce((acc, cat) => {
                acc[cat.name] = cat.category_id;
                return acc;
            }, {});
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const created_at = moment().format();

        const formData = new FormData();

        formData.append('category_id', cat_to_id[category]);
        formData.append('created_at', created_at);
        formData.append('amount', amount);
        formData.append('paid_at', paid_at);
        
        try {
            const response = await fetch('/submit-expense.php', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 201) {
                onExpenseCreated();
            } else {
                const json = await response.json(); 
                errorMessage = json.message;
                await push('/');
            }
        } catch(err) {
            errorMessage = 'An unexpected problem occurred.';
            await push('/');
        }
    }
    
    function onExpenseCreated() {
        dispatch('expenseCreated');
    }

    onMount(() => {
        refreshCategories();
    })
</script>
  
<section class="form-container">
    <form class="form" on:submit|preventDefault={handleSubmit}>
        <h2>Add Expense</h2>
        <div class="error">{errorMessage}</div>
        <label>
            Category:
            <select bind:value={category}>
                {#each categories as cat (cat)}
                <option value={cat}>{cat}</option>
                {/each}
            </select>
        </label>

        <label>
            Amount:
            <input type="number" step="0.01" bind:value={amount} />
        </label>

        <label>
            Paid At:
            <input type="datetime-local" bind:value={paid_at} />
        </label>

        <input type="submit" value="Submit" />
    </form>
</section>
  
<style>
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    select,
    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #f2f2f2;
    }

    input[type="submit"] {
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }

    input[type="submit"]:hover {
        background-color: #45a049;
    }

    .error {
        color: red;
        font-weight: bold;
        margin-bottom: 20px;
    }
</style>
  