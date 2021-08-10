import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerChannelsPage } from './owner-channels.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerChannelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerChannelsPageRoutingModule {}
