import Dropzone from 'react-dropzone'
const dropzoneStyle = {
  display: 'block',
  textAlign: 'center',
  color: '#919191',
  cursor: 'pointer',
  // this is important !
  overflow: 'hidden'
}

// from pera
const Index = props => (
  <button type="button" className={`imgUploaderButton ${props.className}`}>
    <Dropzone accept="image/*" onDrop={props.onDrop} style={dropzoneStyle}>
      <i className="fa fa-folder-open" /> 画像を選択してアップロード
    </Dropzone>
    <style jsx>{`
      .imgUploaderButton {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
        background: #f7f7f7;
        border-radius: 0;
        box-shadow: inset 0 0 0 2px #ccc;
        font-size: 16px;
        padding: 7px 15px;
        transition: all 0.3s ease;
        position: relative;
      }
    `}</style>
  </button>
)

export default Index
