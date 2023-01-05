import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KomikService } from '../komik.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-isikomik',
  templateUrl: './isikomik.component.html',
  styleUrls: ['./isikomik.component.scss'],
})
export class IsikomikComponent implements OnInit {
  isikomik: any = []
  comments: any = []
  replies: any = []
  kategoris: any = []
  check:any = "";
  judul: string = "";
  autor: string = "";
  published: string = "";
  sinopsis: string = "";
  webservice = "https://ubaya.fun/hybrid/160420035/komiku/";
  user_id: any = "";
  fav: any = "";
  rating_user: any = "";
  rated: any = "";
  selectedCommentId: any = "";

  newKomen: any = "";
  newReply: any = "";
  addKomen() {
    var id_komik: number = this.route.snapshot.params['id'];
    this.ks.addKoment(id_komik, this.user_id, this.newKomen).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.showComment();
          this.newKomen = "";
        }
      }
    )
  }
  addReply() {
    this.user_id = this.root.user_id;
    this.ks.addReply(this.selectedCommentId, this.user_id, this.newReply).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.showReplies(this.selectedCommentId);
          this.newReply = "";
        }
      }
    )
  }

  constructor(public ks: KomikService, public route: ActivatedRoute, public http: HttpClient, public root: AppComponent) { }
  listIsiKomik(id:number) {
    this.ks.isiKomikList(id).subscribe(
      (data) => {
        this.isikomik = [];
        this.isikomik = data['data'];
        this.judul = this.isikomik[0]['judul'];
        this.autor = this.isikomik[0]['author'];
        this.published = this.isikomik[0]['published'];
        this.sinopsis = this.isikomik[0]['sinopsis'];
      }
    );
  };
  showReplies(id: number) {
    this.selectedCommentId = id;
    this.replies = [];
    this.ks.replyList(this.selectedCommentId).subscribe(
      (data) => {
        this.replies = data['data'];
      }
    )
  }
  favourite() {
    var id_komik: number = this.route.snapshot.params['id'];
    this.fav = !this.fav;
    this.user_id = this.root.user_id;
    this.ks.favouritesKomik(id_komik, this.user_id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          //success fav
        } else {
          this.ks.unFavKomik(id_komik, this.user_id).subscribe(
            (data) => {
              if (data['result'] == 'success') {
                //success unfav
              }
            }
          )
        }
      }
    )
  }
  showComment() {
    var id_komik: number = this.route.snapshot.params['id'];
    this.ks.commentList(id_komik).subscribe(
      (data)=> {
        this.comments = data['data'];
      }
    )
  }
  kategorisKomik() {
    var id_komik: number = this.route.snapshot.params['id'];
    this.ks.showKategoriKomik(id_komik).subscribe(
      (data) => {
        this.kategoris = data['data']
      }
    )
  }
  
  rating(num:number) {
    var id_komik: number = this.route.snapshot.params['id'];
    this.user_id = this.root.user_id;
    this.ks.addnewrating(id_komik, this.user_id,num).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.rating_user = num;
          this.rated = true;
          this.ks.updateRatingKomik(id_komik).subscribe(
            (data) => {
              if (data['result'] == "success") {
                //nothing to do
              }
            }
          )
        } else {
          this.ks.checkRating(this.user_id, id_komik).subscribe(
            (data) => {
              if (data['data'][0]['rate'] == num) {
                this.ks.deleteRating(id_komik, this.user_id).subscribe(
                  (data) => {
                    if (data['result'] == 'success') {
                      this.rating_user = "You haven't rated yet";
                      this.rated = false;
                      this.ks.updateRatingKomik(id_komik).subscribe(
                        (data) => {
                          if (data['result'] == "success") {
                            //nothing to do
                          }
                        })
                    }
                  }
                )
              } else {
                this.ks.updateRating(num, this.user_id, id_komik).subscribe(
                  (data) => {
                    if (data['result'] == 'success') {
                      this.rating_user = num;
                      this.rated = true;
                      this.ks.updateRatingKomik(id_komik).subscribe(
                        (data) => {
                          if (data['result'] == "success") {
                            // do nothing
                          }
                        })
                    }
                  }
                )
              }
              
            }
          )
        }
      }
    )
  }
  
  ngOnInit() {
    var id: number = this.route.snapshot.params['id'];
    this.user_id = this.root.user_id;
    this.ks.addViews(id).subscribe(
      (data) => {
        if (data['result'] == "success") {
          //nothing to do
        }
      }
    )
    this.ks.checkfavKomik(id, this.user_id).subscribe(
      (data) => {
        if (data['result'] != 'success') {
          this.fav = !this.fav
        }
      }
    )
    this.ks.checkRating(this.user_id, id).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.rating_user = data['data'][0]['rate'];
          this.rated = true;
        } else {
          this.rating_user = "You haven't rated yet";
          this.rated = false;
        }
      })
    this.listIsiKomik(id);
    this.showComment();
    this.kategorisKomik();
  }

}
