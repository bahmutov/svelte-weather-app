<script>
  import router from "page";
  import Current from "./views/Current.svelte";
  import Favorites from "./views/Favorites.svelte";
  import Add from "./views/Add.svelte";

  let page;

  router("/", navTo(Current));
  router("/favorites", navTo(Favorites));

  router.start();

  function navTo(Component) {
    return ctx => {
      page = Component;
    };
  }
</script>

<svelte:component this={page} />
<!-- <Current /> -->
<!-- <Favorites /> -->
