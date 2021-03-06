import React from 'react'
import { Router, Link } from '/routes'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Select from 'react-select'
import omit from 'lodash/omit'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import PostDropzone from 'components/molecules/PostDropzone'
import { AppPost } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'
import URL from 'constants/URL'

const inputStyles = {
  input: {
    padding: '10px'
  }
}

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'gray',
    borderRadius: 0,
    margin: '0 auto',
    fontSize: 12
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'white'
  })
}

class Editpost extends React.Component {
  state = {
    title: '',
    body: '',
    category: this.createCatOptions()[0],
    files: []
  }

  createCatOptions() {
    const cats = this.props.talkCategories.filter(e => e.text)
    if (!cats) return []
    return cats.map(cat => {
      return { value: cat.categoryIndex, label: cat.text }
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit() {
    let data = this.state
    data = { ...data, categoryIndex: this.state.category.value }
    // category objectは不要なので省く
    data = omit(data, 'category')

    const successCb = async res => {
      Router.pushRoute(`/view/home`)
    }
    this.props.dispatch(
      createAction(AppPost.SAVE_REQUEST)({
        successCb,
        // 現状はユーザが投稿可能なのはTALKのみ。
        boxType: BoxType.index.talk,
        ...data
      })
    )
  }

  render() {
    const state = this.state
    const props = this.props
    const { classes } = props

    return (
      <React.Fragment>
        <header>
          <nav className="navbar justify-content-between">
            <Link route={URL.VIEW_HOME}>
              <span style={{ color: 'black' }}>キャンセル</span>
            </Link>
            <div className="">
              <button
                className="btn btn-link my-2 my-sm-0"
                type="submit"
                onClick={this.onSubmit.bind(this)}
              >
                投稿する
              </button>
            </div>
          </nav>
        </header>

        <Select
          instanceId={'SSR-GOGO001'}
          value={this.state.category}
          onChange={o => {
            this.setState({ ...this.state, category: o })
          }}
          styles={colourStyles}
          options={this.createCatOptions()}
          isSearchable={false}
        />

        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="タイトル"
            value={this.state.title}
            onChange={this.handleChange('title')}
            fullWidth
          />
        </section>

        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="本文"
            value={this.state.body}
            onChange={this.handleChange('body')}
            rows={5}
            rowsMax={50}
            fullWidth
            multiline
          />
        </section>

        <section>
          <PostDropzone
            files={state.files}
            onChange={files => this.setState({ ...this.state, files })}
          />
        </section>
      </React.Fragment>
    )
  }
}

const Styled = withStyles(inputStyles)(Editpost)
export default connect(state => ({
  talkCategories: state.site.talk.categories.item
}))(Styled)
