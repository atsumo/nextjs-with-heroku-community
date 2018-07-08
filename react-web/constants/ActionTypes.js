import { createTypes, async } from './redux-action-types'

// -----
// -- SITE: BrandごとにEditできるレイアウト情報 --
// -----
export const SitePreview = createTypes('site/preview/', 'SET_DEVICE')

// （Edit, View）全ページ共通で使用するデータ
export const SiteCommon = createTypes(
  'site/common/',
  'SET_LOGO',
  'SET_NAV_ICON_COLOR',
  'SET_BG_COLOR'
)

export const SiteTop = createTypes('site/top/', 'SET_MAIN_BANNER', 'SET_BOXES')

export const SiteWelcome = createTypes('site/welcome/', 'SET_WELCOME')

export const SiteTalkRoom = createTypes(
  'site/talkroom/',
  'SET_CATEGORIES',
  'SET_SUB_BANNER',
  async('FETCH')
)

export const SiteNews = createTypes(
  'site/news/',
  'SET_CATEGORIES',
  'SET_SUB_BANNER'
)

// (Edit) iframe
export const IFrame = createTypes('iframe/', 'POST_MESSAGE')

// -----
// -- APP: ユーザViewで詰めるデータ --
// -----
// ページングにも使う
export const AppTalkRoom = createTypes(
  'app/talkroom/',
  'ADD_CONTENTS',
  async('FETCH')
)

export const AppVoice = createTypes(
  'app/voice/',
  'ADD_CONTENTS',
  async('FETCH')
)

export const AppNews = createTypes('app/news/', 'ADD_CONTENTS', async('FETCH'))

export const AppMypage = createTypes(
  'app/mypage/',
  'ADD_CONTENTS',
  async('FETCH')
)

// POST詳細画面
export const AppPost = createTypes(
  'app/post/',
  'SET_POST',
  'SET_COMMENTS',
  'PUSH_COMMENTS',
  // 新規投稿
  async('SAVE'),
  // 新規コメント
  async('SAVE_COMMENT'),
  // 下書き or 編集時のデータ取得
  async('FETCH'),
  // コメント取得
  async('FETCH_COMMENTS')
)

// -----
// -- APP_ADMIN: AdminViewで詰めるデータ --
// -----

// post/add （UserViewとは扱う情報が微妙に違うかもなので分ける）
export const AppAdminPost = createTypes(
  'app/admin/post/',
  // 新規投稿
  async('SAVE'),
  // 下書き or 編集時のデータ取得
  async('FETCH'),
  'SET',
  // 一覧表示用
  async('FETCH_LIST'),
  'SET_LIST',
  'PUSH_LIST'
)

// -----
// -- USER: ユーザ情報 --
// -----
export const User = createTypes(
  'user/',
  'AUTHENTICATE',
  'DEAUTHENTICATE',
  // user signup, signin
  async('SIGNUP'),
  async('SIGNIN'),
  async('SAVE_PROFILE'),
  // admin signup
  async('AUTH_ADMIN'),
  // fetch basic info (id, nickname)
  async('FETCH'),
  'SET'
)

/**
 * 汎用SuccessR用Action
 */
export const AppSuccesses = createTypes('successes/', 'PUSH', 'POP')

/**
 * 汎用ERROR用Action
 */
export const AppErrors = createTypes('errors/', 'PUSH', 'POP')

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
