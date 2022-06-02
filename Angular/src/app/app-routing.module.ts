import { RegisterComponent } from './components/register/register.component';

import { UyemakaleComponent } from './components/uyemakale/uyemakale.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { MakaleComponent } from './components/makale/makale.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminMakaleComponent } from './components/admin/admin-makale/admin-makale.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  
  {
    path: 'makale/:makaleId',
    component: MakaleComponent
  },
  {
    path: 'kategori/:katId',
    component: KategoriComponent
  },
  {
    path: 'uyemakale/:uyeId',
    component: UyemakaleComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/kategori',
    component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/makale',
    component: AdminMakaleComponent
  },
  {
    path: 'admin/makale/:katId',
    component: AdminMakaleComponent
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
