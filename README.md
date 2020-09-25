---
title: Svelte101 Workshop
css: https://unpkg.com/mvp.css
code: true
---

<main>

# Svelte101 Workshop Notes

## About this workshop

This workshop is an immersive dive into the Svelte Framework, as a group, we will build a front-end application in Svelte and through the course of building this application, we will learn many of the features and benefits that Svelte has to offer. The notes will reference links to the svelte documentation if you want to dig deeper into any one feature. The purpose of this workshop is to give you a hands on feel of what it is like to work with the framework day in and day out. If you are up to the challenge please code along with the instructor, if the pace is too fast for you, don't worry, after the event the recorded version will be available for your to go at your own pace.

## About me

Tom Wilson has been in the software development industry for over 25 years. Continuous learning and teaching have been a part of his journey. Since 2007, Tom has participated in the tech community hosting and running meetups and providing workshops focused on software development. In 2016, Tom launched a coding school in Charleston, SC, JRS Coding School, focused on full-stack javascript. In 2020, Tom founded hyper63; a company focused on leading engineers from beginner to expert.

## About the project

In this workshop, we are going to build a weather application, this application, will show the current weather of a given location as well as list our favorite locations and and switch the current weather display from one of the favorite locations, then we will allow the user to add a new favorite city, to their favorites.

## Housekeeping

In order to follow along with this workshop you will need an api key from https://weatherbit.io it is free, it takes a little bit of time to provision, so you may want to do this soon.

## Setup

Pull workshop template down from github
and initialize it and provide link to clone.

```sh
npx degit hyper63/svelte101-workshop weather-app
cd $_
git init
git add .
git commit -am "first commit"
gh create s101-2020-9-25
# add remote repo
yarn
```

Open in vscode

```sh
code .
```

## Tour Repository

Check out quickstart guide:

https://svelte.dev/blog/the-easiest-way-to-get-started

Quick tour of a common svelte project

- public - contains all public assets
- src - contains your source code

```sh
git checkout -b 1-template-basics
```

## Svelte Basics

https://svelte.dev/docs

Lets turn this static html into a template:

`src/views/Current.svelte`

```html
<script>
  const weather = {
    city: "Charleston, SC",
    temp: "72 &deg; F",
    icon: "a01n",
    description: "clear",
  };
</script>
<nav>
  <div>
    <a href="">F</a>
    |
    <a href="">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>
  <figure>
    <img alt="{weather.description}" src="/icons/{weather.icon}.png" />
  </figure>
  <h3>{weather.city}</h3>
  <h1>{@html weather.temp}</h1>
  <p>{weather.description}</p>
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

<article><aside>

Declare variables in the `<script></script>` block and reference them in your template using `{ }` curly braces. NOTE: you can place any JS expression in the curly braces and it will be evaluated.

</aside></article>

<article><aside>

You can also curly braces within properties, `src="/icons/{weather.icon}.png"`

</aside></article>

<article><aside>

Use the `{@html ...}` to convert a variable to html. https://svelte.dev/docs#html

</aside></article>

<article><aside>

Create checkpoint

```sh
git commit -am "1-template-basics"
git push origin 1-template-basics
git checkout -b 2-creating-component
```

</aside></article>

## Components - Creating a component

Lets convert the main section of the Current.svelte component into a reusable weather component:

`src/components/Weather.svelte`

```html
<script>
  // proptypes (we can validate props at runtime using proptypes module)
  export let icon, description, city, temp;
</script>
<figure>
  <img alt="{description}" src="/icons/{icon}.png" />
</figure>
<h3>{city}</h3>
<h1>{@html temp}</h1>
<p>{description}</p>
```

Now our `src/views/Current.svelte` component looks like this

```html
<script>
  import Weather from "../components/Weather.svelte";
  const weather = {
    city: "Charleston, SC",
    temp: "72 &deg; F",
    icon: "a01n",
    description: "clear",
  };
</script>
<nav>
  <div>
    <a href="">F</a>
    |
    <a href="">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>
  <Weather {...weather} />
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

We can pass props by using `name={value}` or if the prop is the same name as the variable. `{value}` or we can use the spread operator: `{...value}` which will take an object and spread each key as a property.

<article><aside>

Create Checkpoint

```sh
git commit -am "2-creating-component"
git push origin 2-creating-component
git checkout -b 3-reactivity
```

</aside></article>

## Reactivity - Changing display of temp

