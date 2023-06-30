import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  template: `
    <input 
      #inputSearch
      autofocus
      type="text"
      class="form-control-lg"
      placeholder="Search your character name..."
      (keyup)="onSearchChar(inputSearch.value)"
    />
  `,
  styles: ['input { width: 100% }']
})
export class SearchBarComponent {
  constructor(private router:Router){}

  onSearchChar(value:string){
    if(value && value.length > 3){
      this.router.navigate(['/characters-list'], {
        queryParams: { q: value }
      })
    } else {
      this.router.navigate(['/home'])
    }
  }
}
