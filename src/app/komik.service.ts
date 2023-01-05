import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KomikService {
  constructor(private http: HttpClient) {}
  webservice = "https://ubaya.fun/hybrid/160420035/komiku/";
  komikList(searchKey: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('cari', searchKey);
    return this.http.post(this.webservice + "komik.php",body);
  }
  komikKateList(idKategori:number, searchKey:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('idKategori', idKategori)
    body = body.set('cari', searchKey)
    return this.http.post(this.webservice + "komik.php",body);
  }
  showKategoriKomik(komik_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "showkategori.php", body);
  }
  addnewrating(id_komik:number,user_id:number,rate:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('komik_id', id_komik);
    body = body.set('user_id', user_id);
    body = body.set('rate', rate);
    return this.http.post(this.webservice + "addrating.php", body);
  }
  updateRatingKomik(id_komik: number) :Observable<any>{
    let body = new HttpParams();
    body = body.set('komik_id', id_komik);
    return this.http.post(this.webservice + "updateratingkomik.php", body);
  }
  addViews(id_komik: number): Observable<any>{
    let body = new HttpParams();
    body = body.set('idKomik', id_komik);
    return this.http.post(this.webservice + "addview.php", body);
  }
  updateRating(rate: number, user_id: number, id_komik: number): Observable<any>{
    let body = new HttpParams();
    body = body.set("rate", rate);
    body = body.set('user_id', user_id);
    body = body.set('komik_id', id_komik);
    return this.http.post(this.webservice + "updaterating.php", body);
  }
  deleteRating(id_komik: number,user_id:number):Observable<any> {
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    body = body.set("komik_id", id_komik);
    return this.http.post(this.webservice+"deleterating.php",body)
  }
  checkRating(user_id:number, komik_id:number): Observable<any>{
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "checkrating.php", body);
  }
  checkfavKomik(komik_id: number, user_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "checkfavkomik.php", body);
  }
  favouritesKomik(komik_id: number, user_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "favkomik.php", body);
  }
  unFavKomik(komik_id: number, user_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "unfavkomik.php", body);
  }
  favKomikList(user_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set("user_id", user_id);
    return this.http.post(this.webservice + "favoritekomik.php", body);
  }
  isiKomikList(id:number): Observable<any>{
    let body = new HttpParams();
    body = body.set('id_Komik', id);
    return this.http.post(this.webservice + "isikomik.php", body);
  }
  kategoriList(searchKey:string): Observable<any>{
    let body = new HttpParams();
    body = body.set('cari', searchKey)
    return this.http.post(this.webservice + "kategori.php",body);
  }
  commentList(komik_id: number): Observable<any>{
    let body = new HttpParams();
    body = body.set('komik_id', komik_id);
    return this.http.post(this.webservice + "showkomentar.php", body);
  }
  replyList(komentar_id:number): Observable<any>{
    let body = new HttpParams();
    body = body.set('komentar_id', komentar_id);
    return this.http.post(this.webservice + "showreply.php", body);
  }
  addKoment(komik_id: number, user_id: number, komentar: string): Observable<any>{
    let body = new HttpParams();
    body = body.set('komik_id', komik_id);
    body = body.set('user_id', user_id);
    body = body.set('komentar', komentar);
    return this.http.post(this.webservice + "addkomentar.php", body);
  }
  addReply(komentar_id:number, user_id:number, komentar:number):Observable<any>{
    let body = new HttpParams();
    body = body.set('komentar_id', komentar_id);
    body = body.set('user_id', user_id);
    body = body.set('komentar', komentar);
    return this.http.post(this.webservice + "replykomentar.php", body);
  }
  mostRatedKomikList():Observable <any> {
    return this.http.get(this.webservice + "showratedKomik.php");
  }
  mostPopularKomikList(): Observable<any> {
    return this.http.get(this.webservice + "mostpopularkomik.php");
  }
  mostNewestKomikList(): Observable<any> {
    return this.http.get(this.webservice + "shownewestkomik.php");
  }
}
