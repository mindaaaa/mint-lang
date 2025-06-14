import { Token } from '@/lexer/Token';
import { TokenType } from '@/lexer/TokenType';
import { Parser } from '@/parser/Parser';
import { Environment } from '@/runtime/Environment';
import { Interpreter } from '@/runtime/Interpreter';

describe('Interpreter 통합 테스트', () => {
  test('plant feeling = "gentle" 실행 시 환경에 변수 저장', () => {
    // given
    const tokens = [
      new Token(TokenType.PLANT, 'plant', null, 1),
      new Token(TokenType.IDENTIFIER, 'feeling', null, 1),
      new Token(TokenType.EQUAL, '=', null, 1),
      new Token(TokenType.STRING, '"gentle"', 'gentle', 1),
      new Token(TokenType.EOF, '', null, 1),
    ];

    const parser = new Parser(tokens);
    const ast = parser.parse();
    const interpreter = new Interpreter();

    // when
    interpreter.interpret(ast);

    // then
    const env = (interpreter as any).environment as Environment;
    const result = env.get('feeling');
    expect(result).toBe('gentle');
  });
});
