<script>
  import CityCard from "../components/CityCard.svelte";
  import page from "page";
  import { dispatch } from "../store.js";
  import { blur } from "svelte/transition";

  let cities = ["Boston, MA", "New York, NY"];

  function changeCurrentCity(city) {
    return async () => {
      console.log("clicked on city", city);
      await dispatch({
        type: "SET_CURRENT",
        payload: city
      });
      page("/");
    };
  }
</script>

<style>
  nav {
    height: 24px;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>

<div in:blur={{ delay: 1000, duration: 1000 }}>
  <nav>
    <div>Favorites</div>
    <a href="">Add</a>
  </nav>
  <main>
    <section>
      {#each cities as city}
        <CityCard {city} on:click={changeCurrentCity(city)} />
      {/each}
    </section>
  </main>
</div>
