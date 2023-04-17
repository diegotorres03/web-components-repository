
## Section 2.4: Event components

### Activity 2.4.1: Basic event handling
Here we want to discover different ways we can listen and group events. So far we have done direct connections between an event emitter (like a button) and an event listener (like a modal using the `trigger` attribute).

This is a good approach on simple cases, but sometimes we want the same modal to react to multiple event emitters.
Let's see some __examples__:

**let's start with the basic**

In this example, we have one `button` and `app-modal`. As a trigger we are passing the id of the button (note the `#`) an the event will be `click`.
```html
  <button id="btn" >click me</button>

  <app-modal trigger="#btn" on="click" ></app-modal>
```

**Now, let's say we need to listen to 2 buttons**

Not an issue! `trigger` accepts any valid CSS selector, so we can do something like this:
```html
  <button id="btn-1" data-modal >click me</button>
  <button id="btn-2" data-modal >or click me</button>

  <app-modal trigger="[data-modal]" on="click" ></app-modal>
```
Here we added a `data-modal` attribute and passed `[data-modal]` as the trigger. By doing this, `app-modal` will listen to any element that has `data-modal` and emits a click event.

**Well! what if the other element emits a different event**

Let's look at this scenario. We currently have a `data-set` and a `data-query`. The issue here is that we want to listen to the `data` event on the `data-set` and `get` event on `data-query`.
```html
...
<plain-card>
  ...
  <!-- this component should listen to... -->
  <ui-data-sync trigger="#current-level" on="updated">
    ...
...
<!-- this data set and .... -->
<data-set id="current-level" trigger="#game-board" on="levelup">
  <!-- this data query. And both emit different events -->
  <data-query id="get-current-level" type="get"></data-query>
</data-set>
...
```


Introducing `event-source` and `event-group`! 🥳.


With `event-source` we can listen to a trigger and it will emit a new `data` event. In other words, it is acting as the man in the middle in order to decouple the consumers from the producers of events.  


Let's review the initial example with an `event-source`.


Step 1, add an `event-source` tag just above the `session-store` data store. Its trigger will be the `current-level` data set:
```html
...

<!-- add event source and set the trigger to data-set -->
<event-source id="level-updated" trigger="#current-level" on="updated"></event-source>

...
```

Then lets update the `trigger` and `on` attributes on the `ui-data-sync` so it listen to `data` events from the `event-sourve` we just created:
```html
<plain-card>
  ...
  <!-- updating trigger and on attributes  -->
  <ui-data-sync trigger="#level-updated" on="data">
    ...
...
```

Now is just a matter of testing in the browser. Test also the functionallity, if you win a match you sould see the updated score.
If we inspect the html, we should see the `event-source`
![event-source tag on html](./assets/event-source-1.png)

Let's do the same for the `data-query`: 
```html
...
<plain-card>
  ...
  <!-- update trigger and event to newly created event-source for the get query -->
  <ui-data-sync trigger="#query-level" on="data">
    ...
...
<!-- add this new event-source and use the query as trigger -->
<event-source id="query-level" trigger="#get-current-level" on="get"></event-source>
<event-source id="level-updated" trigger="#current-level" on="updated"></event-source>

<data-store id="session-store">

<data-set id="current-level" trigger="#game-board" on="levelup">
  <data-query id="get-current-level" type="get"></data-query>
...
```

In this case, our score won't be updated when we clear a level, because we are no longer listening to the `memory-flip-board`. Instead we are waiting on the `data-query` to react to an event. 
Ideally, we want this query to execute when the page loads, so we can get the data saved by `data-store` on [IndexedDB](). Luckly for us, `event-source` tags can react to a `load` even on `window`.

Lets implement this change:
```html
...
<!-- add this new event-source and use the query as trigger -->
<event-source id="on-load" trigger="window" on="load"></event-source>
...
```
```html
...
...
<!-- set the new event source #on-load as trigger -->
<data-query id="get-current-level" type="get" trigger="#on-load" on="data"></data-query>
...
```
```html
...
<!-- set the new event source #on-load as trigger -->
<data-query id="list-game-logs" type="list" trigger="#on-load" on="data"></data-query>
...
```

To test this, lets refresh the browser play a couple of levels and then refresh again.
You should see the highest level achieve there.
![updated ui screenshot](./assets/event-source-2.png)



### Activity 2.4.2: working with multiple event flows

As we learned in the previous activity, the `event-source` tag acts as a mediator. It listens to events from a source and then immediately emits a data event with the values passed from the previous event.

If you need to group multiple events and capture them, you can use the `event-group`. This element automatically subscribes to all children event sources and emits a `data` event for each event received from the `event-source`.

Let use it to group the `data-query` and the `data-set` to always refresh the score
```html
...
<event-group id="level-group">
  <event-source id="query-level" trigger="#get-current-level" on="get"></event-source>
  <event-source id="level-updated" trigger="#current-level" on="updated"></event-source>
</event-group>
...
```

and lets update the `plain-card` for current score and we should be able to see changes while we play and also that change should still be there if we refresh:
```html
...
<plain-card>
  ..
    <!-- update trigger to new event-group id -->
    <ui-data-sync trigger="#level-group"  on="data">
...
```

**Note:** _if you need to delete items on IndexedDB, on devtools, go to storage then IndexedDB then look for the item you want to delete, right click, then delete_
![delete item from idexeddb](./assets/indexeddb-4.png)

That was easy, right!
Lets do it again, this time, lets keep the game log up to date with each score emmited by the `memory-flip-board`.

First, locate the `data-store` with id=`logs-store`. Here we will see the `data-set` and `data-query`. We want both events to activate the `ui-data-repeat` on the leaderboard page. And we also want the query to be executed on page load.

To achieve this, we will require an `event-source` tag for the `data-query` and one for the `data-set` and we want both of them inside an `event-group` so we can capture its value:
```html
...
<!-- create event-group with event-source for data-set and data-query -->
<event-group id="all-game-logs">
  <event-source trigger="#list-game-logs" on="list" ></event-source>
  <event-source trigger="#game-log" on="updated" ></event-source>
</event-group>
...
```

Then, on the `leaderboard` route, lets go to the `ui-data-repeat` and change the trigger to the `event-group`:
```html
...
<ui-data-repeat id="game-log-cards" trigger="#all-game-logs" on="data">
...
```

Now you can play all you want and you will see how many matches have you played on that browser.



### Activity 2.4.3: event-source filter and transforms
TODO transform and filter part
