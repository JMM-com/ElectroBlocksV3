<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    border: green solid 2px;
  }
</style>

{#if !segment || !segment.includes('electroblocks')}
  <Nav {segment} />
  <main>
    <slot />
  </main>
{:else}
  <slot />
{/if}
