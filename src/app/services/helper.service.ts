import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  
  /**
   * trie les users par ordre alphabetique basé sur le nom
   * @param items 
   * @returns users
   */
  trieParOrdreAlphabetique(items: User[]): User[] {

    // Création d'objet temporaire qui contient les positions et les valeurs en minuscules
    var mapped = items.map(function (e, i) {
      return { index: i, value: e.nom.toLowerCase() };
    });

    // on trie l'objet temporaire avec les valeurs réduites
    mapped.sort(function (a, b) {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });

    // on utilise un objet final pour les résultats
    var result = mapped.map(function (e) {
      return items[e.index];
    });

    return result;
  }



  /**
   * scroll to top à 60 pour afficher le message d'erreur
   */
  scrollToTop60() {
    window.scroll({ 
      top: 60, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

   /**
   * scroll to top à 0 pour afficher le message d'erreur
   */
   scrollToTop0() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  /**
   * scroll to top à 20 pour afficher les messages d'erreur, d'info et d'alerte
   */
  scrollToTop20() {
    window.scroll({ 
      top: 20, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

    /**
   * scroll to top à 150 pour afficher les messages d'erreur, d'info et d'alerte
   */
  scrollToTop150() {
    window.scroll({ 
      top: 150, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  /**
   * 
   * @param civilite accord masc / fem
   * @param word 
   * @returns newWord
   */
  accordMascFem(civilite: string, word: string): string {
    let newWord = "";
    switch (word) {
      case "accompagne":
        newWord = civilite == "Mme" || civilite == "Mlle" ? "accompagnée" : "accompagné";
        break;
      case "present":
        newWord = civilite == "Mme" || civilite == "Mlle" ? "présente" : "présent";
        break;
      default:
        break;
    }
    return newWord;
  }

  /**
   * rajouter l'indicatif telephonique devant l'input de l'user
   * @param tel
   * @returns string
   */
  rajouterLindicatifTelephonique(tel: string): string {
    return tel.charAt(0) == "0" ? "(+33) "+tel : tel.charAt(0) == "6" ?  "(+237) "+tel : tel;
  }
 
  /**
   * formatter correctement l'email (en miniscule et sans espace)
   * @param ch 
   * @returns string
   */
  gestionEmail(ch: string): string {
    // mettre en minicule et supression des differents espaces
    let chaine = "";
    ch.split(' ').map(i => {
      chaine = chaine + i;
    });
    return chaine.trim().toLowerCase();
  }

  /**
   * formatter le nom de l'user selon son input
   * @param ch 
   * @returns 
   */
  mettreChaineEnMajuscule(ch: string): string {
    return ch.toUpperCase();
  }
  
  /**
   * mettre la 1ere lettre du='une chaine en majuscule
   * @param ch 
   * @returns 
   */
  mettreLa1ereLettreDeLaChaineEnMajuscule(ch: string): string {
    return ch.charAt(0).toUpperCase() + ch.substring(1).toLowerCase();
  }

  /**
   * formatter le prenom de l'user selon son input
   * @param ch 
   * @returns chaine
   */
  gestionDeLa1ereLettreDeChaquePrenomSiPlrsEnMajuscule(ch: string): string {
    let chaine = "";
    ch.split(' ').map(i => {
      chaine = chaine + this.mettreLa1ereLettreDeLaChaineEnMajuscule(i)  + " ";
    });
    return this.toString(chaine);
  }
  
  /**
   * retourner un chaine de caratere
   * @param ch 
   * @returns chaine
   */
  toString(ch: string): string {
    return ch.toString().trim();
  }

/**
 * retourne true si la chaine de caractere est vide
 * @param ch 
 * @returns boolean
 */
  isEmptyOrBlank(ch: string): boolean {
    return this.toString(ch) === "";
  }
  
  /**
   * formatter le nom complet de l'user selon son input (nom + prenom)
   * @param firstname 
   * @param lastname 
   * @returns fullname
   */
  construireFullname(firstname: string, lastname: string): string {
    if(this.isEmptyOrBlank(lastname)) {
      return this.gestionDeLa1ereLettreDeChaquePrenomSiPlrsEnMajuscule(this.toString(firstname));
    } else {
      return this.mettreChaineEnMajuscule(this.toString(lastname)) + " " + this.gestionDeLa1ereLettreDeChaquePrenomSiPlrsEnMajuscule(this.toString(firstname));
    }
  }
}
