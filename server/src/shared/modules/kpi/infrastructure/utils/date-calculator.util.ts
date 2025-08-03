import { TimePeriod } from '../../../../dto/kpi.dto';

/**
 * Utility for calculating date ranges based on time periods
 */
export class DateCalculator {
  /**
   * Calculate start and end dates for a given time period
   * @param timePeriod - The time period to calculate for
   * @returns Object with current and previous date ranges
   */
  static calculateDateRanges(timePeriod: TimePeriod): {
    currentStartDate: Date;
    currentEndDate: Date;
    previousStartDate: Date;
    previousEndDate: Date;
  } {
    const now = new Date();
    let currentStartDate: Date;
    let previousStartDate: Date;

    switch (timePeriod) {
      case 'last_7_days':
        // Last 7 days: from 7 days ago to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        // Previous 7 days: from 14 days ago to 7 days ago
        previousStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
        break;
      case 'last_30_days':
        // Last 30 days: from 30 days ago to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        // Previous 30 days: from 60 days ago to 30 days ago
        previousStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60);
        break;
      case 'mtd':
        // Month to date: from start of current month to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // Previous month: from start of previous month to end of previous month
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'qtd':
        // Quarter to date: from start of current quarter to now
        const currentQuarter = Math.floor(now.getMonth() / 3);
        currentStartDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        // Previous quarter: from start of previous quarter to end of previous quarter
        const previousQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
        const previousQuarterYear = currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
        previousStartDate = new Date(previousQuarterYear, previousQuarter * 3, 1);
        break;
      case 'ytd':
        // Year to date: from start of current year to now
        currentStartDate = new Date(now.getFullYear(), 0, 1);
        // Previous year: from start of previous year to end of previous year
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      case 'itd':
      default:
        // Inception to date: from beginning of time to now
        currentStartDate = new Date(0); // Beginning of time
        // Previous year: from start of previous year to end of previous year
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
    }

    // Set time to start of day for consistent comparison
    currentStartDate.setHours(0, 0, 0, 0);
    previousStartDate.setHours(0, 0, 0, 0);
    const currentEndDate = new Date(now);
    currentEndDate.setHours(23, 59, 59, 999);
    const previousEndDate = new Date(currentStartDate);
    previousEndDate.setHours(0, 0, 0, 0);

    return {
      currentStartDate,
      currentEndDate,
      previousStartDate,
      previousEndDate,
    };
  }
} 