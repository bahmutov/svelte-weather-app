<script>
  const weather = {
    city: "Boston, MA",
    temp: "80 &deg; F",
    icon: "a01n",
    description: "raining"
  };
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
    <a href="">F</a>
    |
    <a href="">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>
  <figure>
    <img alt={weather.description} src="/icons/{weather.icon}.png" />
  </figure>
  <h3>{weather.city}</h3>
  <h1>
    {@html weather.temp}
  </h1>
  <p>{weather.description}</p>
</main>
