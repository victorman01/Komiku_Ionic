import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  webservice = "https://ubaya.fun/hybrid/160420035/komiku/"
  user_id = "";
  login_user = "";
  login_passwd = "";
  login_error = "";
  name = "";
  showComponent: any = "";

  login() {
    if (this.login_user != "" && this.login_passwd != "") {
      this.checkLogin(this.login_user, this.login_passwd).subscribe(
        (data) => {
          if (data['result'] == 'success') {
            this.name = data['name'];
            this.user_id = data['user_id'];
            this.storage.set('name', this.name);
            this.storage.set('user_id', this.user_id);
          } else {
            this.login_error = "Username or Password is wrong";
          }
        }
      );
    } else {
      this.login_error = "Username or Password is empty";
    }
  };
  logout() {
    this.storage.remove('user_id');
    this.storage.remove('name');
    this.user_id = "";
    this.name = "";
  }

  checkLogin(usernamme: string, password: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', usernamme);
    body = body.set('password', password);
    return this.http.post(this.webservice + "login.php", body);
  }

  constructor(private storage: Storage, private http: HttpClient) { }
  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get('user_id');
    this.name = await this.storage.get('name');
  }
}
