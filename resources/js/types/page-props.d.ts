import { Subscription } from '@/types';
import { PageProps } from '@inertiajs/core';

export interface SubscriptionPageProps extends PageProps {
  subscriptions: Subscription[];
  [key: string]: unknown; // 👈 This allows extra props
}
