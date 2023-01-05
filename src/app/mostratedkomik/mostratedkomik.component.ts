import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';

@Component({
  selector: 'app-mostratedkomik',
  templateUrl: './mostratedkomik.component.html',
  styleUrls: ['./mostratedkomik.component.scss'],
})
export class MostratedkomikComponent implements OnInit {
  mostratedkomik:any = []
  constructor(public ks: KomikService) { }
  ratedkomik() {
    this.ks.mostRatedKomikList().subscribe(
      (data) => {
        this.mostratedkomik = data['data'];
      }
    )
  }
  ngOnInit() {
    this.ratedkomik();
  }

}
