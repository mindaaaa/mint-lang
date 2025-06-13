import { Lexer } from '../lexer/Lexer';
import { TokenType } from '../lexer/TokenType';

describe('Lexer 테스트', () => {
  test('plant feeling = "gentle" 을 토큰으로 분리한다', () => {
    // given
    const source = `plant feeling = "gentle"`;

    // when
    const lexer = new Lexer(source);
    const tokens = lexer.scanTokens();

    // then
    const expected = [
      { type: TokenType.PLANT, lexeme: 'plant', literal: null },
      { type: TokenType.IDENTIFIER, lexeme: 'feeling', literal: null },
      { type: TokenType.EQUAL, lexeme: '=', literal: null },
      { type: TokenType.STRING, lexeme: '"gentle"', literal: 'gentle' },
      { type: TokenType.EOF, lexeme: '', literal: null },
    ];

    expected.forEach((expectedToken, index) => {
      const actual = tokens[index].toJSON();
      expect(actual.type).toBe(expectedToken.type);
      expect(actual.lexeme).toBe(expectedToken.lexeme);
      expect(actual.literal).toBe(expectedToken.literal);
    });
  });
});
