import { getBrowserCache, setBrowserCache } from '@/utils/util'
import actions from '@/shared/actions'
import EventBus from './eventBus'
function addView(view) {
  addVisitedView(view)
  addCachedView(view)
}

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

function delView(view) {
  delVisitedView(view)
  delCachedView(view)
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

function delCachedView(view) {
  const cachedViews = JSON.parse(getBrowserCache('cachedViews'))
  const index = cachedViews.indexOf(view.name)
  index > -1 && cachedViews.splice(index, 1)
  setBrowserCache('cachedViews', JSON.stringify(cachedViews))
  actions.setGlobalState({ cachedViews })
}

function delOthersViews(view) {
  delOthersVisitedViews(view)
  delOthersCachedViews(view)
}

function delOthersVisitedViews(view) {
  let visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  visitedViews = visitedViews.filter(v => {
    return v.meta.affix || v.path === view.path
  })
  setBrowserCache('visitedViews', visitedViews)
  actions.setGlobalState({ visitedViews })
}

function delOthersCachedViews(view) {
  let cachedViews = JSON.parse(getBrowserCache('cachedViews'))
  const index = cachedViews.indexOf(view.name)
  if (index > -1) {
    cachedViews = cachedViews.slice(index, index + 1)
  } else {
    // if index = -1, there is no cached tags
    cachedViews = []
  }
  setBrowserCache('cachedViews', cachedViews)
  actions.setGlobalState({ cachedViews })
}

function delAllVisitedViews(view) {
  let visitedViews = JSON.parse(getBrowserCache('visitedViews'))
  const affixTags = visitedViews.filter(tag => tag.meta.affix)
  visitedViews = affixTags
  setBrowserCache('visitedViews', visitedViews)
  actions.setGlobalState({ visitedViews })
}

function delAllCachedViews(view) {
  setBrowserCache('cachedViews', [])
  actions.setGlobalState({ visitedViews: [] })
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
  addView,
  addVisitedView,
  addCachedView,
  delView,
  delVisitedView,
  delCachedView,
  delOthersViews,
  delOthersVisitedViews,
  delOthersCachedViews,
  delAllVisitedViews,
  delAllCachedViews,
  updateVisitedView
}
