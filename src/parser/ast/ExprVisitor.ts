import { LiteralExpr } from './LiteralExpr';

export interface ExprVisitor<Return> {
  visitLiteralExpr(expr: LiteralExpr): Return;
}
