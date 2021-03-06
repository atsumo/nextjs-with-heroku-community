import React from 'react'
import { Link } from 'routes'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import Navbar from 'reactstrap/lib/Navbar'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import Avatar from 'components/atoms/Avatar'
import NotificationIcon from 'components/atoms/NotificationIcon'
import SettingsIcon from 'components/atoms/SettingsIcon'
import Classes from 'constants/Classes'
import { SiteCommon } from 'constants/ActionTypes'

const brandStyle = {
  position: 'relative',
  maxWidth: 140,
  width: '63%'
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuIsOpen: false }
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Navbar
          className={`row ${props.className || ''}`}
          style={{
            padding: '0.6rem 0.8rem 0.5rem',
            borderBottom: '1px solid gray',
            ...props.style
          }}
        >
          <div className="leftContainer col-7 pr-1">
            <Link route={'/view/mypage'} passHref>
              <a>
                <Avatar src={props.user.iconPath} className="" />
              </a>
            </Link>
            <div className="d-inline-block ml-3 mr-0" style={brandStyle}>
              <div className="">
                <CommunityLogo
                  src={props.logo.src}
                  propsPath={`${PATH_MAP.LOGO}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`icons text-center col-4 px-1 ${Classes.EDITABLE}`}
            data-modal={`ColorModal`}
            data-action={SiteCommon.SET_NAV_ICON_COLOR}
            data-path={`${PATH_MAP.NAV_ICON}`}
          >
            <i className="fas fa-search mr-3 navIcon" />

            <div className="d-inline-block position-relative">
              <Link route={'/view/notification'} passHref>
                <a>
                  <NotificationIcon
                    className="mr-3 navIcon"
                    color={props.navIcon.color}
                  />
                </a>
              </Link>
              {props.notReadCount > 0 && (
                <span className="badge badge-danger">{props.notReadCount}</span>
              )}
            </div>

            <Link route={'/view/settings'} passHref>
              <a>
                <SettingsIcon className="navIcon" color={props.navIcon.color} />
              </a>
            </Link>
          </div>
        </Navbar>

        <style jsx>{`
          .leftContainer {
            display: inline-block;
          }

          .icons {
            font-size: 20px;
            color: black;
          }

          .badge {
            position: absolute;
            top: 0;
            right: 7px;
            font-size: 10px;
          }

          .navIcon {
            color: ${props.navIcon.color};
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // デザイン
  logo: objectPath.get(state.site, `${PATH_MAP.LOGO}`),
  navIcon: objectPath.get(state.site, `${PATH_MAP.NAV_ICON}`),
  // ユーザ
  user: state.user,
  // 未読アイコン
  notReadCount: state.app.notification.notReadCount
}))(NavBar)
