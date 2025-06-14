import { Expr } from './Expr';
import { Stmt } from './Stmt';
import { StmtVisitor } from './StmtVisitor';

export class ExpressionStmt extends Stmt {
  constructor(public expression: Expr) {
    super();
  }

  accept<Return>(visitor: StmtVisitor<Return>): Return {
    return visitor.visitExpressionStmt(this);
  }
}
