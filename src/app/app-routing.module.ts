import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './components/core/core.component';

const routes: Routes = [
  { path: 'index', component: CoreComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // redirect to `first-component`];
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
