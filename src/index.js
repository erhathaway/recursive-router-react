import React from 'react';
import Router from 'recursive-router';
import uuidv4 from 'uuid/v4';

import { registerRouter, initalizeRouter } from 'recursive-router';

const RouterContext = React.createContext('recursive-router');

const generateRouter = () => {
  const uuid = uuidv4();
  let parent = null;
  const seen = [];
  const lastUsedParent = [];

  class RouterComponent extends React.Component {
    constructor(props) {
      super(props);
      // console.log(this.props); // eslint-disable-line
      // if (this.props.type === 'root') {
      if (parent === null) {
        const routers = initalizeRouter({});
  
        this.router = routers;
        // console.log('done making router', uuid); // eslint-disable-line
      }
  
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
  
      this.state = {
        show: this.show,
        hide: this.hide,
      }

      this.parent = null;
      this.traverseComponentTreeStart();
    }
    
    componentWillUpdate() {
      this.traverseComponentTreeStart();

    }

    componentDidUpdate() {
      this.traverseComponentTreeEnd();

    }

    componentDidMount() {
      this.traverseComponentTreeEnd();
    }

    traverseComponentTreeStart() {
      // console.log('starting mount: ', this.props.name); // eslint-disable-line
      // this.previousParent = parent; // memoize previous parent
      this.parent = (parent || '').slice();
      parent = this.props.name.slice();
      // console.log('parent: ', this.parent)
    }

    traverseComponentTreeEnd() {
      console.log('-----------------')

      const expectedParent = this.parent.slice();
      if (!seen.includes(expectedParent)) {
        parent = expectedParent // set previous parent
      } else if (parent === this.props.name) {
        parent = lastUsedParent.reverse().find(n => n !== this.props.name).slice();
      }

      seen.push(this.props.name)
      lastUsedParent.push(parent.slice());

      console.log('finised mounting', this.props.name)
      console.log('parent::', parent)
    }
  
    show(name) {
      console.log('showing', name); // eslint-disable-line
    }
  
    hide(name) {
      console.log('hiding', name); // eslint-disable-line
    }
  
    render() {
      console.log(this.props.name)
      if (this.props.type === 'root') {
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
