<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  export let city;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click", { city });
  }
</script>

<aside
  in:fly={{ x: -1000, duration: 1000, delay: 1500 }}
  on:click={handleClick}>
  <h3>{city}</h3>
</aside>
