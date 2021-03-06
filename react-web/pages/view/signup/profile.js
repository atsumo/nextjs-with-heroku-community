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

class SignupProfile extends React.Component {
  state = {
    files: [],
    nickname: ''
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
    const { nickname, files } = this.state
    const successCb = async res => {
      Router.pushRoute(`/view/home`)
    }
    this.props.dispatch(
      createAction(User.SAVE_PROFILE_REQUEST)({
        successCb,
        data: { nickname, files }
      })
    )
  }

  render() {
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
              placeholder="ユーザ名"
              value={this.state.nickname}
              onChange={this.handleChange('nickname')}
            />
          </div>
        </section>

        <section className="regNote my-3 text-center">
          名字や名前、ニックネームなど、<br />
          コミュニティ内で呼ばれたいユーザ名にしましょう。<br />
          * 後でいつでも変更可能です
        </section>

        <section className="text-center" onClick={this.onSubmit.bind(this)}>
          <ColorButton
            className="w-75 mt-4"
            color="#2b6db2"
            disabled={!this.state.nickname.length}
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
