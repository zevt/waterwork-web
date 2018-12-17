import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as htmlToImage from 'node_modules/html-to-image';
import * as download from 'node_modules/downloadjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  // url = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyAX2jlXZmoFoJklhX-WZ3p3Dgdy_xtFjcY&center=-33.8569,151.2152&zoom=21 &maptype=satellite';
  url = null;
  key = 'AIzaSyAX2jlXZmoFoJklhX-WZ3p3Dgdy_xtFjcY';
  baseUrl = 'https://www.google.com/maps/embed/v1/view?';

  address = new Address();
  map = new Map();
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  mapInit(location) {
    this.map.location = location;
    this.map.zoom = 24;
    return this.map;
  }

  send() {
    this.url = null;
    console.log(this.address);
    this.http.post('/api/address/validate', this.address)
      .subscribe(r => {
        console.log(r);
        const location: Location = r[0].geometry.location;
        const center = [location.lat, location.lng].join(',');
        this.url = ['key=' + this.key,
          'center=' + center, 'zoom=21',
          'maptype=satellite']
          .join(' &');
        this.url = this.baseUrl + this.url;
        console.log(this.url);
        this.map = this.mapInit(r[0].geometry.location);
      });
  }

  check() {
    console.log(this.address.streetAddress1);
  }

  screenShot() {
    htmlToImage.toPng(document.getElementById('map'))
    .then(function (dataUrl) {
      download(dataUrl, 'map.png');
    });
  }
}

class Address {
  streetAddress1: String;
  streetAddress2: String;
  city: String;
  state: String;
  zipcode: String;
}

class Location {
  lat: number;
  lng: number;
}

class Map {
  location : Location;
  zoom: number;
}
