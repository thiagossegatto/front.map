import React, { Component } from "react";
import Maps from "./components/Maps/index.js";
import ballon from "./assets/images/ballon1.png";
import cluster from "./assets/images/button_orange.png";
import api from "./services/api.js";

class App extends Component {
  state = {
    center: {
      lat: 51.052197,
      lng: -114.0834051
    },
    zoom: 11,
    lists: [],
    icons: {
      ballon: ballon,
      cluster: cluster
    }
  };

  componentDidMount() {
    this.loadProperties({
      west: -113.936489,
      east: -114.1011841818671,
      north: 51.004579020318914,
      south: 51.09802947658082,
      page: 1,
      take: 10000
    });
  }

  loadProperties = async (data) => {
    const response = await api.post("properties", data);
    console.log(response.data.docs);
    this.setState({ lists: response.data.docs });
  }

  render() {
    return (
      <Maps
        keyG={"AIzaSyCVVAgLbVG_TDb-OXjhn5c96TsWeFSE1qo"}
        zoom={this.state.zoom}
        center={this.state.center}
        icons={this.state.icons}
        lists={this.state.lists}
        loadProperties={this.loadProperties}
      />
    );
  }
}

export default App;
