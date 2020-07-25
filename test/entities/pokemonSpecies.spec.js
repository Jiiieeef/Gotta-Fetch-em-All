import { PokemonSpecies } from '~/entities/pokemonSpecies';

describe('PokemonSpecies', () => {
  describe('PokemonSpecies.fromJson', () => {
    test('should return an instance of PokemonSpecies', () => {
      const species = PokemonSpecies.fromJson({
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 2,
        generation: {name: 'generation-i'},
        evolution_chain: []
      });

      expect(species).toBeInstanceOf(PokemonSpecies);
    });
  });

  describe('getGenderPercentage', () => {
    test('should return false if the genderRate is -1', () => {
      const species = PokemonSpecies.fromJson({
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: -1,
        generation: {name: 'generation-i'},
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(false);
    });

    test('should return 25 if the genderRate is 2', () => {
      const species = PokemonSpecies.fromJson({
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 2,
        generation: {name: 'generation-i'},
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(25);
    });

    test('should return 100 if the genderRate is 8', () => {
      const species = PokemonSpecies.fromJson({
        is_baby: false,
        flavor_text_entries: [],
        gender_rate: 8,
        generation: {name: 'generation-i'},
        evolution_chain: []
      });

      expect(species.getGenderPercentage()).toEqual(100);
    });
  });
});
