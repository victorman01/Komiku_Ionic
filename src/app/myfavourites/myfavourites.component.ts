import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { KomikService } from '../komik.service';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-myfavourites',
  templateUrl: './myfavourites.component.html',
  styleUrls: ['./myfavourites.component.scss'],
})
export class MyfavouritesComponent implements OnInit {
  webservice = "https://ubaya.fun/hybrid/160420035/komiku/"
  komiks: any = [];
  user_id: any = "";
  // search(event:any) {
  //   this.searchTerm = event.target.value;
  //   this.search(this.searchTerm);
  // }

  // doSearch(key: any) {
  //   this.cariKomik(key).subscribe(
  //     (data) => {
  //       this.komiks = data['data'];
  //     }
  //   );
  // }
  // cariKomik(cari: string): Observable<any> {
  //   let body = new HttpParams();
  //   body = body.set('cari', cari);
  //   return this.http.post(this.webservice + "komik.php", body);
  // }

  constructor(public ks: KomikService, private http: HttpClient, public route: ActivatedRoute, public root: AppComponent) { }

  listFavKomik() {
    this.user_id = this.root.user_id;
    this.ks.favKomikList(this.user_id).subscribe(
      (data) => {
        this.komiks = data['data'];
      }
    );
  };

  ngOnInit() {
      this.listFavKomik();
  }
}
