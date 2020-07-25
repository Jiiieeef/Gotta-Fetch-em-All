const GENDER_RATE = 8;

export class PokemonSpecies {
  isBaby: boolean;
  descriptions: any[];
  genderRate: number;
  generation: string;
  evolutionChain: any[];

  constructor(json: any) {
    this.isBaby = json.isBaby;
    this.descriptions = json.descriptions;
    this.genderRate = json.genderRate;
    this.generation = json.generation;
    this.evolutionChain = json.evolutionChain;
  }

  /**
   * Return the percentage of chance for a pokémon to be female.
   * If the rate is -1, then the pokémon is genderless and return false.
   *
   * @returns {Boolean | Number}
   */
  getGenderPercentage(): boolean | number {
    if (this.genderRate === - 1) {
      return false;
    }

    return this.genderRate / GENDER_RATE * 100;
  }

  static fromJson(json: any): PokemonSpecies {
    return new PokemonSpecies({
      isBaby: json.is_baby,
      descriptions: json.flavor_text_entries,
      genderRate: json.gender_rate,
      generation: json.generation.name,
      evolutionChain: json.evolution_chain
    })
  }
}
