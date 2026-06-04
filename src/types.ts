/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReservationDetails {
  reservationId: string;
  email: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  region: string;
  batch: string;
  deposit: string;
  dataPolicy: string;
}

export interface TimelineStep {
  id: number;
  label: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  detailedText: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface AnalyticsEvent {
  timestamp: string;
  eventName: string;
  parameters: Record<string, string | number | boolean>;
}
