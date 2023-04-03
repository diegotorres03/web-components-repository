```html
 <button id="open-counter-modal">open</button>
  <app-modal id="counter-modal" trigger="#open-counter-modal">
    <section slot="main">
      <input type="hidden" value="random-id-1234">
      <label for="">Name</label><input type="text" name="name" id=""><br>
      <label for="">initial count</label><input type="text" name="count" id=""><br>
    </section>
  </app-modal>



  <ui-dataset-sync trigger="#counter-modal" event="accepted">
    <button id="test-btn" data-id="123" data-name="test-btn" data-count="99">click me</button>
  </ui-dataset-sync>

  <event-source id="btn-count-activated" trigger="#counter-modal" event="accepted" />

  <data-store id="click-counter">
    <data-set id="count-btn-dataset" visible pretty trigger="#btn-count-activated" event="data"></data-set>
    <data-set append id="count-btn-dataset-log" trigger="#btn-count-activated" event="data"></data-set>
  </data-store>

  <ui-data-sync trigger="#count-btn-dataset" event="updated">
    <plain-card id="" trigger="event-source" event="data" data-point-id="random-id">
      <section slot="main">
        <p>hello <span data-key="name">user</span>,
          <input type="text" name="name">
          you have clicked <b data-key="count">0</b>times
        </p>
        <a href="" data-key="url" data-attribute="href">a link</a>
        <hr>
        <p>for a grand total of ({count}) esto es TODO</p>
      </section>
    </plain-card>
  </ui-data-sync>

```