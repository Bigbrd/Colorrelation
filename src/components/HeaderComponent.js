import React from 'react';

//TODO - add twitter widget and facebook widget. add email sign up for the modal? or just have the email form right there. add text
class HeaderComponent extends React.Component {
    render() {
    return (
    <header>
          <a href="javascript:;" id="logo">Colorrelation</a>
          <a href="http://thestocks.im?ref=flatuicolors.com" target="_blank" className="btn btn2 double">Check this out</a>
    </header>
    );
  }
}
export default HeaderComponent;