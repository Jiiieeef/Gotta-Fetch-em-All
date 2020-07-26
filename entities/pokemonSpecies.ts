import { IEvolutionChain } from './interfaces';

const GENDER_RATE = 8;

export class PokemonSpecies {
  name: string;
  isBaby: boolean;
  descriptions: any[];
  genderRate: number;
  generation: string;
  evolutionChain: IEvolutionChain[];

  constructor(json: any) {
    this.name = json.name;
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
      name: json.name,
      isBaby: json.is_baby,
      descriptions: json.flavor_text_entries,
      genderRate: json.gender_rate,
      generation: json.generation.name,
      evolutionChain: json.evolution_chain
    });
  }

  /**
   * Parse the evolutionchain of a species.
   *
   * @param {Object} evolutionChain
   * @returns {IEvolutionChain}
   */
  static evolutionChainParser(evolutionChain: any): IEvolutionChain {
    const parseEvolveTo = (evolvesTo: any[]) => {
      return evolvesTo.map(evolution => {
        const _chain = {} as IEvolutionChain;

        _chain.isBaby = evolution.is_baby;
        _chain.species = evolution.species;
        _chain.evolveTo = evolution.evolves_to ? parseEvolveTo(evolution.evolves_to) : [];

        return _chain;
      });
    };

    const chain = {} as IEvolutionChain;
    chain.isBaby = evolutionChain.chain.is_baby;
    chain.species = evolutionChain.chain.species;

    chain.evolveTo = evolutionChain.chain.evolves_to.length
      ? parseEvolveTo(evolutionChain.chain.evolves_to)
      : [];

    return chain;
  }
}
