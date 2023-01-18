[AppSync Immersion Day Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/67662c95-2007-4281-ae51-5313cd7caa67/en-US/)

---

## VTL for invoking:
```vtl
#**
    The value of 'payload' after the template has been evaluated
    will be passed as the event to AWS Lambda.
*#
{
    "operation": "Invoke",
    "payload": $util.toJson($context.arguments)
}
```


## VTL for mapping results back:
```vtl
## Raise a GraphQL field error in case of a datasource invocation error
#if($ctx.error)
  $util.error($ctx.error.message, $ctx.error.type)
#end

$util.toJson($context.result)
```