In the top left corner of our app, we have a couple of links, on `F` and one `C` we want to capture the `click` event of these links and then based on the current temperature unit, we want to convert to the other temperature unit. We can use a module called `temperature` to help with the conversion. But we need to know the current value of the temperature and the current unit it is in. For example, now we have it listed as Fahrenheit.

In order to listen for a click event, we can use the `on` directive. The `on` directive takes an event that we want to listen to and we assign it to a function.

```html
<button on:click="{handleClick}">...</button>
<script>
  function handleClick() {
    console.log("click");
  }
</script>
```

Then in the function we want to change the temp value and unit based on the click function.

This is where reactivity comes into play. We can listen to the temp and unit variables and create a new derived variable called `displayTemp` this new variable will be the string we want to present.

```html
<script>
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";

  import Weather from "../components/Weather.svelte";

  let temp = 21.7;
  let unit = "c";

  $: displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;

  function convertToF() {
    temp = celsiusToFahrenheit(temp);
    unit = "f";
  }

  function convertToC() {
    temp = fahrenheitToCelsius(temp);
    unit = "c";
  }
</script>
<nav>
  <div>
    <a href="#" on:click|preventDefault="{convertToF}">F</a>
    |
    <a href="#" on:click|preventDefault="{convertToC}">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>{@html displayTemp} ...</main>
```

In this lesson, we learned about the `on` directive and how we can `|preventDefault` to directives. Also we learned about the `$:` reactivity command and how it can work like a formula in excel.

<article><aside>

Create checkpoint

```sh
git commit -am "3-reactivity"
git push origin 3-reactivity
git checkout -b 4-async
```

</aside></article>

## Async - Calling an API

Now that we have moved our presentation to a component, lets add an api call to our Current view. We want to call the `/api/weather` endpoint using a `GET` method call. We need to give the request a querystring of `city=${city}&country=${country}`.

<article><aside>

At this point, we will need the api key from weatherbit.io. We will want to add it to our `.env` file and restart our server.

</aside></article>

```text
WEATHER_KEY=(Your key)
```

Lets use the `async` library in our `lib` folder to call the weather api.

`src/views/Current.svelte`

```html
<script>
  import { getJSON } from "../lib/async.js";

  getJSON("/api/weather?city=charleston,sc&country=us").then(
    console.log.bind(console)
  );
</script>
```

We should see the weather data come back from the api. We want to use this data to render our weather component.

Using the `onMount` function from svelte will let us handle async requests and apply the results to local variables.

