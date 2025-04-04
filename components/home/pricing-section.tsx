'use client';

import { AuthSession } from '@/types';
import PricingCards from './pricing-cards';
import { polarPlans } from '@/lib/data/pricing-data';

export default function PricingSection({
  session,
}: {
  session: AuthSession | null;
}) {
  return (
    <div className="bg-gray-50 py-12 md:py-24 lg:py-32" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-text-primary mb-8 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Features and pricing
        </h1>
        <p className="text-md mb-12 text-center text-gray-500 md:text-xl">
          Choose the plan that&apos;s right for you.
        </p>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PricingCards plans={polarPlans} session={session} />
        </div>
      </div>
    </div>
  );
}
