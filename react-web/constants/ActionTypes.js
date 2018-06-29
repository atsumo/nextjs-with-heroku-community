import { createTypes, async } from './redux-action-types'

// （編集プレビュー）
export const SitePreview = createTypes('site/preview/', 'SET_DEVICE')

// （Edit, View）全ページ共通で使用するデータ
export const SiteCommon = createTypes(
  'site/common/',
  'SET_LOGO',
  'SET_NAV_ICON_COLOR',
  // 'SET_NOTIFICATION_ICON',
  // 'SET_ACCOUNT_ICON',
  'SET_MENUBAR_STYLE',
  'SET_MENUBAR_ITEM',
  'SET_FOOTER',
  'SET_BG_COLOR'
)

// （Edit, View）トップページ
export const SiteTop = createTypes(
  'site/top/',
  'SET_MAIN_BANNER',
  // 'SET_SUB_BANNER',
  'SET_BOXES'
)

// （Edit, View）Welcome
export const SiteWelcome = createTypes('site/welcome/', 'SET_WELCOME')

// （Edit, View）トークルーム
export const SiteTalkRoom = createTypes(
  'site/talkroom/',
  // 'SET_DESC',
  // 'SET_INPUT_FORM',
  'SET_CATEGORIES',
  'SET_SUB_BANNER',
  'ADD_CONTENTS',
  async('FETCH_INITIAL')
)

// （Edit, View）NEWS
export const SiteNews = createTypes(
  'site/news/',
  // 'SET_DESC',
  'SET_CATEGORIES',
  'SET_SUB_BANNER'
)

// (Edit) iframe
export const IFrame = createTypes('iframe/', 'POST_MESSAGE')

// -----
// -----
// -----

export const User = createTypes(
  'user/',
  async('FETCH'),
  async('FETCH_ADMIN'),
  'SET',
  'SET_ID'
)

export const Auth = createTypes('auth/', 'SET_IS_PREPARED', 'SET_IS_LOGGED_IN')

export const SearchForm = createTypes(
  'form',
  'SET',
  'SET_AREA_TEXT',
  'SET_GENRE_TEXT',
  'ADD_AREA_CHIP',
  'REMOVE_AREA_CHIP',
  'ADD_GENRE_CHIP',
  'REMOVE_GENRE_CHIP'
)

/**
 * 汎用ERROR用Action
 */
export const Errors = createTypes('errors', 'PUSH', 'POP')

/**
 * 汎用Loading用Action
 */
export const Loading = createTypes(
  'loading',
  'INCREMENT_REQUEST_COUNT',
  'DECREMENT_REQUEST_COUNT',
  'SUCCESS',
  'FAILED'
)

export const Example = createTypes(
  'example/',
  'FAILURE',
  'LOAD_DATA',
  'LOAD_DATA_SUCCESS'
)

/*
  types = {
    LOAD_REQUEST: 'my-app/module/LOAD_REQUEST',
    LOAD_SUCCESS: 'my-app/module/LOAD_SUCCESS',
    LOAD_FAILED: 'my-app/module/LOAD_FAILED',
    SAVE_REQUEST: 'my-app/module/SAVE_REQUEST',
    SAVE_SUCCESS: 'my-app/module/SAVE_SUCCESS',
    SAVE_FAILED: 'my-app/module/SAVE_FAILED',
    UPDATE_REQUEST: 'my-app/module/UPDATE_REQUEST',
    UPDATE_SUCCESS: 'my-app/module/UPDATE_SUCCESS',
    UPDATE_FAILED: 'my-app/module/UPDATE_FAILED',
    REMOVE_REQUEST: 'my-app/module/REMOVE_REQUEST',
    REMOVE_SUCCESS: 'my-app/module/REMOVE_SUCCESS',
    REMOVE_FAILED: 'my-app/module/REMOVE_FAILED'
  }
*/
