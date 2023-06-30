import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

const components = [CharactersDetailsComponent, CharactersListComponent]

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule, RouterModule, InfiniteScrollModule
  ],
  exports: [ ...components ]
})
export class CharactersModule { }
