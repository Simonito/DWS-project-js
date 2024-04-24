<script>
    import Header from '../components/Header.svelte';
    import ExpenseForm from '../components/ExpenseForm.svelte';
    import UserExpenses from '../components/UserExpenses.svelte';
    import { onMount } from 'svelte';
    import { push, replace } from 'svelte-spa-router';
    import { serverUrl } from '../constants';
  
    let username = "ahoj";
    let expenses = [
        {
            expense_id: 0,
            amount: 0,
            paid_at: "0",
            category_name: "None",
        },
        {
            expense_id: 1,
            amount: 50.5,
            paid_at: "2024-01-04 11:43:00",
            category_name: "Entertainment",
        },
        {
            expense_id: 2,
            amount: 0,
            paid_at: "0",
            category_name: "None",
        },
    ];

    async function updateUserData() {
        try {
            const user_data_response = await fetch(serverUrl + '/v1/users/expenses', {
                credentials: 'include',
                method: 'GET',
            });

            if (user_data_response.status === 200) {
                const user_data_json = await user_data_response.json();
                username = user_data_json.username;
                expenses = user_data_json.user_expenses;
            } else if (user_data_response.status === 401) {
                await replace('/login');
            }
        } catch(err) {
            // handle the responses
            await replace('/login');
        }
        
    }

    onMount(() => {
        updateUserData();
    });


</script>
  
<div class="main">
    <Header {username} />
    <div class="form-container">
        <ExpenseForm on:expenseCreated={updateUserData} />
    </div>
    <div>
        <UserExpenses {expenses}/>
    </div>
</div>

<style>
    .main {
        /* margin-top: 15px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* height: 100vh; */
    }
</style>
