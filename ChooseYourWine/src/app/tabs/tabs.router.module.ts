import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        children: [
          {
            path: '',
            loadChildren: '../Home/Home.module#HomeModule'
          }
        ]
      },
      {
        path: 'Search',
        children: [
          {
            path: '',
            loadChildren: '../Search/Search.module#SearchPageModule'
          }
        ]
      },
      {
        path: 'food-pairings',
        children: [
          {
            path: '',
            loadChildren: '../food-pairings/food-pairings.module#FoodPairingsPageModule'
          }
        ]
      },
      {
        path: 'wine-details',
        children: [
          {
            path: '',
            loadChildren: '../wine-details/wine-details.module#WineDetailsPageModule'
          }
        ]
      },
      {
        path:'list-wine',
        children:[
          {
            path:'',
            loadChildren:'../list-wine/list-wine.module#ListWinePageModule'
          }
        ]
      },
      {
        path:'pairings',
        children:[
          {
            path:'',
            loadChildren:'../pairings/pairings.module#PairingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
