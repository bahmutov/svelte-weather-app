<script>
  import Weather from "../components/Weather.svelte";
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";
  import { getJSON } from "../lib/async.js";
  import { store } from "../store.js";

  let temp = 21.7;
  let unit = "c";

  // let weather = {
  //   city: "Boston, MA",
  //   temp: "80 &deg; F",
  //   icon: "a01n",
  //   description: "raining"
  // };

  function getWeather() {
    const current = $store.current.toLowerCase().replace(", ", ",");

    return getJSON(`/api/weather?city=${current}&country=us`).then(results => {
      console.log("results", results);
      const weather = {
        temp: `${results.temp} &deg; C`,
        icon: results.weather.icon,
        description: results.weather.description,
        city: `${results.city_name}, ${results.state_code}`
      };
      return weather;
    });
  }

  $: displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;

  $: {
    // debugging
    console.log("temp", temp);
  }

  function convertToF() {
    temp = celsiusToFahrenheit(temp);
    unit = "f";
  }
  function convertToC() {
    temp = fahrenheitToCelsius(temp);
    unit = "f";
  }
</script>

<style>
  h3 {
    color: rebeccapurple;
  }
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<nav>
  <div>
    <a on:click|preventDefault={convertToF}>F</a>
    |
    <a on:click|preventDefault={convertToC}>C</a>
  </div>
  <a href="/favorites">Favorites</a>
</nav>
<main>
  <p>
    {@html displayTemp}
  </p>
  {#await getWeather()}
    <p>Loading...</p>
  {:then weather}
    <Weather {...weather} />
  {/await}
</main>
