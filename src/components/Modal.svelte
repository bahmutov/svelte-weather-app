<script>
  import { scale } from "svelte/transition";

  export let open = false;

  function modalAction(node) {
    console.log("modal action", node);
    // list of functions to perform after the component
    // is destroyed (cleaning up)
    let fns = [];
    // lock the body to prevent scroll while the modal is shown
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      fns = [...fns, () => (document.body.style.overflow = original)];
    }

    return {
      destroy: () => {
        fns.map(fn => fn());
      }
    };
  }
</script>

<style>
  section {
    height: 100%;
    display: grid;
    place-items: center;
  }

  aside {
    background-color: white;
  }

  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>

{#if open}
  <div use:modalAction>
    <section>
      <aside in:scale out:scale={{ duration: 500 }}>
        <slot />
      </aside>
    </section>
  </div>
{/if}
