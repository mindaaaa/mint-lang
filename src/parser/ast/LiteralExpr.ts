import { Expr } from './Expr';
import { ExprVisitor } from './ExprVisitor';

type Literal = string | number | boolean | null;

export class LiteralExpr extends Expr {
  constructor(public value: Literal) {
    super();
  }

  accept<Return>(visitor: ExprVisitor<Return>): Return {
    return visitor.visitLiteralExpr(this);
  }
}
