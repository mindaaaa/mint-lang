import { ExprVisitor } from './ExprVisitor';

export abstract class Expr {
  abstract accept<Return>(visitor: ExprVisitor<Return>): Return;
}
