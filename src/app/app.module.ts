import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Component
import { KomiksComponent } from './komiks/komiks.component';
import { IsikomikComponent } from './isikomik/isikomik.component';
import { KategoriComponent } from './kategori/kategori.component';
import { MyfavouritesComponent } from './myfavourites/myfavourites.component';
import { MostpopularkomikComponent } from './mostpopularkomik/mostpopularkomik.component';
import { MostratedkomikComponent } from './mostratedkomik/mostratedkomik.component';
import { NewestkomikComponent } from './newestkomik/newestkomik.component';

// Libraries
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  { path: 'myfavourites', component: MyfavouritesComponent },
  { path: 'kategori', component: KategoriComponent },
  { path: 'komik', component: KomiksComponent },
  { path: 'isikomik/:id', component: IsikomikComponent },
  { path: 'komiks/:id', component: KomiksComponent }
];

@NgModule({
  declarations: [AppComponent, KomiksComponent, IsikomikComponent, KategoriComponent, MyfavouritesComponent, MostpopularkomikComponent, MostratedkomikComponent, NewestkomikComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, IonicStorageModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
