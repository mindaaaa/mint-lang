import { Token } from '@/lexer/Token';
import { Stmt } from './Stmt';
import { Expr } from './Expr';
import { StmtVisitor } from './StmtVisitor';

export class VarDeclarationStmt extends Stmt {
  constructor(public name: Token, public initializer: Expr) {
    super();
  }

  accept<Return>(visitor: StmtVisitor<Return>): Return {
    return visitor.visitVarDeclarationStmt(this);
  }
}
