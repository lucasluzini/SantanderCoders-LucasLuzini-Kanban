import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DragndropComponent } from "./dragndrop/dragndrop.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'kanban-board', component: DragndropComponent, canActivate: [AuthGuardService] },
    // { path: 'cards', component: DragndropComponent},
    { path: '**', redirectTo: 'kanban-board' },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}