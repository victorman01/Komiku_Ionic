import { Component, OnInit } from '@angular/core';

import { KomikService } from '../komik.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-komiks',
  templateUrl: './komiks.component.html',
  styleUrls: ['./komiks.component.scss'],
})
export class KomiksComponent implements OnInit {
  searchKey: string = "";
  webservice = "https://ubaya.fun/hybrid/160420035/komiku/"
  komiks: any = [];

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

  constructor(public ks: KomikService, public route: ActivatedRoute) { }

  listKomik() {
    this.ks.komikList(this.searchKey).subscribe(
      (data) => {
        this.komiks = data['data'];
      }
    );
  };
  listKateKomik(id:number) {
    this.ks.komikKateList(id,this.searchKey).subscribe(
      (data) => {
        this.komiks = data['data']
      }
    )
  }
  search() {
    var idkategori: number = this.route.snapshot.params['id'];
    if (idkategori == null) {
      this.listKomik();
    } else {
      this.listKateKomik(idkategori);
    }
  }
  
  ngOnInit() {
    var idkategori: number = this.route.snapshot.params['id'];
    if (idkategori == null) {
        this.listKomik();
    } else {
        this.listKateKomik(idkategori);
    }
  }

}
