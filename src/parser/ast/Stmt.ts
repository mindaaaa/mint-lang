import { StmtVisitor } from './StmtVisitor';

export abstract class Stmt {
  abstract accept<Return>(visitor: StmtVisitor<Return>): Return;
}
