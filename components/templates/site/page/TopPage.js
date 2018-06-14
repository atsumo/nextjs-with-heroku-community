import React from 'react'
import range from 'lodash/range'
import dynamic from 'next/dynamic'
import {
  setMenuBarStyle,
  setMenuBarItem,
  setMainBanner,
  setBoxHeader,
  setSubBanner
} from 'actions/site'

import NavBar from 'components/templates/site/container/EditableNavBar'
import MenuBar from 'components/organisms/site/edit/MenuBar'
import MainBanner from 'components/organisms/site/edit/MainBanner'
import BoxHeader from 'components/organisms/site/edit/BoxHeader'
import BoxContent from 'components/organisms/site/edit/BoxContent'
import SubBanner from 'components/organisms/site/edit/SubBanner'
import Footer from 'components/organisms/site/edit/Footer'

import { convertToRaw } from 'draft-js'

const initialState = {}
// let NavBar, MenuBar, MainBanner, BoxHeader, BoxContent, SubBanner, Footer

export default class TopPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // NOTE: dynamic import should be done before render(), not render() or constructor()
  // dynamicImport() {
  //   if (this.props.edit) {
  //     NavBar = dynamic(import('components/organisms/site/edit/NavBar'))
  //     MenuBar = dynamic(import('components/organisms/site/edit/MenuBar'))
  //     MainBanner = dynamic(import('components/organisms/site/edit/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/edit/BoxHeader'))
  //     BoxContent = dynamic(import('components/organisms/site/edit/BoxContent'))
  //     SubBanner = dynamic(import('components/organisms/site/edit/SubBanner'))
  //     Footer = dynamic(import('components/organisms/site/edit/Footer'))
  //   } else {
  //     NavBar = dynamic(import('components/organisms/site/base/NavBar'))
  //     MenuBar = dynamic(import('components/organisms/site/base/MenuBar'))
  //     MainBanner = dynamic(import('components/organisms/site/base/MainBanner'))
  //     BoxHeader = dynamic(import('components/organisms/site/base/BoxHeader'))
  //     BoxContent = dynamic(import('components/organisms/site/base/BoxContent'))
  //     SubBanner = dynamic(import('components/organisms/site/base/SubBanner'))
  //     Footer = dynamic(import('components/organisms/site/base/Footer'))
  //   }
  // }

  componentWillMount() {
    // this.dynamicImport()
  }

  createBoxContents() {
    return (
      <div className="container mt-2 mb-5">
        <div className="row justify-content-center px-3">
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
          <BoxContent className="col-xs-12 col-sm-6 col-md-3 p-1" />
        </div>
      </div>
    )
  }

  createSubBanners() {
    return (
      <div className="container">
        <div className="row justify-content-center px-3">
          {range(this.props.top.subBanner.item.length).map(i => (
            <SubBanner
              key={i}
              className="col-6 py-3"
              src={this.props.top.subBanner.item[i].src}
              onClickModalImage={src => this.onClickSBModalImage(src, i)}
            />
          ))}
        </div>
      </div>
    )
  }

  /**
   * Edit Handler START
   */
  onSaveMenuBar(state) {
    this.props.dispatch(setMenuBarStyle(state.style))
    this.props.dispatch(setMenuBarItem(state.item))
  }

  // Main Banner
  onClickMBModalImage(src, index) {
    this.props.dispatch(setMainBanner({ src, index }))
  }

  onChangeBoxHeaderText(json, index) {
    console.log('text changed', json, index)
    this.props.dispatch(setBoxHeader({ contentState: json, index }))
  }

  onClickBoxHeaderImage(src, index) {
    console.log('image changed', src)
    this.props.dispatch(setBoxHeader({ src, index }))
  }

  // Sub Banner
  onClickSBModalImage(src, index) {
    this.props.dispatch(setSubBanner({ src, index }))
  }
  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    return (
      <div className={`${props.className}`} style={props.style}>
        <header>
          <NavBar />
          <MenuBar
            onSave={this.onSaveMenuBar.bind(this)}
            style={props.common.menuBar.style}
            item={props.common.menuBar.item}
          />

          {range(props.top.mainBanner.item.length).map(i => (
            <MainBanner
              key={i}
              className="mb-5"
              src={props.top.mainBanner.item[i].src}
              onClickModalImage={src => this.onClickMBModalImage(src, i)}
            />
          ))}
        </header>

        <main className="">
          <div className="box">
            {range(props.top.boxes.length).map(i => (
              <React.Fragment key={i}>
                <BoxHeader
                  key={i}
                  defaultText={props.top.boxes[i].header.defaultText}
                  contentState={props.top.boxes[i].header.contentState}
                  onChangeText={e => this.onChangeBoxHeaderText(e, i)}
                  onClickModalImage={src => this.onClickBoxHeaderImage(src, i)}
                />
                {this.createBoxContents()}
              </React.Fragment>
            ))}
          </div>

          <div className="subBanner mt-5 mb-5">{this.createSubBanners()}</div>
        </main>

        <footer className="">
          <Footer />
        </footer>
      </div>
    )
  }
}