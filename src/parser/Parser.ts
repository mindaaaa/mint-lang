import { Token } from '@/lexer/Token';
import { Stmt } from './ast/Stmt';
import { TokenType } from '@/lexer/TokenType';
import { VarDeclarationStmt } from './ast/VarDeclarationStmt';
import { LiteralExpr } from './ast/LiteralExpr';
import { ExpressionStmt } from './ast/ExpressionStmt';

export class Parser {
  private current = 0;
  constructor(private tokens: Token[]) {}

  parse(): Stmt[] {
    const statements: Stmt[] = [];

    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }
    return statements;
  }

  private declaration(): Stmt {
    if (this.match(TokenType.PLANT)) return this.varDeclaration();
    return this.expressionStatement();
  }

  private expressionStatement(): Stmt {
    const expr = new LiteralExpr('구현 중🔨');
    return new ExpressionStmt(expr);
  }

  private varDeclaration(): Stmt {
    const name = this.consume(TokenType.IDENTIFIER, '변수 이름이 필요합니다.');
    this.consume(TokenType.EQUAL, "'=' 기호가 필요합니다.");
    const valueToken = this.advance();
    const value = new LiteralExpr(valueToken.literal);

    return new VarDeclarationStmt(name, value);
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), message);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private error(token: Token, message: string): Error {
    return new Error(`[라인 ${token.line}] 오류: ${message}`);
  }
}
