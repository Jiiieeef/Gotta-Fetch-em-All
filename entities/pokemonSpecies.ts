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
