export class Pokemon {
  id: number;
  name: string;
  types: string[];
  frontImage: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.types = json.types;
    this.frontImage = json.frontImage;
  }

  static fromJson(json: any): Pokemon {
    return new Pokemon({
      id: json.id,
      name: json.name,
      frontImage: json.sprites.front_default,
      types: json.types.map((type: any) => type.type.name)
    })
  }
}
