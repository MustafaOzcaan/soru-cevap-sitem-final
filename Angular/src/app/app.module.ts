import { RegisterComponent } from './components/register/register.component';

import { FotoDialogComponent } from './components/dialogs/foto-dialog/foto-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { UyemakaleComponent } from './components/uyemakale/uyemakale.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { MakaleComponent } from './components/makale/makale.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { MakaleDialogComponent } from './components/dialogs/makale-dialog/makale-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminMakaleComponent } from './components/admin/admin-makale/admin-makale.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { JoditAngularModule } from 'jodit-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    MakaleComponent,
    KategoriComponent,
    UyemakaleComponent,
    UyeDialogComponent,
    FotoDialogComponent,
    RegisterComponent,


    //Admin
    AdminComponent,
    AdminKategoriComponent,
    AdminMakaleComponent,
    AdminUyeComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    MakaleDialogComponent,

    SafeHTMLPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JoditAngularModule,

  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    MakaleDialogComponent

  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
