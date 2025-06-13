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
    expect(tokens[0].type).toBe(TokenType.PLANT);
    expect(tokens[1].lexeme).toBe('feeling');
    expect(tokens[2].type).toBe(TokenType.EQUAL);
    expect(tokens[3].literal).toBe('gentle');
    expect(tokens[4].type).toBe(TokenType.EOF);
  });
});
