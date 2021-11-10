<script>
  export let id;
  import { Router, Link, Route } from "svelte-routing";
</script>

<main>
  <Link to="/">Back</Link>
  <h3>Welcome to ChatRoom {id}</h3>
</main>
