import { LiteralExpr } from './LiteralExpr';

export interface ExprVisitor<Return> {
  visitLiteralExpr(expr: LiteralExpr): Return;
}

export abstract class Expr {
  abstract accept<Return>(visitor: ExprVisitor<Return>): Return;
}
