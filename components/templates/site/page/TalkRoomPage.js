import { connect } from 'react-redux'
import TalkBox from 'components/templates/site/page/TalkBox'
import {
  setTalkRoomCategories,
  setTalkRoomDesc,
  setTalkRoomInputForm
} from 'actions/site'

class TalkRoomPage extends TalkBox {
  /**
   * Edit Handler START
   */
  onSaveDesc(state) {
    if (state.text.length === 0) return
    this.props.dispatch(setTalkRoomDesc({ ...state }))
  }

  onSaveInputForm(state) {
    if (state.text.length === 0) return
    this.props.dispatch(setTalkRoomInputForm({ ...state }))
  }

  onSaveCategory(state) {
    this.props.dispatch(setTalkRoomCategories({ ...state }))
  }
  /**
   * Edit Handler END
   */
}

export default connect(state => ({
  common: state.site.common,

  // TALK BOX由来のページでは共通して使う。
  boxHeader: state.site.top.boxes[0].header,
  pageData: state.site.talkroom
}))(TalkRoomPage)
