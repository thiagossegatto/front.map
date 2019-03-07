import React, { Component } from "react";
import { loadScript } from "../../functions/";

var map;
var markers = [];
var MarkerClusterer = [];

class Maps extends Component {
  async componentDidMount() {
    const { keyG } = this.props;
    await loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${keyG}`
    )
      .then(() => {
        //setTimeout(async () => {
        this.initMap();
        //}, 500)
      })
      .catch(e => console.log(e));

    await loadScript(
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"
    );
  }

  initMap = async () => {
    const { zoom, center } = this.props;
    map = await new window.google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: center
    });
    map.addListener("zoom_changed", async () => {
      await this.load(map.getBounds());
    });
    await map.addListener("dragend", async () => {
      await this.load(map.getBounds());
    });
  };

  load = async bounds => {
    await this.props.loadProperties({
      west: bounds.ga.l,
      east: bounds.ga.j,
      north: bounds.ma.j,
      south: bounds.ma.l,
      page: 1,
      take: 10000
    });
    await this.loadMarkers(map);
  };

  componentDidUpdate() {
    //this.loadMarkers(map);
  }

  deleteMarkers = async () => {
    if (MarkerClusterer.hasOwnProperty("clusters_")) {
      if (MarkerClusterer.clusters_.length > 0) {
        await MarkerClusterer.clearMarkers();
        markers = [];
        MarkerClusterer = [];
      }
    }
  }

  loadMarkers = async map => {
    const { lists, icons } = this.props;
    if (lists.length > 0) {

      await this.deleteMarkers();

      markers = lists.map(function(data, i) {
        return new window.google.maps.Marker({
          position: {
            lat: parseFloat(data.latitude),
            lng: parseFloat(data.longitude)
          },
          id: data.id,
          icon: icons.ballon
        });
      });
      markers.map(marker =>
        marker.addListener("click", function(evt) {
          console.log(marker);
        })
      );
      var mcOptions = {
        gridSize: 50,
        styles: [
          {
            textColor: "white",
            url: icons.cluster,
            height: 48,
            width: 42
          }
        ],
        maxZoom: 15
      };
      MarkerClusterer = new window.MarkerClusterer(map, markers, mcOptions);
    }
  };

  render() {
    return <div style={{ height: "100vh", width: "100%" }} id="map" />;
  }
}

export default Maps;
