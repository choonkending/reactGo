import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import AboutContainer from 'containers/About';

class About extends Component {
  render() {
    return (
      <Page metaData={this.getMetaData()}>
        <AboutContainer {...this.props} />
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
    return 'About | reactGo';
  }

  pageMeta() {
    return [
      { content: "About life"}
    ];
  }

  pageLink() {
    return [];
  }
}

export default About;
