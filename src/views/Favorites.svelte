<script>
  import CityCard from "../components/CityCard.svelte";
  let cities = ["Boston, MA", "New York, NY"];

  function changeCurrentCity(city) {
    return () => {
      console.log("clicked on city", city);
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
