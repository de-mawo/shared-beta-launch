import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Questions } from '@/components/home/questions';
import WhyUseCase from '@/components/usecases/why-usecase';
import HeroUseCase from '@/components/usecases/hero-usecase';
import HowItWorksUseCase from '@/components/usecases/hiw-usecase';
import PricingUseCase from '@/components/usecases/pricing-usecase';
import FeatureUseCase from '@/components/usecases/features-usecase';
import { weddingQuestionsList } from '../../../../lib/data/use-cases-faq';

export default async function CorporateEventsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="min-h-screen bg-white">
      <HeroUseCase
        session={session}
        heroHeading1="Boost Your Corporate Events"
        heroHeading2="with Shared Memories"
        heroText1="Boost your corporate events with our straightforward digital albums. Share memories effortlessly with a QR code or link, and relish in a live photo stream on your photo wall."
        image="/img/corporate-use-case.jpg"
      />
      <HowItWorksUseCase />
      <FeatureUseCase />
      <PricingUseCase session={session} />
      <WhyUseCase />
      <section className="mx-auto bg-white">
        <Questions questions={weddingQuestionsList} />
      </section>
    </div>
  );
}
