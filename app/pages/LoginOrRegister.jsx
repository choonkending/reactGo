import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import LoginOrRegisterContainer from 'containers/LoginOrRegister';

class LoginOrRegister extends Component {
  render() {
    return (
      <Page metaData={this.getMetaData()}>
        <LoginOrRegisterContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'LoginOrRegister | reactGo';
  }

  pageMeta() {
    return [
      { content: "An example reactGo page that demonstrates logging in or registering"}
    ];
  }

  pageLink() {
    return [];
  }
}

export default LoginOrRegister;
