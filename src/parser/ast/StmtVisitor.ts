import { ExpressionStmt } from './ExpressionStmt';
import { VarDeclarationStmt } from './VarDeclarationStmt';

export interface StmtVisitor<Return> {
  visitVarDeclarationStmt(stmt: VarDeclarationStmt): Return;
  visitExpressionStmt(stmt: ExpressionStmt): Return;
}
