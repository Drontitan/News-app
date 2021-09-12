import "./App.css";
import Navbar from "./Components/Navbar";
import React, { Component } from "react";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
export default class App extends Component {
  pagesize = 15;
  apikey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Switch>
            <Route exact path="/">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                key="general"
                country="in"
                category="general"
              />
            </Route>
            <Route exact path="/business">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                key="business"
                country="in"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="entertainment"
                category="entertainment"
              />
            </Route>
            <Route exact path="/general">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="general"
                category="general"
              />
            </Route>
            <Route exact path="/health">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="health"
                category="health"
              />
            </Route>
            <Route exact path="/science">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="science"
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="sports"
                category="sports"
              />
            </Route>
            <Route exact path="/technology">
              <News
                setprogress={this.setProgress}
                apikey={this.apikey}
                pagesize={this.pagesize}
                country="in"
                key="technology"
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
