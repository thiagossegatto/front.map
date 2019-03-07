import React, { Component } from "react";
//import GoogleMapReact from "google-map-react";
import datas from "./base/data.json";
import ballon from "./assets/images/ballon1.png";

const AnyReactComponent = ({ text }) => (
  <div>
    <img src={ballon} alt="ballon" />
  </div>
);

class App1 extends Component {
  state = {
    center: {
      lat: 51.052197,
      lng: -114.0834051
    },
    zoom: 11
  };

  componentDidMount() {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVVAgLbVG_TDb-OXjhn5c96TsWeFSE1qo"
    )
      .then(() =>
        setTimeout(() => {
          this.initMap();
        }, 500)
      )
      .catch(e => console.log(e));

    loadScript(
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"
    );
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: this.state.zoom,
      center: this.state.center
    });
    window.google.maps.event.addListener(map, "zoom_changed", function() {
      var zoomLevel = map.getZoom();
      console.log(zoomLevel);
    });
    this.loadMarkers(map);
  };

  loadMarkers = map => {
    var markers = datas.listings.map(function(data, i) {
      return new window.google.maps.Marker({
        position: {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        },
        id: data.id,
        icon: ballon
        //label: labels[i % labels.length]
      });
    });
    markers.map(marker => marker.addListener('click', function(evt) {
      console.log(marker);
    }));
    var clusterStyles = [
      {
        textColor: "white",
        url: ballon,
        height: 48,
        width: 42
      }
    ];
    var mcOptions = {
      gridSize: 50,
      styles: clusterStyles,
      maxZoom: 15
    };
    new window.MarkerClusterer(map, markers, mcOptions);
  };

  render() {
    return <div style={{ height: "100vh", width: "100%" }} id="map" />;
  }
}

function loadScript(url, callback) {
  return new Promise(function(resolve, reject) {
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    index.parentNode.insertBefore(script, index);
  });
}

export default App1;
