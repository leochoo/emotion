<script>
  import BoardImage from "./imgs/CMMB_Embed.png";
  let name;
  var microBitBle;

  async function connect() {
    microBitBle = await microBitBleFactory.connect();
    msg.innerHTML = "micro:bit BLE接続しました。";
  }

  async function disconnect() {
    await microBitBle.disconnect();
    msg.innerHTML = "micro:bit BLE接続を切断しました。";
  }

  async function readSensor() {
    var sdat = await microBitBle.readSensor();
    console.log("sensor:", sdat);
    isens.innerHTML =
      "acceleration:" +
      sdat.acceleration.x +
      "," +
      sdat.acceleration.y +
      "," +
      sdat.acceleration.z +
      "  magneticField:" +
      sdat.magneticField.x +
      "," +
      sdat.magneticField.y +
      "," +
      sdat.magneticField.z +
      "," +
      "  temperature:" +
      sdat.temperature +
      "  brightness:" +
      sdat.brightness +
      "  button:" +
      sdat.button;
  }

  async function print() {
    await microBitBle.printLED(txt.value);
  }

  async function showIcon() {
    await microBitBle.showIconLED(Number(txt2.value));
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <form name="js">
    <input type="button" value="Connect" on:click={connect} />
    <input type="button" value="Disconnect" on:click={disconnect} />
  </form>
  <div id="msg">---</div>
  <hr />
  <table>
    <tr>
      <td colspan="2">
        <input type="button" value="Read Sensors" on:click={readSensor} />
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
      <td><input type="button" value="Print" on:click={print} /></td>
    </tr>
    <tr>
      <td>
        <input id="txt2" style="width: 50px" type="text" value="0" />(0..39)
      </td>
      <td><input type="button" value="showIcon" on:click={showIcon} /></td>
    </tr>
  </table>

  <img src={BoardImage} alt="random board" width="300" />
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
