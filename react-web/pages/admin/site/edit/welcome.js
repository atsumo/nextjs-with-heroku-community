import React from 'react'
import { connect } from 'react-redux'
import Edit from 'components/templates/Edit'
import WelcomePage from 'components/templates/edit_view_shared/WelcomePage'
import WelcomeElement from 'components/organisms/site/edit/Welcome'

class EditWelcome extends React.Component {
  render() {
    return (
      <Edit>
        <WelcomePage
          {...this.props}
          edit={true}
          welcomeElement={WelcomeElement}
        />
      </Edit>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  welcome: state.site.welcome
}))(EditWelcome)