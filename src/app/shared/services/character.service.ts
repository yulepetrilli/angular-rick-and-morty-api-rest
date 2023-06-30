import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '@environments/environment';
import { Character } from '@shared/interface/character.interface';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private htttp: HttpClient) { }

  searchCharacters(query = '', page = 1){
    const filterByName = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.htttp.get<Character[]>(filterByName)
  }

  getCharacterDetails(id:number){
    const getDetails = `${environment.baseUrlAPI}/${id}`;
    return this.htttp.get<Character>(getDetails)
  }
}
