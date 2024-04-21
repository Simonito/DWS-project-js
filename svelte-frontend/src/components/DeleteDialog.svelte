<script>
    import { Confirm } from 'svelte-confirm'
    import { Trash2Icon } from 'svelte-feather-icons';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function deleteItem () {
        dispatch('deleteExpense');
    }
</script>

<Confirm
    confirmTitle="Delete"
    cancelTitle="Cancel"
    let:confirm="{confirmThis}"
>
    <button on:click="{() => confirmThis(deleteItem, 0)}">
        <Trash2Icon/>
    </button>

    <span slot="title">
        Delete this item?
    </span>
    <span slot="description">
        You won't be able to revert this!
    </span>
</Confirm>

<style>
    button {
        background-color: #a06645;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #843c38;
    }
</style>