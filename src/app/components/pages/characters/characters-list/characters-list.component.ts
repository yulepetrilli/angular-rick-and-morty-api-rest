import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs';

import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
})
export class CharactersListComponent {
  characters: Character[] = [];
  info: RequestInfo = {
    next: '',
  };

  private page = 1;
  private query!: string;
  private showScroll = 500;
  showUpButton = false;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void{
    this.getCharactersByQuery();
    this.onUrlChange();
  };

  @HostListener('window:scroll', [])
  onWindowScroll(): void{
    const yOffSet = window.scrollY;
    const checkScrollHeight = yOffSet || this.document.documentElement.scrollTop;

    if(checkScrollHeight > this.showScroll){
      this.showUpButton = true;
    } else if(this.showUpButton && checkScrollHeight < this.showScroll){ 
      this.showUpButton= false;
    }
  }
  
  onScrollDown(): void{
    if(this.info.next){
      this.page++;
      this.getData();
    }
  }

  onScrollUp():void {
    this.document.documentElement.scrollTop = 0;
  }

  //Get character gender and return unicode symbol depending on gender
  getGender(gender:string){
    switch(gender){
      case 'Male':
        return String.fromCodePoint(9794);
      case 'Female':
        return String.fromCodePoint(9792);
      default:
        return 'Genderless'
    };
  };

  private getData ():void {
    this.characterSvc.searchCharacters(this.query, this.page).pipe(
      take(1)
    ).subscribe( (res:any) => {
      console.log(res)
      if(res?.results?.length){
        const {info, results} = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
      } else {
        this.characters = [];
      };
    });
  };

  //Get query from route an used to filter characater search by name
  private getCharactersByQuery():void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.getData();
    });
  };

  //Update query based on url change
  private onUrlChange(): void{
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.characters = []; //Clean results array when updating the search to add only new results based on new query
        this.page = 1;
        this.getCharactersByQuery();
      };
    });
  };

}
