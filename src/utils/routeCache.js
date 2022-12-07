import { getBrowserCache, setBrowserCache } from '@/utils/util'
import actions from '@/shared/actions'
import EventBus from './eventBus'

function addVisitedView(view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
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
    childApp: view.childApp ? view.childApp : 'v2-sub-app',
    title: view.meta.title,
    noCache: view.meta.noCache
  }
  visitedViews.push(handleView)
  EventBus.$emit('setRouteCache', visitedViews)
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
  actions.setGlobalState({ visitedViews })
}

function addCachedView(view) {
  const cachedViews = JSON.parse(getBrowserCache('cachedViews'))
  if (cachedViews.includes(view.name)) return
  if (!view.meta.noCache) {
    cachedViews.push(view.name)
  }
  setBrowserCache('cachedViews', JSON.stringify(cachedViews))
  actions.setGlobalState({ cachedViews })
}

function delVisitedView(view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  for (const [i, v] of visitedViews.entries()) {
    if (v.path === view.path) {
      visitedViews.splice(i, 1)
      break
    }
  }
  setBrowserCache('visitedViews', JSON.stringify(visitedViews))
  actions.setGlobalState({ visitedViews })
}

function updateVisitedView({ commit }, view) {
  const visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  for (let v of visitedViews) {
    if (v.path === view.path) {
      v = Object.assign(v, view)
      break
    }
  }
  setBrowserCache('visitedViews', visitedViews)
  actions.setGlobalState({ visitedViews })
}

export const routeCache = {
  addVisitedView,
  addCachedView,
  delVisitedView,
  updateVisitedView
}
