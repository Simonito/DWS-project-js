<script>
	import DeleteDialog from './DeleteDialog.svelte';
    import { createEventDispatcher } from 'svelte';
    import { push } from 'svelte-spa-router';

    const dispatch = createEventDispatcher();

    export let expense;


    async function deleteExpense() {
        const formData = new FormData();
        formData.append('expense_id', expense.expense_id);

        try {
            const response = await fetch('/remove-expense.php', {
                method: 'DELETE',
                body: formData
            });

            if (response.status === 200) {
                onExpenseDeleted();
            } else if (response.status === 401) {
                // unauthorized - return to login page
                push('/login');
            }
        } catch (err) {
            // i cannot bother catching errors, so if something goes wrong ... blame me
        }
    }

    function onExpenseDeleted() {
        dispatch('expenseDeleted', {
            expense_id: expense.expense_id
        });
    }


</script>

<div class="user-expense">
    <div class="icon-button-div">
        <div id="cat-divs">
            <div>
                Category:
            </div>
            <div class="item-val">
                {expense.category_name}
            </div>
        </div>
        <div id="del-but-div">
            <DeleteDialog on:deleteExpense={deleteExpense}/>
        </div>
    </div>

    <div class="next-to-each">
        Amount:
        <div class="item-val spaced">
            {expense.amount}€
        </div>
    </div>

    <div class="next-to-each">
        Paid At:
        <div class="item-val spaced">
            {expense.paid_at}
        </div>
    </div>
</div>  

<style>
    .user-expense {
        margin-bottom: 10px;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 4px;
    }
    
    .icon-button-div {
        text-align: right;
        padding: 0px;
        overflow: hidden;
    }

    .next-to-each {
        display: flex;
    }

    .spaced {
        padding-left: 10px;
    }
    .item-val {
        font-weight: 600;
    }

    #cat-divs {
        float: left;
        text-align: left;
    }
    #del-but-div {
        overflow: hidden;
        margin: 5px;
    }
</style>