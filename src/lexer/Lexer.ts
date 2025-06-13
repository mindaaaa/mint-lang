import { TokenType } from './TokenType';
import { Token } from './Token';

export class Lexer {
  private tokens: Token[] = [];
  private start = 0;
  private current = 0;
  private line = 1;

  constructor(private source: string) {}

  private static keywords: Record<string, TokenType> = {
    plant: TokenType.PLANT,
  };

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(new Token(TokenType.EOF, '', null, this.line));
    return this.tokens;
  }

  private scanToken(): void {
    const char = this.advance();
    switch (char) {
      case '=':
        this.addToken(TokenType.EQUAL);
        break;
      case '"':
        this.string();
        break;
      case ' ':
      case '\r':
      case '\t':
        break;
      case '\n':
        this.line++;
        break;
      default:
        if (this.isAlpha(char)) {
          this.identifier();
        } else {
          throw new Error(
            `Unexpected character '${char}' at line ${this.line}`
          );
        }
    }
  }

  private identifier() {
    while (this.isAlphaNumeric(this.peek())) this.advance();

    const text = this.source.substring(this.start, this.current);
    const type = Lexer.keywords[text] ?? TokenType.IDENTIFIER;
    this.addToken(type);
  }

  private string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') this.line++;
      this.advance();
    }

    if (this.isAtEnd()) throw new Error('Unterminated string.');

    this.advance();
    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  private advance(): string {
    return this.source[this.current++];
  }

  private peek(): string {
    return this.isAtEnd() ? '\0' : this.source[this.current];
  }

  private isAlpha(c: string): boolean {
    return /^[a-zA-Z_]$/.test(c);
  }

  private isAlphaNumeric(c: string): boolean {
    return /^[a-zA-Z0-9_]$/.test(c);
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private addToken(type: TokenType, literal: any = null): void {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(type, text, literal, this.line));
  }
}
