import { TokenType } from './TokenType';

type Literal = number | string | boolean | null;

export class Token {
  constructor(
    public type: TokenType,
    public lexeme: string,
    public literal: Literal,
    public line: number
  ) {}

  toJSON() {
    return {
      type: this.type,
      lexeme: this.lexeme,
      literal: this.literal,
    };
  }
}
