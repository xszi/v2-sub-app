import actions from '@/shared/actions'
import EventBus from './eventBus'

function addVisitedView(view) {
  const visitedViews = JSON.parse(sessionStorage.getItem('visitedViews')) || []
  if (visitedViews.some(v => v.fullPath === view.fullPath)) return
  const findIndex = visitedViews.findIndex(v => v.name === view.name)
  if (findIndex >= 0) {
    visitedViews.splice(findIndex, 1)
  }
  const handleView = {
    name: view.name,
    path: view.path,
    query: view.query,
    params: view.params,
    fullPath: view.fullPath,
    meta: {
      mode: 'history',
      childApp: 'v2-sub-app',
      noCache: view.meta.noCache,
      title: view.meta.title
    }
  }
  visitedViews.push(handleView)
  EventBus.$emit('setRouteCache', visitedViews)
  sessionStorage.setItem('visitedViews', JSON.stringify(visitedViews))
  actions.setGlobalState({ visitedViews })
}

function delVisitedView(view) {
  const visitedViews = JSON.parse(sessionStorage.getItem('visitedViews'))
  for (const [i, v] of visitedViews.entries()) {
    if (v.path === view.path) {
      visitedViews.splice(i, 1)
      break
    }
  }
  sessionStorage.setItem('visitedViews', JSON.stringify(visitedViews))
  actions.setGlobalState({ visitedViews })
}

function updateVisitedView({ commit }, view) {
  const visitedViews = JSON.parse(sessionStorage.getItem('visitedViews'))
  for (let v of visitedViews) {
    if (v.path === view.path) {
      v = Object.assign(v, view)
      break
    }
  }
  sessionStorage.getItem('visitedViews', visitedViews)
  actions.setGlobalState({ visitedViews })
}

export const routeCache = {
  addVisitedView,
  delVisitedView,
  updateVisitedView
}
