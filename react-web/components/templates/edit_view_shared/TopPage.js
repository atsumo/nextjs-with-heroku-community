import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import findIndex from 'lodash/findIndex'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import { AppTalkRoom, AppVoice, AppNews, SiteTop } from 'constants/ActionTypes'
import FixedButton from 'components/atoms/FixedButton'
import Header from 'components/templates/container/Header'
import TalkRoomContents from 'components/templates/edit_view_shared/TalkRoomContents'
import VoiceContents from 'components/templates/edit_view_shared/VoiceContents'
import NewsContents from 'components/templates/edit_view_shared/NewsContents'
import InfiniteScroll from 'components/templates/container/InfiniteScroll'
import Classes from 'constants/Classes'
import URL from 'constants/URL'

// const styles = {
//   slideRoot: {},
//   slide: {}
// }

const Label = props => (
  <span>
    {props.text}
    <style jsx>{`
      span {
        font-size: 25px;
        font-weight: 900;
      }
    `}</style>
  </span>
)

class TopPage extends React.Component {
  constructor(props) {
    super(props)
    // decide initial tab index with URL props.slug
    let activeTabIndex = findIndex(props.boxes, box => box.slug === props.slug)
    if (activeTabIndex === -1) activeTabIndex = 0

    this.state = { tabIndex: activeTabIndex, mainHeight: null }
  }

  componentDidMount() {
    // use state to render when height is changed
    // スワイパブルViewの高さをちょうどよく
    const headerHeight = document.getElementById('ViewHomeHeader').clientHeight
    this.setState({
      ...this.state,
      mainHeight: window.screen.height - headerHeight
    })
  }

  getIndicatorStyle() {
    return {
      backgroundColor: this.props.color.backgroundColor,
      height: 4
    }
  }

  // 現在アクティブになってるタブのslugをみて、penを出すか決める
  isShowPenIcon() {
    const curSlug = this.props.boxes[this.state.tabIndex].slug
    return curSlug === URL.TALK_SLUG
  }

  // tabIndex
  handleChange = (event, tabIndex) => {
    Router.pushRoute(`${URL.VIEW_HOME}/${this.props.boxes[tabIndex].slug}`)
    this.setState({ tabIndex })
  }

  handleChangeIndex = tabIndex => {
    Router.pushRoute(`${URL.VIEW_HOME}/${this.props.boxes[tabIndex].slug}`)
    this.setState({ tabIndex })
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div id="ViewHomeHeader" className="sticky-top">
          <Header />

          <section
            className={`${Classes.EDITABLE}`}
            data-modal={`BoxesModal`}
            data-action={SiteTop.SET_BOXES}
            data-path={`${PATH_MAP.BOXES}`}
          >
            <Tabs
              className="tabs"
              value={this.state.tabIndex}
              onChange={this.handleChange}
              TabIndicatorProps={{ style: this.getIndicatorStyle() }}
              // fullWidth
              scrollable
              scrollButtons="off"
            >
              {props.boxes.map((box, i) => (
                <Tab
                  key={i}
                  label={<Label text={box.header.text} />}
                  className={`tab`}
                />
              ))}
            </Tabs>
          </section>
        </div>

        <main>
          <SwipeableViews
            enableMouseEvents
            index={this.state.tabIndex}
            onChangeIndex={this.handleChangeIndex}
            containerStyle={{ height: this.state.mainHeight }}
          >
            <InfiniteScroll action={AppTalkRoom.FETCH_REQUEST}>
              <TalkRoomContents />
            </InfiniteScroll>
            <InfiniteScroll action={AppVoice.FETCH_REQUEST}>
              <VoiceContents />
            </InfiniteScroll>
            <InfiniteScroll action={AppNews.FETCH_REQUEST}>
              <NewsContents />
            </InfiniteScroll>
            <InfiniteScroll>slide n°4</InfiniteScroll>
          </SwipeableViews>

          {this.isShowPenIcon() ? (
            <FixedButton backgroundColor={props.color.backgroundColor} />
          ) : null}
        </main>

        <style global jsx>{`
          ::-webkit-scrollbar {
            display: none;
          }

          .sticky-top {
            background-color: white;
            overflow: hidden;
          }

          .tab {
            width: 120px;
            outline: none !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

// export default withStyles(uiStyles)(TopPage)
export default connect(state => ({
  boxes: objectPath.get(state.site, `${PATH_MAP.BOXES}.item`),
  color: objectPath.get(state.site, `${PATH_MAP.COLOR}`)
}))(TopPage)