```html
<script>
  import { getJSON } from "../lib/async.js";
  import Weather from "../components/Weather.svelte";
  import { onMount } from "svelte";

  let weather = {
    city: "Charleston, SC",
    temp: "72 &deg; F",
    icon: "a01n",
    description: "clear",
  };

  onMount(async () => {
    const results = await getJSON("/api/weather?city=charleston,sc&country=us");
    weather = {
      temp: `${results.temp} &deg; C`,
      icon: results.weather.icon,
      description: results.weather.description,
      city: `${results.city_name} ${results.state_code}`,
    };
  });
</script>
<nav>
  <div>
    <a href="">F</a>
    |
    <a href="">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>
  <Weather {...weather} />
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

Or we could create an async function and use the `{#await}` command.

```html
<script>
  import { getJSON } from "../lib/async.js";
  import Weather from "../components/Weather.svelte";

  function getWeather() {
    return getJSON("/api/weather?city=charleston,sc&country=us").then(
      (results) => ({
        temp: `${results.temp} &deg; C`,
        icon: results.weather.icon,
        description: results.weather.description,
        city: `${results.city_name} ${results.state_code}`,
      })
    );
  }
</script>
<nav>
  <div>
    <a href="">F</a>
    |
    <a href="">C</a>
  </div>
  <a href="">Favorites</a>
</nav>
<main>
  {#await getWeather()} Loading... {:then weather}
  <Weather {...weather} />
  {/await}
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

In this lesson, we learned about two ways to handle async requests from components at the point of loading.

<article><aside>

Create checkpoint

```sh
git commit -am "4-async"
git push origin 4-async
git checkout -b 5-events
```

</aside></article>

## {#each} and Dispatching Events

Lets start working on the `src/views/Favorites.svelte` view. This view lists the users favorite cities that they would like to get the weather from. Eventually, we will pull this list from the database, but for now, we will create a local variable.

<article><aside>

Change `App` to render the `Favorites` view

</aside></article>

`src/views/Favorites.svelte`

We need to handle the onclick event of each item, lets create a Card component then dispatch the click event from the card component.

From the click event, we need to route to the current view with the correct city parameters.

```html
<script>
  import CityCard from "../components/CityCard.svelte";

  let cities = ["Charleston, SC", "New york, NY", "San Francisco, CA"];

  function changeCurrentCity(city) {
    return () => {
      console.log("city", city);
    };
  }
</script>
<nav>
  <div>Favorites</div>
  <a href="">Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
    <CityCard {city} on:click="{changeCurrentCity(city)}" />
    {/each}
  </section>
</main>
<style>
  nav {
    height: 24px;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
```

`src/components/CityCard.svelte`

```html
<script>
  import { createEventDispatcher } from "svelte";
  export let city;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click", { city });
  }
</script>
<aside on:click="{handleClick}">
  <h3>{city}</h3>
</aside>
<style>
  aside:hover {
    background-color: whitesmoke;
  }
</style>
```

In this lesson, we created another component to handle each city card and used the `{#each}` template command to iterate over a list of cities and display the city card. Then we added a custom event to the city card which we handled in the Favorites component. Now we need to navigate from the favorites component to the Current component.

<article><aside>

Create checkpoint

```sh
git commit -am "5-events"
git push origin 5-events
git checkout -b 6-routing
```

</aside></article>

### Take Break

---

## Routing

For routing, we are going to use pagejs a framework agnostic routing component modeled after express.

`src/App.svelte`

```html
<script>
  import router from "page";

  import Current from "./views/Current.svelte";
  import Favorites from "./views/Favorites.svelte";
  import Add from "./views/Add.svelte";

  let page;

  router("/", navTo(Current));
  router("/favorites", navTo(Favorites));

  router.start();

  function navTo(Component) {
    return (ctx) => {
      page = Component;
    };
  }
</script>
<svelte:component this="{page}" />
```

`src/views/Current.svelte`

Add link to favorites

`<a href="/favorites">Favorites</a>`

Use page to navigate to Current

```html
<script>
  import CityCard from "../components/CityCard.svelte";
  import page from "page";

  let cities = ["Charleston, SC", "New york, NY", "San Francisco, CA"];

  function changeCurrentCity(city) {
    return () => {
      // set current city...then
      page("/");
    };
  }
</script>
<nav>
  <div>Favorites</div>
  <a href="">Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
    <CityCard {city} on:click="{changeCurrentCity(city)}" />
    {/each}
  </section>
</main>
<style>
  nav {
    height: 24px;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
```

<article><aside>

Create checkpoint

```sh
git commit -am "6-routing"
git push origin 6-routing
git checkout -b 7-stores
```

</aside></article>

---

## Stores - Sharing data between components

There are several ways to pass data one way is to use svelte stores.

https://svelte.dev/docs#svelte_store

`src/store.js`

```js
import { writable } from "svelte/store";

export const store = writable({ current: "Charleston, SC" });

export const dispatch = (action) =>
  new Promise((resolve) =>
    store.update((state) => {
      resolve();
      if (action.type === "SET_CURRENT") {
        return { ...state, current: action.payload };
      }
      return state;
    })
  );
```

`src/views/Favorites.svelte`

```html
<script>
  import { dispatch } from "../store";
  import CityCard from "../components/CityCard.svelte";
  import page from "page";

  let cities = ["Charleston, SC", "New york, NY", "San Francisco, CA"];

  function changeCurrentCity(city) {
    return () => {
      // set current city...then
      dispatch({ type: "SET_CURRENT", payload: city }).then(() => page("/"));
    };
  }
</script>
<nav>
  <div>Favorites</div>
  <a href="">Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
    <CityCard {city} on:click="{changeCurrentCity(city)}" />
    {/each}
  </section>
</main>
<style>
  nav {
    height: 24px;
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
```

`src/views/Current.svelte`

```html
<script>
  import { getJSON } from "../lib/async.js";
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";
  import { store } from "../store";

  import Weather from "../components/Weather.svelte";

  let temp = 21.7;
  let unit = "c";

  $: displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;

  function getWeather() {
    const current = $store.current.toLowerCase().replace(", ", ",");
    return getJSON(`/api/weather?city=${current}&country=us`).then(
      (results) => ({
        temp: `${results.temp} &deg; C`,
        icon: results.weather.icon,
        description: results.weather.description,
        city: `${results.city_name} ${results.state_code}`,
      })
    );
  }

  function convertToF() {
    temp = celsiusToFahrenheit(temp);
    unit = "f";
  }

  function convertToC() {
    temp = fahrenheitToCelsius(temp);
    unit = "c";
  }
</script>
<nav>
  <div>
    <a href="#" on:click="{convertToF}">F</a>
    |
    <a href="#" on:click="{convertToC}">C</a>
  </div>
  <a href="/favorites">Favorites</a>
</nav>
<main>
  {@html displayTemp} {#await getWeather()} Loading... {:then weather}
  <Weather {...weather} />
  {/await}
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

<article><aside>

Create checkpoint

```sh
git commit -am "7-stores"
git push origin 7-stores
git checkout -b 8-transitions
```

</aside></article>

---

## Transitions

https://svelte.dev/docs#svelte_transition

`src/views/Current.svelte`

```html
<script>
  import { getJSON } from "../lib/async.js";
  import { fahrenheitToCelsius, celsiusToFahrenheit } from "temperature";
  import { store } from "../store";
  import { fade, blur } from "svelte/transition";

  import Weather from "../components/Weather.svelte";

  let temp = 21.7;
  let unit = "c";

  $: displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;

  function getWeather() {
    const current = $store.current.toLowerCase().replace(", ", ",");
    return getJSON(`/api/weather?city=${current}&country=us`).then(
      (results) => ({
        temp: `${results.temp} &deg; C`,
        icon: results.weather.icon,
        description: results.weather.description,
        city: `${results.city_name} ${results.state_code}`,
      })
    );
  }

  function convertToF() {
    temp = celsiusToFahrenheit(temp);
    unit = "f";
  }

  function convertToC() {
    temp = fahrenheitToCelsius(temp);
    unit = "c";
  }
</script>
<nav>
  <div>
    <a href="#" on:click="{convertToF}">F</a>
    |
    <a href="#" on:click="{convertToC}">C</a>
  </div>
  <a href="/favorites">Favorites</a>
</nav>
<main transition:fade="{{duration:" 1000}}>
  {@html displayTemp} {#await getWeather()} Loading... {:then weather}
  <Weather {...weather} />
  {/await}
</main>
<style>
  nav {
    margin-bottom: 0;
    margin-left: 8px;
    margin-right: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
```

`src/views/Favorites.svelte`

```html
<script>
  import { blur } from 'svelte/transition'
  import { dispatch } from '../store'
  import CityCard from '../components/CityCard.svelte'
  import page from 'page'

  let cities = ['Charleston, SC', 'New york, NY', 'San Francisco, CA']

  function changeCurrentCity(city) {
    return () => {
      // set current city...then
      dispatch({type: 'SET_CURRENT', payload: city})
        .then(() => page('/'))
    }
  }

</script>
<div in:blur={{delay: 1000, duration: 1000}}>
<nav>
  <div>Favorites</div>
  <a href="">Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
      <CityCard {city} on:click={changeCurrentCity(city)} />
    {/each}
  </section>
</main>
</div>
<style>
 nav {
   height: 24px;
   margin-bottom: 0;
   margin-left: 8px;
   margin-right: 8px;
 }
</style>
```

<article><aside>

Create checkpoint

```sh
git commit -am "8-transitions"
git push origin 8-transitions
git checkout -b 9-modal-actions
```

</aside></article>

---

## Modal and Actions

To handle adding a new city, lets use a modal component.

https://svelte.dev/repl/e94473c00c5c422fa736ba60a2ca0e61?version=3.26.0

```html
<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  export let open = false;
  const dispatch = createEventDispatcher();

  function handleCloseClick() {
    dispatch("close");
  }

  // action

  function modalAction(node) {
    let fns = [];
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      fns = [...fns, () => (document.body.style.overflow = original)];
    }
    return {
      destroy: () => fns.map((fn) => fn()),
    };
  }
</script>
{#if open}
<div use:modalAction on:click="{handleCloseClick}">
  <section on:click|stopPropagation>
    <aside in:scale out:scale="{{duration:" 500}}>
      <slot />
      <br />
      <button on:click|preventDefault="{handleCloseClick}">Close</button>
    </aside>
  </section>
