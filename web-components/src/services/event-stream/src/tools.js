import { selectAll } from '../../../global/web-tools'

/**
 * 
 *
 * @export
 * @param {*} event a regular dom event
 * @param {*} transformSelector - this will be the event.detail on the next step, the rest of the event will be discarded
 * @return {*} only data part, event information is removed, this will be wraped by a data event from event-source
 */
export function runTransforms(event, transformSelector, __eventSource = {}) {

  const isBtn = event.target && event.target.tagName.toLowerCase() === 'button'
  const dataset = event && event.target && event.target.dataset ? { ...event.target.dataset } : null
  let data = isBtn ? dataset : event.detail

  
  
  if (!event) return {} // throw new Error('noting to transform')

  if (transformSelector) alert('selector')
  if (!transformSelector) return { ...data, __eventSource }
  
  console.log('on runTransforms', event, transformSelector, __eventSource)

  const fnNames = transformSelector.split(/[,]/g).map(item => item.trim())
  let currentData = { ...data, __eventSource }
  fnNames.forEach(fnName => {
    try {
      currentData = transforms[fnName](currentData)
    } catch (err) { console.warn(err) }
  })
  console.log(currentData)
  return { ...currentData, __eventSource }
}

export function runFilters(event, filterName) {
  if (!filterName) return true
  
  console.log(`filterName runFilters`, filterName, filters)
  const filterFn = filters[filterName]
  if(!filterFn) return true
  console.log(filterFn.toString())

  const res = filterFn(event)

  return res


  // const filters = selectAll(filterName)
  // if (filters.length === 0) return false
  // let res = true
  // filters.forEach(filter => res = filter.run(event) && res)
  // return res

}
