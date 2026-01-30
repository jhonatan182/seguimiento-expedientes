import { IEstatadosEstrategy } from "@/interfaces";

export class ContextStrategy {
  private strategy: IEstatadosEstrategy;

  constructor(strategy: IEstatadosEstrategy) {
    this.strategy = strategy;
  }

  public cambioEstado(): void {
    this.strategy.execute();
  }
}