</div>
{/if}
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
    height: 100%;
    width: 100%;
  }
</style>
```

`src/views/Add.svelte`

```html
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let city;

  function handleSubmit() {
    dispatch("add", { city });
    city = "";
  }
</script>
<main>
  <section>
    <h3>Add Location</h3>
    <form on:submit|preventDefault="{handleSubmit}">
      <div>
        <label for="city">City</label>
        <input type="text" id="city" bind:value="{city}" />
      </div>
      <!--
      <div>
        <label for="country">Country</label>
        <select id="country">
          <option>-- select --</option>
        </select>
      </div>
      -->
      <div>
        <button id="add-btn">Add</button>
        <a href="">Cancel</a>
      </div>
    </form>
  </section>
</main>
```

`src/views/Favorites.svelte`

```html
<script>
  import { blur } from 'svelte/transition'
  import { dispatch } from '../store'
  import CityCard from '../components/CityCard.svelte'
  import page from 'page'
  import Modal from '../components/Modal.svelte'
  import Add from './Add.svelte'

  let cities = ['Charleston, SC', 'New york, NY', 'San Francisco, CA']
  let open = false

  function changeCurrentCity(city) {
    return () => {
      // set current city...then
      dispatch({type: 'SET_CURRENT', payload: city})
        .then(() => page('/'))
    }
  }

  function openModal() {
    open = true
  }

  function addCity({detail}) {
    cities = [...cities, detail.city]
    open = false
  }

