import { charmanderEvolutionChain, poliwagEvolutionChain } from './evolutionChains.mock';
import { PokemonSpecies } from '~/entities/pokemonSpecies';

describe('PokemonSpecies', () => {
  describe('PokemonSpecies.fromJson', () => {
    test('should return an instance of PokemonSpecies', () => {
      const species = PokemonSpecies.fromJson({
        name: 'Insécateur',
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 2,
        generation: { name: 'generation-i' },
        evolution_chain: []
      });

      expect(species).toBeInstanceOf(PokemonSpecies);
    });
  });

  describe('PokemonSpecies.evolutionChainParser', () => {
    test('should return an evolution for charmander which has two evolutions', () => {
      const evolutionChain = PokemonSpecies.evolutionChainParser(charmanderEvolutionChain);

      expect(evolutionChain.species.name).toEqual('charmander');
      expect(evolutionChain.evolveTo[0].species.name).toEqual('charmeleon');
      expect(evolutionChain.evolveTo[0].evolveTo[0].species.name).toEqual('charizard');
      expect(evolutionChain.evolveTo[0].evolveTo[0].evolveTo.length).toEqual(0);
    });

    test('should return an evolution for poliwag which has many final form evolutions', () => {
      const evolutionChain = PokemonSpecies.evolutionChainParser(poliwagEvolutionChain);

      expect(evolutionChain.species.name).toEqual('poliwag');
      expect(evolutionChain.evolveTo[0].species.name).toEqual('poliwhirl');
      expect(evolutionChain.evolveTo[0].evolveTo.length).toEqual(2);
      expect(evolutionChain.evolveTo[0].evolveTo[0].species.name).toEqual('poliwrath');
      expect(evolutionChain.evolveTo[0].evolveTo[1].species.name).toEqual('politoed');
    });
  });

  describe('getGenderPercentage', () => {
    test('should return false if the genderRate is -1', () => {
      const species = PokemonSpecies.fromJson({
        name: 'Insécateur',
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: -1,
        generation: { name: 'generation-i' },
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(false);
    });

    test('should return 25 if the genderRate is 2', () => {
      const species = PokemonSpecies.fromJson({
        name: 'Insécateur',
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 2,
        generation: { name: 'generation-i' },
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(25);
    });

    test('should return 100 if the genderRate is 8', () => {
      const species = PokemonSpecies.fromJson({
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 8,
        generation: { name: 'generation-i' },
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(100);
    });
  });
});
