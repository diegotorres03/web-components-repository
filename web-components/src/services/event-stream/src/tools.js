import { selectAll } from '../../../global/web-tools'

export function runTransforms(event, transformSelector) {

  if (!transformSelector) return event
  const transforms = selectAll(transformSelector)
  let currentData = event.detail
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