</script>
<div in:blur={{delay: 1000, duration: 1000}}>
<nav>
  <div>Favorites</div>
  <a href="#" on:click={openModal}>Add</a>
</nav>
<main>
  <section>
    {#each cities as city}
      <CityCard {city} on:click={changeCurrentCity(city)} />
    {/each}
  </section>
</main>
</div>
<Modal {open} on:close={_ => open = false}>
  <Add on:add={addCity} />
</Modal>
<style>
 nav {
   height: 24px;
   margin-bottom: 0;
   margin-left: 8px;
   margin-right: 8px;
 }
</style>
```

<article><aside>

Create checkpoint

```sh
git commit -am "9-modal-actions"
git push origin 9-modal-actions
git checkout -b 10-testing
```

</aside></article>

---

## Testing

## Install cypress

The first thing we need to do is install cypress and cypress-svelte-unit-test:

```sh
yarn add -D cypress cypress-svelte-unit-test
```

## Initialize Cypress

```sh
yarn run cypress open
```

Once you see the modal, you click `ok` and then close the cypress window.

<article><aside>

Cypress comes with a bunch of examples, but we don't need them for this walkthrough, you can get rid of them by running `rm -rf cypress/integration/examples`

</aside></article>

## Tell cypress to use rollup when working with svelte components

Open an index.js file in the cypress/plugins directory and edit the following function:

```js
module.exports = (on) => {
  const filePreprocessor = require("@bahmutov/cy-rollup");
  on("file:preprocessor", filePreprocessor());
};
```

This code will give cypress the information it needs to compile the svelte component

## Turn on component support for cypress

When you installed cypress, the install created a cypress.json file, in this file we need to add the following entries:

```json
{
  "experimentalComponentTesting": true,
  "componentFolder": "src",
  "testFiles": "**/*spec.js"
}
```

The first entry is a flag to enable component testing, the second is the location of the components, finally the third entry is a pattern matcher for the test files.

## Write a test

Now, we have our project configured we can write a test.

In our src folder, lets create a test for the App component.

create a new file src/views/Add.spec.js

```js
import Add from "./Add.svelte";
import { mount } from "cypress-svelte-unit-test";

it("add city using form", () => {
  mount(Add, {
    callbacks: {
      add: cy.stub().as("add"),
    },
  });
  cy.get("input#city").type("Boston, MA");
  cy.get("button#add-btn").click();
  cy.get("@add")
    .should("be.called")
    .its("firstCall.args.0.detail")
    .should("deep.equal", { city: "Boston, MA" });
});
```

`src/views/Add.svelte`

```html
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let city = "";
  let selected = "";

  function submitCity() {
    dispatch("add", { city });
    selected = city;
    city = "";
  }
</script>
<main>
  <section>
    <h3>Add Location</h3>
    {#if selected !== ''}
    <div id="selected">selected: {selected}</div>
    {/if}
    <form on:submit|preventDefault="{submitCity}">
      <div>
        <label for="city">City</label>
        <input type="text" id="city" bind:value="{city}" />
      </div>
      <!--
      <div>
        <label for="country">Country</label>
        <select id="country">
          <option>-- select --</option>
        </select>
      </div>
      -->
      <div>
        <button id="add-btn">Add</button>
        <a href="">Cancel</a>
      </div>
    </form>
  </section>
</main>
```

The it function takes a description and a callback function, in the callback function,
we use the imported mount function to mount the App component passing the name
prop. Then we use cypress contains function to find the dom element h1 and validate
if it contains the following text 'Hello World!'

## Run the Test

Now that we have our test, lets run it and see if it passes.

```
yarn run cypress run
```

This command will run cypress in the console.

If everything went as planned you should see a print out showing App.spec.js passed and all specs passed!

https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

## Feedback Form

https://forms.gle/5hV7or82nd8qGFAd8

</main>
