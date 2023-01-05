import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';

@Component({
  selector: 'app-mostpopularkomik',
  templateUrl: './mostpopularkomik.component.html',
  styleUrls: ['./mostpopularkomik.component.scss'],
})
export class MostpopularkomikComponent implements OnInit {
  mostpopularkomik:any = []
  constructor(public ks:KomikService) { }
  mostpopular() {
    this.ks.mostPopularKomikList().subscribe(
      (data)=>{
        this.mostpopularkomik = data['data']
      }
    )
  }

  ngOnInit() {
    this.mostpopular();
  }

}
