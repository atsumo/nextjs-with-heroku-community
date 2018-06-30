import React from 'react'
import Dropzone from 'react-dropzone'

const dropzoneStyle = {
  display: 'block',
  marginTop: 20,
  marginBottom: 30,
  textAlign: 'center',
  color: '#919191'
}

const ImgPreviews = props => {
  // crop and resize images
  // http://stackoverflow.com/questions/11552380/how-to-automatically-crop-and-center-an-image
  const imgStyle = {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%'
    // height: 150
  }

  return props.files.map((file, i) => (
    <div key={i} className="imgList my-3">
      <img src={file.preview} role="presentation" style={imgStyle} />
      <i className="fas fa-times" onClick={e => props.onDelete(e, file)} />

      <style jsx>{`
        .imgList {
          position: relative;
          margin: 0 20px;
        }

        i {
          font-size: 20px;
          position: absolute;
          top: 10px;
          right: 15px;
          color: #037bff;
        }
      `}</style>
    </div>
  ))
}

export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <div>
        {props.files.length > 0 ? (
          <ImgPreviews files={props.files} onDelete={props.onDelete} />
        ) : null}

        <Dropzone accept="image/*" onDrop={props.onDrop} style={dropzoneStyle}>
          <i className="fas fa-images" />
        </Dropzone>

        <style jsx>{`
          i {
            font-size: 35px;
          }
        `}</style>
      </div>
    )
  }
}