<script>
  import { auth } from "../firebase.js";
  import { signInAnonymously } from "firebase/auth";
  import { authState } from "rxfire/auth";
  import { userStatus } from "./stores";

  let user_status;
  userStatus.subscribe((value) => {
    user_status = value;
  });

  let user;
  const unsubscribe = authState(auth).subscribe((u) => {
    user = u;
    userStatus.set(user);
    console.log("user_status subscribed", { user_status });
  });
  async function login() {
    console.log("log in");
    await signInAnonymously(auth);
  }
  async function logout() {
    console.log("log out");
    await auth.signOut();
  }
</script>

<main>
  {#if user_status}
    <button type="button" class="btn btn-dark" on:click={logout}>Logout</button>
    <hr />
  {:else}
    <button type="button" class="btn btn-dark" on:click={login}>
      Sign In Anonymously
    </button>
  {/if}
</main>
