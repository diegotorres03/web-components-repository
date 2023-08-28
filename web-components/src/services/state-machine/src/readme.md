# State Machines

Web Component representation of a finite automata.

```html
<state-machine id="unique-id" initial-state="start"></state-machine>
```

`id` is an unique identifier for the state machine, this will be used for html, but this id will be passed to js.
`initial-state` is how we tell the machine where to start.



```html
```

## State
This is a 1:1 representation of a xstate state.
```html
<state-machine id="unique-id" initial-state="start">
  <machine-state id="unique-id"></machine-state>
</state-machine>
```

`action` when specified, is a non blocking function that will be executed right after the new state is entered.

## Transitions
`emit` is also called `type` is

```html
<state-machine id="unique-id" initial-state="start">
  <machine-state id="unique-id">
    <machine-transition emit="submit" target="nextState"></machine-transition>
  </machine-state>
</state-machine>
```

```

## Actions

```html
<state-machine id="unique-name" initial-state="start">
  <machine-state emit="" target="" action="log"></machine-state>
</state-machine>
```

## Guards/Filters


# Events

# components