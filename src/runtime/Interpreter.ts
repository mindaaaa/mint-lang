import { Expr } from '@/parser/ast/Expr';
import { Stmt } from '@/parser/ast/Stmt';
import { ExprVisitor } from '@/parser/ast/ExprVisitor';
import { StmtVisitor } from '@/parser/ast/StmtVisitor';
import { Environment } from './Environment';
import { ExpressionStmt } from '../parser/ast/ExpressionStmt';
import { VarDeclarationStmt } from '../parser/ast/VarDeclarationStmt';
import { LiteralExpr } from '../parser/ast/LiteralExpr';

export class Interpreter implements ExprVisitor<any>, StmtVisitor<void> {
  private environment = new Environment();

  interpret(statements: Stmt[]): void {
    try {
      for (const stmt of statements) {
        this.execute(stmt);
      }
    } catch (error) {
      console.error('런타임 오류:', error);
    }
  }

  private execute(stmt: Stmt): void {
    stmt.accept(this);
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }

  visitVarDeclarationStmt(stmt: VarDeclarationStmt): void {
    const value = this.evaluate(stmt.initializer);
    this.environment.define(stmt.name.lexeme, value);
  }
  visitExpressionStmt(stmt: ExpressionStmt): void {
    this.evaluate(stmt.expression);
  }

  visitLiteralExpr(expr: LiteralExpr): any {
    return expr.value;
  }
}
