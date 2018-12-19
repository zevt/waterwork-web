import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class ImageService {

    constructor(private http: HttpClient) { }

    uploadImage(image: File): Observable<any> {
        const formData = new FormData();
    
        formData.append('file', image);
    
        return this.http.post('/api/image/upload', formData);
    }

    uploadImageByImageUrl(base64Image: string) : Observable<any> {
        const formData = new FormData();
    
        formData.append('base64Image', base64Image);
    
        return this.http.post('/api/image/uploadByUrl', formData);
    }
}