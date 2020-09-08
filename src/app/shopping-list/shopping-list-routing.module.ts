import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
