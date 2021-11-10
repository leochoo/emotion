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

  const waitFor = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  let prevAcc = null;
  let currAcc = null;
  let diffX = 0;
  let diffY = 0;
  let diffZ = 0;
  let maxDirection = "";
  let maxDiff = 0;

  let totalScore = 0;

  async function readSensor() {
    // toggle reading state
    reading = !reading;
    console.log("readSensor", reading);
    // if reading state true
    if (reading) {
      // for every second, fetch the sensor data!
      for (let i = 0; i < 10; i++) {
        var sdat = await microBitBle.readSensor();

        gx = sdat.acceleration.x;
        gy = sdat.acceleration.y;
        gz = sdat.acceleration.z;

        if (i === 0 && prevAcc === null) {
          prevAcc = sdat.acceleration;
          console.log("prevAcc", prevAcc);
        }
        if (i === 1 && currAcc === null) {
          currAcc = sdat.acceleration;
          console.log("currAcc", currAcc);
        }

        if (prevAcc !== null && currAcc !== null) {
          diffX = Math.abs(currAcc.x - prevAcc.x);
          diffY = Math.abs(currAcc.y - prevAcc.y);
          diffZ = Math.abs(currAcc.z - prevAcc.z);

          // update currAcc and prevAcc to the next sensor data
          prevAcc = currAcc;
          currAcc = sdat.acceleration;

          // take the maximum of diffX, diffY, diffZ
          if (diffX > diffY && diffX > diffZ) {
            maxDirection = "x";
            maxDiff = diffX;
          } else if (diffY > diffX && diffY > diffZ) {
            maxDirection = "y";
            maxDiff = diffY;
          } else {
            maxDiff = diffZ;
            maxDirection = "z";
          }
          console.log(maxDirection, maxDiff);

          // update totalScore
          totalScore += maxDiff;
          await handleScore();
        }

        // console.log("i", i);
        // console.log("sensor:", sdat);
        // console.log("console.log:", sdat.acceleration.x);
        // console.log("diffX", diffX);

        if (reading == false) {
          break;
        }
        await waitFor(1000);
      }
    }
  }

  async function print() {
    await microBitBle.printLED(txt.value);
  }

  async function showIcon() {
    await microBitBle.showIconLED(Number(txt2.value));
  }

  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../firebase.js";
  let testToggle = false;
  async function handleToggle() {
    testToggle = !testToggle;
    console.log("testToggle: ", testToggle);
    await setDoc(doc(db, "events", "testEvent"), {
      testToggle: testToggle,
    });
  }
  async function handleScore() {
    console.log("sending score to firebase");
    await setDoc(doc(db, "events", "testEvent"), {
      totalScore: totalScore,
    });
  }
</script>

<main>
  <form name="js">
    <Button type="button" color="primary" on:click={connect}>Connect</Button>
    <Button type="button" color="danger" on:click={disconnect}
      >Disconnect</Button
    >
  </form>
  <form name="js">
    <Button type="button" color="primary" on:click={handleToggle}
      >testToggle</Button
    >
  </form>
  <h2>Total Score: {totalScore}</h2>
  <div id="msg">---</div>
  <hr />
  <div>
    <table>
      <tr>
        <td colspan="2">
          {#if reading == false}
            <Button type="button" color="info" on:click={readSensor}
              >Read Sensors (10s)</Button
            >
          {:else}
            <Button type="button" color="danger" on:click={readSensor}
              >Stop Reading</Button
            >
          {/if}
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
        <td colspan="2">LED</td>
      </tr>
      <tr>
        <td><input id="txt" type="text" value="Hello!" /></td>
        <td
          ><Button type="button" color="secondary" on:click={print}
            >Print</Button
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
  </div>
  <img src={BoardImage} alt="random board" width="300" />
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
