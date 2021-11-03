<script>
  export let name;
  import { connect } from "./main";
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <form name="js">
    <input type="button" value="Connect" onclick="connect();" />
    <input type="button" value="Disconnect" onclick="disconnect();" />
  </form>
  <div id="msg">---</div>
  <hr />
  <table>
    <tr>
      <td colspan="2">
        <input type="button" value="Read Sensors" onclick="readSensor();" />
      </td>
    </tr>
    <tr>
      <td>Internal Sensors</td>
      <td id="isens">-</td>
    </tr>
    <tr>
      <td colspan="2">LED</td>
    </tr>
    <tr>
      <td><input id="txt" type="text" value="Hello!" /></td>
      <td><input type="button" value="Print" onclick="print();" /></td>
    </tr>
    <tr>
      <td>
        <input id="txt2" style="width: 50px" type="text" value="0" />(0..39)
      </td>
      <td><input type="button" value="showIcon" onclick="showIcon();" /></td>
    </tr>
  </table>

  <img src="imgs/CMMB_Embed.png" width="300" />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
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
</style>
