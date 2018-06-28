import { createAction } from 'redux-actions'
import { SitePreview, SiteWelcome, SiteNews } from 'constants/ActionTypes'

// preview
export let setDevice = createAction(SitePreview.SET_DEVICE, e => e)

// common
// export let setMenuBarStyle = createAction(SiteCommon.SET_MENUBAR_STYLE, e => e)
// export let setMenuBarItem = createAction(SiteCommon.SET_MENUBAR_ITEM, e => e)
// export let setFooter = createAction(SiteCommon.SET_FOOTER, e => e)

// top
// export let setMainBanner = createAction(SiteTop.SET_MAIN_BANNER, e => e)
// export let setBoxHeader = createAction(SiteTop.SET_BOX_HEADER, e => e)
// export let setSubBanner = createAction(SiteTop.SET_SUB_BANNER, e => e)

// welcome
export let setWelcome = createAction(SiteWelcome.SET_WELCOME, e => e)

// talk room

// news
// export let setNewsDesc = createAction(SiteNews.SET_DESC, e => e)
// export let setNewsCategories = createAction(SiteNews.SET_CATEGORIES, e => e)

/**
 *  ASYNC ACTIONS
 */
// export let loadData = createAction(Example.LOAD_DATA)
