import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  // constructor(private http: HttpClient) {
  //   Pusher.logToConsole = true;
  //   this.pusher = new Pusher(environment.pusher.key, {
  //     cluster: environment.pusher.cluster,
  //     // encrypted: true
  //   });
  //  this.channel = this.pusher.subscribe('crearmarca');
  // }
}
