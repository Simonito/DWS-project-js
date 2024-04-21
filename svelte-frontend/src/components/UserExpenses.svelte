<script>
    import { onMount } from 'svelte';
    import UserExpense from './UserExpense.svelte';
    import { ascendingAmounts, descendingAmounts,
        ascendingCategories, descendingCategories,
        ascendingDates, descendingDates } from './orderings';
  
    let orderings = {
        'category ↓   ╹-╻_': descendingCategories,
        'category ↑   _╻-╹': ascendingCategories,
        'amount ↓   ╹-╻_': descendingAmounts,
        'amount ↑  _╻-╹': ascendingAmounts,
        'date ↓   ╹-╻_': descendingDates,
        'date ↑  _╻-╹': ascendingDates,
    };

    export let ordering = Object.keys(orderings)[2];
    $: ordering && reoderExpenses();

    export let expenses;
    $: expenses && updateDisplayedExpenses();

    let displayedExpenses = [];

    function removeExpense(event) {
        expenses = expenses.filter(exp => exp.expense_id != event.detail.expense_id);
        updateDisplayedExpenses();
    }

    async function updateDisplayedExpenses() {
        displayedExpenses = structuredClone(expenses);
        reoderExpenses();
    }

    function reoderExpenses() {
        displayedExpenses.sort(orderings[ordering]);
        displayedExpenses = displayedExpenses;
    }

    onMount(() => {
        updateDisplayedExpenses();
    });

</script>

<div class="user-expenses">
    <h2>User Expenses</h2>
    <label for="">
        <select bind:value={ordering}>
            {#each Object.entries(orderings) as [name, ord]}
            <option value={name}>{name}</option>
            {/each}
        </select>
    </label>
    {#each displayedExpenses as expense (expense.expense_id)}
        <UserExpense {expense} on:expenseDeleted={removeExpense}/>
    {/each}
</div>

<style>
    .user-expenses {
        margin-top: 20px;
    }
    
    select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #f2f2f2;
        cursor: pointer;
    }
</style>