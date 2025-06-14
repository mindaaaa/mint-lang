import { TokenType } from '@/lexer/TokenType';
import { Token } from '@/lexer/Token';
import { Parser } from '@/parser/Parser';

describe('Parser 클래스', () => {
  test('plant feeling = "gentle" 문장을 AST로 파싱한다', () => {
    // given
    const tokens = [
      new Token(TokenType.PLANT, 'plant', null, 1),
      new Token(TokenType.IDENTIFIER, 'feeling', null, 1),
      new Token(TokenType.EQUAL, '=', null, 1),
      new Token(TokenType.STRING, '"gentle"', 'gentle', 1),
      new Token(TokenType.EOF, '', null, 1),
    ];
    const parser = new Parser(tokens);

    // when
    const ast = parser.parse();

    // then
    expect(ast.length).toBe(1);
    expect(stmt.name.lexeme).toBe('feeling');
    expect((stmt.initializer as LiteralExpr).value).toBe('gentle');
  });
});
