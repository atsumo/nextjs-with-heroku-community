import React from 'react'
import ImageUploadButton from 'components/atoms/ImageUploadButton'
import {
  MultipleToggleGroup,
  MultipleToggle
} from 'components/atoms/MultipleToggle'
import { createExistingImages } from 'components/molecules/site/edit/ImageShower'

const STATE = {
  EXISTING: 0,
  COMMUNE_LIB: 1
}

// ロゴやバナーなどリンクできる画像を編集するモーダル
export default class DesignImageEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { linkState: STATE.EXISTING }
  }

  addSelectedIfMatch(state) {
    return state === this.state.linkState
  }

  render() {
    return (
      <React.Fragment>
        <label className="col-sm-2 col-form-label">デザイン編集</label>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-6">
              <ImageUploadButton className="mb-3" />
            </div>
            <div className="ml-auto mr-5">
              <MultipleToggleGroup>
                <MultipleToggle
                  selected={this.addSelectedIfMatch(STATE.EXISTING)}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      linkState: STATE.EXISTING
                    })
                  }
                  text="既存画像"
                />
                <MultipleToggle
                  selected={this.addSelectedIfMatch(STATE.COMMUNE_LIB)}
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      linkState: STATE.COMMUNE_LIB
                    })
                  }
                  text="ライブラリ"
                />
              </MultipleToggleGroup>
            </div>
          </div>
          {createExistingImages()}
        </div>
      </React.Fragment>
    )
  }
}
