import { VarDeclarationStmt } from './VarDeclarationStmt';

export interface StmtVisitor<Return> {
  visitVarDeclarationStmt(stmt: VarDeclarationStmt): Return;
}
