# data elements
This set of tags where designed to deal with data and state.


## DataPointComponent
Al the starting point we will find `data-point` tags, this will represent a single data entry.
use `data-` attributes to store the values, tag attributes will be used by the component.

```html
<data-point id="item-id" data-key1="value1" data-key2="value2" />
```

### Events
- **added**: when a new `data-point` is created, the `added` event will be emited and it will bubble up.
- **updated**: when this `data-point` values are changed.
- **removed**: when the `data-point` is removed from the set.

## DataSetComponent
A `data-set` tag, will group and manage `data-point` tags.

## methods
### addDataPoint
```js

  /**
   * append a <data-point> tag, it will take values from event.detail 
   * or dataset.
   * 
   * if event.type is other than'syncItem', an `updated` event will be triggered with the latest
   * data-point created
   *
   * @emits updated
   * @param {*} event
   * @memberof DataSetComponent
   */
  addDataPoint(event) {}
```

## events
`data-set` emits:
- **updated**: when [addDataPoint](#addDataPoint) is called and the event type is not syncItem.
- **sync**: when initializated, is a request for a parent `data-store`, if present, to sync.


## example
in this example, every time we click, we are telling the data-set to add a new `data-point` and emit the `updated` event
```html
<button id="source-btn" data-value="1">1</button>

<data-set trigger="#source-btn"></data-set>
```

## DataStoreComponent
The `data-store` element will be used to persis data on local IndexedDB.
This tag can interact with child `data-set` tags to automatically persist their data, and on reload, it will recover this data to the `data-set`. It will also add all the events it gets trough the `trigger` and `trigger-event` attributes.
