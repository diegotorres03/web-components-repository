import { selectAll } from '../../../global/web-tools'

/**
 *
 *
 * @export
 * @param {*} event a regular dom event
 * @param {*} transformSelector - this will be the event.detail on the next step, the rest of the event will be discarded
 * @return {*} 
 */
export function runTransforms(event, transformSelector) {

  const isBtn = event.target && event.target.tagName.toLowerCase() === 'button'
  const dataset = event && event.target && event.target.dataset ? { ...event.target.dataset } : null
  let data = isBtn ? dataset : event.detail

  if (!event) return {} // throw new Error('noting to transform')
  if (!transformSelector) return data
  const transforms = selectAll(transformSelector)
  let currentData = data
  transforms.forEach(transform =>
    currentData = transform.run(currentData))
  return currentData
}

export function runFilters(event, filterSelector) {

  if (!filterSelector) return true
  const filters = selectAll(filterSelector)
  if (filters.length === 0) return false
  let res = true
  filters.forEach(filter => res = filter.run(event) && res)
  return res
}
