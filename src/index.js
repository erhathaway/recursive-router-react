import React from 'react';
import Router from 'recursive-router';

import { registerRouter, initalizeRouter } from 'recursive-router';


const generateRouter = () => {
  const RouterContext = React.createContext('recursive-router');
  const routerTree = initalizeRouter({});

  class RouterComponent extends React.Component {
    constructor(props) {
      super(props);
      if (this.props.parent === null) {
        this.routerTree = routerTree;
      }
  
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
  
      this.state = {
        show: this.show,
        hide: this.hide,
      }

      // this.routerRef = this.routerTree.registerOrFetchRouter({
      //   name: this.props.name,
      //   parent: this.props.parent,
      //   type: this.props.type,
      // });
    }

    show(name) {
      console.log('showing', name); // eslint-disable-line
    }
  
    hide(name) {
      console.log('hiding', name); // eslint-disable-line
    }
  
    render() {
      console.log(this.props.name, this.props.parent)
      if (this.parent === null) {
        return (
          <RouterContext.Provider value={this.state}>
            { this.props.children }
          </RouterContext.Provider>
        );
      }
      return (
        <RouterContext.Provider value={this.state}>
          { this.props.children }
        </RouterContext.Provider>
      );
    }
  }

  return RouterComponent;
}


export default generateRouter;
