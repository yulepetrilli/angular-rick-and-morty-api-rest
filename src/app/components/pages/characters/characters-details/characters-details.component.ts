import { Observable } from 'rxjs';
import { Character } from './../../../../shared/interface/character.interface';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '@app/shared/services/character.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
})

export class CharactersDetailsComponent {
  character$!: Observable<Character>;

  constructor(
    private route: ActivatedRoute, 
    private characterSvc: CharacterService,
    private location: Location
  ){}


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
  

  ngOnInit(): void{
    //Get id from route to get character details
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.character$ = this.characterSvc.getCharacterDetails(id);
    });
  }

  //Return to charcaters list
  onReturn(): void{
    this.location.back();
  };

}
