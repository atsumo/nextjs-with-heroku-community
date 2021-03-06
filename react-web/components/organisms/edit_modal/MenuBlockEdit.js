import React from 'react'
import LinkEditor from 'components/molecules/edit_modal/LinkEditor'

export default class MenuBlockEdit extends React.Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div className="editNav_menuBlock" style={props.style}>
          <div className="form-group row">
            <label className="col-2 col-form-label">
              {props.label || 'テキスト'}
            </label>
            <div className="col-8">
              <input
                className="menuText"
                type="text"
                value={props.text || ''}
                readOnly={props.editable === false}
                onChange={e => {
                  // 最大文字数を超えてる場合はそもそも発火しない
                  if (e.target.value.length > props.maxLength) return
                  props.onChange(e, props.index)
                }}
              />
            </div>
            <div className="col-2">
              {props.text.length} / {props.maxLength}
            </div>
          </div>

          {(() => {
            if (!props.link) return null
            return (
              <div className="form-group row">
                <label className="col-2 col-form-label">リンク</label>
                <div className="col-10">
                  <LinkEditor />
                </div>
              </div>
            )
          })()}

          {(() => {
            if (!props.delete) return null
            return (
              <div
                className="editNav_delete"
                onClick={() => props.onDelete(props.index)}
              >
                <div className="editNav_deleteBtn">
                  <i className="fa fa-times" />
                </div>
              </div>
            )
          })()}
        </div>

        <style jsx>{`
          ul,
          li {
            list-style-type: none;
          }

          .editNav_menuBlock {
            position: relative;
            padding: 20px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
          }

          .editMenu_group {
            display: table;
            margin-bottom: 10px;
          }

          .editMenu_text {
            display: table-cell;
            vertical-align: middle;
            width: 120px;
          }

          .editMenu_controller {
            display: table-cell;
          }

          input[type='text'] {
            background-color: ${'initial'};
            margin-bottom: 5px;
            padding: 7px 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            width: 80%;
            max-width: 400px;
          }

          .editMenu_controller [name='menuText'] {
            width: 400px;
          }

          .editNav_delete {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 30px;
            height: 30px;
            cursor: pointer;
          }

          .editNav_deleteBtn {
            width: 30px;
            height: 30px;
            opacity: 0.4;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=40)';
            border-radius: 50%;
            background-color: #05161a;
            text-align: center;
            box-shadow: 0 2px 6px rgba(100, 100, 100, 0.8);
            transition: all 0.1s ease-in;
          }

          .editNav_delete:hover .editNav_deleteBtn {
            opacity: 1;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
            background-color: #e31f1f;
          }

          .editNav_deleteBtn > i {
            color: #e31f1f;
            font-size: 15px;
            line-height: 30px;
            ransition: all 0.1s ease-in;
          }

          .editNav_delete:hover .editNav_deleteBtn > i {
            color: #fff;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
