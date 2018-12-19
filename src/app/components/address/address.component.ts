import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as htmlToImage from 'node_modules/html-to-image';
import * as download from 'node_modules/downloadjs';

import { ImageService } from '../../services/FileService';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  // url = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyAX2jlXZmoFoJklhX-WZ3p3Dgdy_xtFjcY&center=-33.8569,151.2152&zoom=21 &maptype=satellite';
  // url = null;
  // key = 'AIzaSyAX2jlXZmoFoJklhX-WZ3p3Dgdy_xtFjcY';
  // baseUrl = 'https://www.google.com/maps/embed/v1/view?';
  image : File;
  address = new Address();
  map = new Map();
  constructor(private http: HttpClient, private imageService: ImageService) { }

  ngOnInit() {

  }

  mapInit(location) {
    this.map.location = location;
    this.map.zoom = 24;
    this.map.visiable = true;
    return this.map;
  }

  send() {
    // this.url = null;
    // console.log(this.address);
    this.http.post('/api/address/validate', this.address)
      .subscribe(result => {
        this.map = this.mapInit(result[0].geometry.location);
      });
  }

  check() {
    console.log(this.address.streetAddress1);
  }

  selectedFile(imageInput) {
    this.imageService.uploadImage(imageInput.files.item(0)).subscribe(response => {
    });
  }

  screenShot() {
    htmlToImage.toPng(document.getElementById('map')).then(base64Image => {
      // download(dataUrl, 'map.png');
      this.imageService.uploadImageByImageUrl (base64Image).subscribe(response => {
      });
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
  visiable: boolean;
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
