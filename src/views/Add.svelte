<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let city;

  function handleSubmit() {
    console.log("submitting", { city });
    dispatch("add", { city });
    city = "";
  }
</script>

<main>
  <section>
    <h3>Add Location</h3>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="city">City</label>
        <input type="text" id="city" bind:value={city} />
      </div>
      <div>
        <label for="country">Country</label>
        <select id="country">
          <option>-- select --</option>
        </select>
      </div>
      <div>
        <button>Add</button>
        <a href="">Cancel</a>
      </div>
    </form>
  </section>
</main>
