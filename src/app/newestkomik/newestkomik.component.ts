import { Component, OnInit } from '@angular/core';
import { KomikService } from '../komik.service';

@Component({
  selector: 'app-newestkomik',
  templateUrl: './newestkomik.component.html',
  styleUrls: ['./newestkomik.component.scss'],
})
export class NewestkomikComponent implements OnInit {
  newscomics:any = []
  constructor(public ks: KomikService) { }
  newcomic() {
    this.ks.mostNewestKomikList().subscribe(
      (data) => {
        this.newscomics = data['data'];
      }
    )
  }
  ngOnInit() {
    this.newcomic();
  }

}
