import React from 'react';

//TODO - validate and make sure this works
class ModalComponent extends React.Component {
    render() {
    return (
      <div className="modal" style={{display: 'none'}}>
        <div className="modal-overlay" />
        <div className="modal-content">
            <a href="javascript:;" className="modal-close">╋</a>
            <h1>Liked what you see?</h1>
            <p>Soon we are launching more correlation inspired projects. Subscribe and be the first to know when
we launch tools for designers, developers and entrepreneurs.</p>
            <input type="email" placeholder="Your e-mail" />
            <a href="javascript:;" className="submit">Subscribe</a>
            <div className="result">Only new products, no spam.</div>
        </div>
    </div>
    );
  }
}
export default ModalComponent;
