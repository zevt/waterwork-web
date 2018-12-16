import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as html2canvas from 'node_modules/html2canvas';

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

  @ViewChild('screen') screen : ElementRef;
  @ViewChild('canvas') canvas : ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  address = new Address();
  constructor(private http: HttpClient) { }

  ngOnInit() {

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

      });
  }

  check() {
    console.log(this.address.streetAddress1);
  }

  screenShot() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'map.png';
      this.downloadLink.nativeElement.click();
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
