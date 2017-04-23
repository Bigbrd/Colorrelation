import React from 'react';

//TODO - add twitter widget and facebook widget to like/share.
// add email sign up for the modal? or just have the email form right there. add text
// add privacy policy & contact me email?
//design an actual logo as an image inside the a href
class HeaderComponent extends React.Component {
    render() {
    return (
    <header>
          <a href="javascript:;" id="logo">Colorrelation</a>
          <a href="https://twitter.com/brDick" target="_blank" className="btn btn2 double">Check this out</a>
    </header>
    );
  }
}
export default HeaderComponent;