import React from 'react';

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        { this.props.children }
      </React.Fragment>
    );
  }
}

export default Router;
