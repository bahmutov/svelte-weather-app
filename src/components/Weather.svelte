<script>
  export let icon, description, city, temp;
</script>

<figure>
  <img alt={description} src="/icons/{icon}.png" />
</figure>
<h3>{city}</h3>
<h1>
  {@html temp}
</h1>
<p>{description}</p>
