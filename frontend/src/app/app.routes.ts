import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {path:"",
        component : HomeComponent,
        pathMatch: "full"
    },
    {path:"home",
        component : HomeComponent,
        pathMatch: "full"
    },
    {path:"chat",
        component : ChatsComponent,
        pathMatch: "full"
    },
    {path:"**",
        component : ErrorComponent,
    },
   
];
