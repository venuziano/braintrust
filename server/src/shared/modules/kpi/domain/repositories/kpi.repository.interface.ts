import { TimePeriod } from '../../../../dto/kpi.dto';

/**
 * Interface for KPI repository operations
 * This can be implemented by any entity that needs KPI functionality
 */
export interface IKpiRepository {
  /**
   * Get KPI data for a given time period
   * @param timePeriod - The time period to calculate KPI for
   * @returns Promise with current and previous counts
   */
  getKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }>;
} 