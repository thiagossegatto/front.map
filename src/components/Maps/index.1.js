import React, { Component } from "react";
import { loadScript } from "../../functions/";

var map;

class Maps extends Component {
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
    const { zoom, center } = this.props;
    map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: center
    });
    /*window.google.maps.event.addListener(map, "zoom_changed", function() {
      var zoomLevel = map.getZoom();
      console.log(zoomLevel);
    });*/
    window.google.maps.event.addListener(map, "center_changed", function() {
      var position = map.getCenter();
      //console.log(map.getZoom());
      console.log(map.getBounds());
      console.log(map.getBounds().ga.l);
      console.log(position.lat() + " " + position.lng());
      this.props.loadProperties({
        west: map.getBounds().ga.l,
        east: map.getBounds().ga.j,
        north: map.getBounds().ma.j,
        south: map.getBounds().ma.l,
        page: 1,
        take: 10000
      });
    });
    //console.log(this.props);
    this.loadMarkers(map);
  };

  componentDidUpdate() {
    this.loadMarkers(map);
  }

  loadMarkers = map => {
    const { lists, icons } = this.props;
    if (lists.length > 0) {
      var markers = lists.map(function(data, i) {
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
      new window.MarkerClusterer(map, markers, mcOptions);
    }
  };

  render() {
    return <div style={{ height: "100vh", width: "100%" }} id="map" />;
  }
}

export default Maps;
