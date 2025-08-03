# Shared KPI Infrastructure

This module provides a reusable KPI (Key Performance Indicator) infrastructure that can be used by any entity in the system.

## Overview

The shared KPI infrastructure consists of:
- **DTOs**: Common schemas and types for KPI requests/responses
- **Repository Interface**: Contract for entities that need KPI functionality
- **Base Use Case**: Common logic for calculating KPI metrics
- **Date Calculator**: Utility for calculating date ranges based on time periods

## Quick Start

To add KPI functionality to a new entity, follow these steps:

### 1. Update Repository Interface

Extend your entity's repository interface with the shared KPI interface:

```typescript
import { IKpiRepository } from '../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface';

export interface YourEntityRepository extends IKpiRepository {
  // ... your existing methods
}
```

### 2. Implement Repository Method

Add the `getKpi` method to your repository implementation:

```typescript
import { TimePeriod } from '../../../../shared/dto/kpi.dto';
import { DateCalculator } from '../../../../shared/modules/kpi/infrastructure/utils/date-calculator.util';

async getKpi(timePeriod: TimePeriod): Promise<{
  currentCount: number;
  previousCount: number;
}> {
  const { currentStartDate, currentEndDate, previousStartDate, previousEndDate } = 
    DateCalculator.calculateDateRanges(timePeriod);

  const currentCount = await this.repo.count({
    where: {
      created_at: Between(currentStartDate, currentEndDate),
    },
  });

  const previousCount = await this.repo.count({
    where: {
      created_at: Between(previousStartDate, previousEndDate),
    },
  });

  return { currentCount, previousCount };
}
```

### 3. Create Use Case

Extend the base KPI use case:

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';

@Injectable()
export class GetTotalYourEntityKpiUseCase extends BaseKpiUseCase {
  constructor(
    @Inject(YOUR_ENTITY_REPOSITORY_TOKEN)
    private readonly yourEntityRepo: YourEntityRepository,
  ) {
    super(yourEntityRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    return this.executeBase(request, 'Total Your Entity');
  }
}
```

### 4. Add Controller Route

Add a TRPC route to your controller:

```typescript
import { KpiRequestSchema, KpiResponseSchema } from '../../../../shared/dto/kpi.dto';

createRouter() {
  const protectedProcedure = createProtectedProcedure(this.jwtService);
  
  return t.router({
    getTotalYourEntityKpi: protectedProcedure.admin(this.jwtService)
      .input(KpiRequestSchema)
      .output(KpiResponseSchema)
      .query(({ input }) => this.getTotalYourEntityKpiUseCase.execute(input)),
  });
}
```

## Available Time Periods

The following time periods are supported:
- `last_7_days`: Last 7 days vs previous 7 days
- `last_30_days`: Last 30 days vs previous 30 days
- `mtd`: Month to date vs previous month
- `qtd`: Quarter to date vs previous quarter
- `ytd`: Year to date vs previous year
- `itd`: Inception to date vs previous year

## Response Format

All KPI responses follow this format:

```typescript
{
  label: string;           // e.g., "Total Workflows"
  value: number;           // Current count
  changePercentage: number; // Percentage change (rounded to 2 decimal places)
  changeDirection: 'up' | 'down'; // Direction of change
  timePeriod: TimePeriod;  // The time period used
}
```

## Benefits

- **DRY Principle**: Common KPI logic is shared across entities
- **Type Safety**: Shared types ensure consistency
- **Maintainability**: Changes to KPI logic only need to be made in one place
- **Extensibility**: New entities can easily add KPI functionality
- **Consistency**: All KPIs follow the same calculation and formatting rules 