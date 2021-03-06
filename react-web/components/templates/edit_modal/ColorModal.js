import React from 'react'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import ColorPicker from 'components/molecules/ColorPicker'

// 前景色、編集するモーダル
class IconModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: props.color
      // backgroundColor: props.style.backgroundColor
    }
  }

  onChangeColor(code) {
    this.setState(
      update(this.state, {
        color: { $set: code }
      })
    )
  }

  // onChangeBGColor(code) {
  //   this.setState(
  //     update(this.state, {
  //       backgroundColor: { $set: code }
  //     })
  //   )
  // }

  render() {
    return (
      <React.Fragment>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">カラー変更</label>
            <div className="col-10">
              <ColorPicker
                onClick={this.onChangeColor.bind(this)}
                color={this.props.color}
              />
            </div>
          </div>

          {/* <div className="form-group row">
            <label className="col-2 col-form-label">背景色変更</label>
            <div className="col-10">
              <ColorPicker
                onClick={this.onChangeBGColor.bind(this)}
                color={this.props.style.backgroundColor}
              />
            </div>
          </div> */}
        </ModalBody>
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(IconModal)
