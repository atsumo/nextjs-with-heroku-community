import React from 'react'

const Index = props => (
  <React.Fragment>
    <i id="ai" className={`fas fa-bell ${props.className || ''}`} />

    <style jsx>{`
      #ai {
        color: ${props.color};
      }
    `}</style>
  </React.Fragment>
)
export default Index
