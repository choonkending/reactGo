import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import DashboardContainer from 'containers/Dashboard';

class Dashboard extends Component {
  render() {
    return (
      <Page metaData={this.getMetaData()}>
        <DashboardContainer {...this.props} />
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
    return 'Dashboard | reactGo';
  }

  pageMeta() {
    return [
      { content: "A dashboard"}
    ];
  }

  pageLink() {
    return [];
  }
}

export default Dashboard;

