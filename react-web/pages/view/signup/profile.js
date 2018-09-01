import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'
import ColorButton from 'components/atoms/ColorButton'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import Rule from '/../shared/constants/Rule'

class SignupProfile extends React.Component {
  state = {
    files: [],
    accountName: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onDrop(files) {
    if (files.length > 1) {
      files = files.slice(0, 1)
    }
    this.setState({ ...this.state, files: files })
  }

  async onSubmit(e) {
    // TODO: validation
    const { accountName, files } = this.state
    const successCb = async res => {
      Router.pushRoute(`/view/home`)
    }
    this.props.dispatch(
      createAction(User.SAVE_PROFILE_REQUEST)({
        successCb,
        data: { accountName, files }
      })
    )
  }

  render() {
    const { accountName } = this.state
    const isValidated = Rule.ACCOUNTNAME_REGEX.exec(accountName)
    return (
      <CenteredContainer height={400}>
        <section className="mb-3">
          <SignInUpHeader text="プロフィール設定" />
        </section>

        <section className="text-center mb-2">
          <ProfileIconSelector
            size={90}
            files={this.state.files}
            onDrop={this.onDrop.bind(this)}
          />
        </section>

        <section>
          <div className="form-group">
            <Input
              type="text"
              placeholder="ユーザID"
              value={accountName}
              maxLength={Rule.ACCOUNTNAME_MAX_LENGTH}
              onChange={this.handleChange('accountName')}
              invalid={!isValidated}
            />
          </div>
        </section>

        <section className="regNote my-3 text-center">
          コミュニティー内のあなたの固有のIDです。
          <br />
          投稿やコメント時に「@ユーザーID」とすることで、
          <br />
          「メンション=読んでほしい人への通知」を行うことができます。
        </section>

        <section className="text-center" onClick={this.onSubmit.bind(this)}>
          <ColorButton
            className="w-75 mt-4"
            color="#2b6db2"
            disabled={!accountName.length || !isValidated}
          >
            続ける
          </ColorButton>
        </section>

        <style jsx>{`
          i {
            font-size: 70px;
            color: #2b6eb2;
          }

          .regNote,
          label {
            font-size: 12px;
          }

          .alert {
            font-size: 12px;
          }
        `}</style>
      </CenteredContainer>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(SignupProfile)
