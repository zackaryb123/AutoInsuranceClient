import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {CustomerPageComponent} from './customer-page/customer-page.component';
import {ClaimOfficerPageComponent} from './claim-officer-page/claim-officer-page.component';
import {InspectOfficerPageComponent} from './inspect-officer-page/inspect-officer-page.component';
import {CoverPageComponent} from './cover-page/cover-page.component';
import {ClaimComponent} from './customer-page/claim/claim.component';
import {ClaimListComponent} from './customer-page/claim-list/claim-list.component'

const routes: Routes = [
  {path: 'cover', component: CoverPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {
    path: 'customer',
    component: CustomerPageComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: ClaimListComponent},
      {path: 'claim', component: ClaimComponent}
    ]
  },
  {path: 'claim_officer', component: ClaimOfficerPageComponent},
  {path: 'inspect_officer', component: InspectOfficerPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
