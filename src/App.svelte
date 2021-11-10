<script>
  import "bootswatch/dist/litera/bootstrap.min.css";
  import Home from "./Home.svelte";
  import Login from "./Login.svelte";
  import Sensor from "./Sensor.svelte";

  import { userStatus } from "./stores";

  let user_status;
  userStatus.subscribe((value) => {
    user_status = value;
    console.log("user status changed", value);
  });
</script>

<main>
  <Home />
  <div>user_status: {user_status}</div>
  <Login />
  {#if user_status}
    <div>
      Logged in as {user_status["uid"]}
    </div>
    <Sensor />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
