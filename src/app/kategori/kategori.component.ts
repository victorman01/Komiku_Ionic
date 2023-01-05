import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss'],
})
export class KategoriComponent implements OnInit {
  kategori: any = []
  searchKey: any = ""

  constructor(public ks: KomikService) { }

  kategoris() {
    this.ks.kategoriList(this.searchKey).subscribe(
      (data) => {
        this.kategori = data['data']
      }
    )
  }

  search() {
    this.kategoris();
  }
  ngOnInit() {
    this.kategoris();
  }

}
