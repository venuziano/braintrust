import { KpiRequest, KpiResponse, TimePeriod } from '../../../../dto/kpi.dto';
import { IKpiRepository } from '../../domain/repositories/kpi.repository.interface';

/**
 * Base KPI use case that can be extended by any entity
 * Provides common KPI calculation logic
 */
export abstract class BaseKpiUseCase {
  constructor(protected readonly kpiRepo: IKpiRepository) {}

  /**
   * Execute KPI calculation with common logic
   * @param request - KPI request with time period
   * @param label - The label for the KPI (e.g., "Total Workflows", "Total Clients")
   * @returns Promise with formatted KPI response
   */
  protected async executeBase(
    request: KpiRequest, 
    label: string
  ): Promise<KpiResponse> {
    const { currentCount, previousCount } = await this.kpiRepo.getKpi(request.timePeriod);
    
    const changePercentage = previousCount === 0 
      ? currentCount > 0 ? 100 : 0
      : ((currentCount - previousCount) / previousCount) * 100;
    
    const changeDirection = changePercentage >= 0 ? 'up' : 'down';
    
    return {
      label,
      value: currentCount,
      changePercentage: Math.round(Math.abs(changePercentage) * 100) / 100, // Round to 2 decimal places
      changeDirection,
      timePeriod: request.timePeriod,
    };
  }
} 