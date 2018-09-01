import React from 'react'
import { connect } from 'react-redux'
import { Router, Link } from 'routes'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import * as EmailValidator from 'email-validator'
import Role from '/../shared/constants/Role'
import Rule from '/../shared/constants/Rule'
import ColorButton from 'components/atoms/ColorButton'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

const EMAIL_FEEDBACK = '正しいメールアドレスを入力してください。'

class SignupEmail extends React.Component {
  static async getInitialProps({ ctx }) {
    const { code, userId } = ctx.query

    // codeをもとにemail情報を取得
    const { dispatch } = ctx.store
    dispatch(createAction(User.FETCH_CODE_INFO_REQUEST)({ code }))

    return {
      // 招待コード
      code,
      // 他社と連携する際に他社側で使用中のユーザID
      partnerUserId: userId
    }
  }

  state = {
    email: this.props.email || '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  async signup(e) {
    const { code, roleId, partnerUserId } = this.props
    const { email, password } = this.state
    const successCb = res => {
      // 管理者アカウント or 一般ユーザで遷移先を変える
      const to =
        roleId >= Role.User.ADMIN_GUEST
          ? `/admin/settings/account/edit`
          : `/view/signup/profile`
      Router.pushRoute(to)
    }
    this.props.dispatch(
      createAction(User.SIGNUP_REQUEST)({
        email,
        password,
        code,
        partnerUserId,
        successCb
      })
    )
  }

  render() {
    const { email, password } = this.state
    const emailLength = email.length
    const passLength = password.length
    const emailInvalid = emailLength > 0 && !EmailValidator.validate(email)
    const passInvalid = passLength > 0 && passLength < Rule.PASS_MIN_LENGTH

    return (
      <CenteredContainer height={450}>
        <section>
          <SignInUpHeader text="ログイン" />
        </section>

        <section className="mt-5">
          <div className="form-group">
            <label>メールアドレス</label>
            <Input
              type="email"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={this.handleChange('email')}
              invalid={emailInvalid}
            />
            <FormFeedback>{EMAIL_FEEDBACK}</FormFeedback>
            <div className="regNote text-muted ml-2">
              ※後でいつでも変更可能です。
            </div>
          </div>

          <div className="mt-4 form-group">
            <label>パスワード（半角英数字で8 ~ 40文字）</label>
            <Input
              type="text"
              placeholder={`パスワードを入力`}
              value={password}
              onChange={this.handleChange('password')}
              invalid={passInvalid}
            />
            <FormFeedback>
              {Rule.PASS_MIN_LENGTH}文字以上入力してください
            </FormFeedback>
          </div>
        </section>

        <section className="mt-5 text-center" onClick={this.signup.bind(this)}>
          <ColorButton
            className="w-75"
            color="#2b6db2"
            disabled={
              !emailLength || !passLength || emailInvalid || passInvalid
            }
          >
            ログインする
          </ColorButton>
        </section>

        <section className="regNote mt-3 text-center">
          上のログインボタンを押すことにより、<br />
          <Link route={`/view/settings/membership_agreement`}>
            <a>利用規約</a>
          </Link>
          および
          <Link route={`/view/settings/privacy_policy`}>
            <a>Cookieの使用</a>
          </Link>
          を含む
          <Link route={`/view/settings/privacy_policy`}>
            <a>プライバシーポリシー</a>
          </Link>
          に<br />
          同意したことになります。
        </section>

        {/* <section className="login mt-4 text-center">
          <Link route={`/view/signin?code=${code}`}>
            <a>アカウントをお持ちの方はログインへ</a>
          </Link>
        </section> */}

        <style jsx>{`
          .regNote,
          label,
          .alert {
            font-size: 12px;
          }

          // .login a {
          //   font-size: 12px;
          //   color: #909090;
          //   text-decoration: underline;
          // }
        `}</style>
      </CenteredContainer>
    )
  }
}

export default connect(state => ({
  email: state.user.email,
  roleId: state.user.roleId
}))(SignupEmail)
