import { Pokemon } from '~/entities/pokemon';

describe('Pokemon', () => {
  describe('Pokemon.fromJson', () => {
    test('should return an instance of Pokemon', () => {
      const pokemon = Pokemon.fromJson({
        id: 123,
        name: 'Insécateur',
        types: [
          { type: { name: 'Insecte' } },
          { type: { name: 'Vol' } }
        ],
        sprites: { front_default: '' }
      });

      expect(pokemon).toBeInstanceOf(Pokemon);
    });
  });
});
