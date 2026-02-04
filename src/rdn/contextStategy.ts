import { IEstatadosEstrategy, IExecuteData } from "@/interfaces";

export class ContextStrategy {
  private strategy: IEstatadosEstrategy;

  constructor(strategy: IEstatadosEstrategy) {
    this.strategy = strategy;
  }

  public async cambioEstado(data: IExecuteData): Promise<void> {
    await this.strategy.execute(data);
  }
}
