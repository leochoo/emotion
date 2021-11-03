<script>
  import BoardImage from "./imgs/CMMB_Embed.png";
  import { Button } from "sveltestrap";
  let name;
  var microBitBle;

  let sensorInfo;
  let gx;
  let gy;
  let gz;
  let temperature;
  let brightness;
  let buttonCombination;

  async function connect() {
    microBitBle = await microBitBleFactory.connect();
    msg.innerHTML = "micro:bit BLE接続しました。";
  }

  async function disconnect() {
    await microBitBle.disconnect();
    msg.innerHTML = "micro:bit BLE接続を切断しました。";
  }

  let reading = false;

  async function readSensor() {
    // toggle reading state
    reading = !reading;
    console.log("readSensor", reading);

    for (let i = 0; i < 10; i++) {
      await setTimeout(getSensorData, 1000);
    }
  }

  async function getSensorData() {
    if (reading) {
      var sdat = await microBitBle.readSensor();
      console.log("sensor:", sdat);

      gx = sdat.acceleration.x;
      gy = sdat.acceleration.y;
      gz = sdat.acceleration.z;
      temperature = sdat.temperature;
      brightness = sdat.brightness;
      buttonCombination = sdat.button;
    }
  }

  async function print() {
    await microBitBle.printLED(txt.value);
  }

  async function showIcon() {
    await microBitBle.showIconLED(Number(txt2.value));
  }
</script>

<main>
  <h1>Team Emotion</h1>
  <p>あなたの応援の気持ちを送りましょう。</p>

  <form name="js">
    <Button type="button" color="primary" on:click={connect}>Connect</Button>
    <Button type="button" color="danger" on:click={disconnect}
      >Disconnect</Button
    >
  </form>
  <div id="msg">---</div>
  <hr />
  <table>
    <tr>
      <td colspan="2">
        <Button type="button" color="info" on:click={readSensor}
          >Read Sensors</Button
        >
      </td>
    </tr>

    <tr>
      <td>Sensor Info Table</td>
    </tr>
    <tr>
      <td>Gx</td>
      <td>{gx}</td>
    </tr>
    <tr>
      <td>Gy</td>
      <td>{gy}</td>
    </tr>
    <tr>
      <td>Gz</td>
      <td>{gz}</td>
    </tr>
    <tr>
      <td>Temperature</td>
      <td>{temperature}</td>
    </tr>
    <tr>
      <td>Brightness</td>
      <td>{brightness}</td>
    </tr>
    <tr>
      <td>Button</td>
      <td>{buttonCombination}</td>
    </tr>

    <tr>
      <td colspan="2">LED</td>
    </tr>
    <tr>
      <td><input id="txt" type="text" value="Hello!" /></td>
      <td
        ><Button type="button" color="secondary" on:click={print}>Print</Button
        ></td
      >
    </tr>
    <tr>
      <td>
        <input id="txt2" style="width: 50px" type="text" value="0" />(0..39)
      </td>
      <!-- <td><input type="button" value="showIcon" on:click={showIcon} /></td> -->
      <td
        ><Button type="button" color="secondary" on:click={showIcon}
          >Show Icon</Button
        ></td
      >
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
