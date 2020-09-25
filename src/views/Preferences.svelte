<header>
  <a href="">Cancel</a>
</header>
<main>
  <h1>Preferences</h1>
  <p>Weather application preferences</p>
  <form>
    <div>
      <label for="units">Units</label>
      <select id="units">
        <option>--- select ---</option>
        <option value="M">Metric (Celcius, m/s, mm)</option>
        <option value="S">Scientific (Kelvin, m/s, mm)</option>
        <option value="I">Fahrenheit (F, mph, in)</option>
      </select>
    </div>
    <div>
      <label for="background">Background Color</label>
      <input id="background" type="color" />
    </div>
    <div>
      <label for="color">Color</label>
      <input id="color" type="color" />
    </div>
    <div class="buttons">
      <button>Save</button>
    </div>
  </form>
</main>
<style>
  header {
    text-align: right;
  }
  .buttons {
    display: grid;
    place-items: center;
  }
</style>
