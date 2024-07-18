import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent, title: "Inicial", pathMatch: "prefix"
    },
    {
        path: "cadastrar", component: CadastrarComponent, title: "Cadastro de clientes"
    },
    {
        path: "consultar", component: ConsultarComponent, title: "Consultar de clientes"
    },

    {
        path: "**", component: NotFoundComponent, title: "Página não encontrada"
    }
];
