import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { createCheckoutSession } from "@/features/premium/actions/create-checkout-session";
import { connectDB } from "@/lib/db/connect";

export default async function PremiumTestPage() {
  await connectDB();
  
  // Explicitly fetch Match 2
  const bundle = await PremiumBundle.findOne({
    matchNumber: 2, 
    isActive: true,
  }).lean();

  if (!bundle) {
    return <div>No bundle found for Match 2</div>;
  }

  const result = await createCheckoutSession({
    bundleId: bundle._id.toString(),
  });

  return (
    <pre>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}