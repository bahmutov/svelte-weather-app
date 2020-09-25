<script>
  import Weather from "../components/Weather.svelte";
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";

  let temp = 21.7;
  let unit = "c";

  const weather = {
    city: "Boston, MA",
    temp: "80 &deg; F",
    icon: "a01n",
    description: "raining"
  };

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
  <a href="">Favorites</a>
</nav>
<main>
  <p>
    {@html displayTemp}
  </p>
  <Weather {...weather} />
</main>
