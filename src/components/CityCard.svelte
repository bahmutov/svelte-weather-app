<script>
  import { createEventDispatcher } from "svelte";
  export let city;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click", { city });
  }
</script>

<aside on:click={handleClick}>
  <h3>{city}</h3>
</aside>
