import React, { Component } from "react";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootTabNav from "./Router";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootTabNav />
      </Provider>
    );
  }
}

export default App;
