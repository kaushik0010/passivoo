// src/app/premium-verification/page.tsx

import { connectDB } from "@/lib/db/connect";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { UserPremiumBundle } from "@/features/premium/models/user-premium-bundle.model";
import { UserPremiumDrop } from "@/features/premium/models/user-premium-drop.model";

export default async function PremiumVerificationPage() {
  await connectDB();

  const authSession = await getCurrentUser();

  if (!authSession?.user?.id) {
    return (
      <div className="p-8">
        <h1>Premium Verification</h1>
        <p>Not authenticated.</p>
      </div>
    );
  }

  const userId = authSession.user.id;

  const purchasedBundles = await UserPremiumBundle.find({
    userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  const ownedDrops = await UserPremiumDrop.find({
    userId,
  })
    .sort({ ownedAt: -1 })
    .lean();

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">
        Premium Purchase Verification
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          UserPremiumBundle Records
        </h2>

        <pre className="overflow-auto border p-4 rounded">
          {JSON.stringify(purchasedBundles, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          UserPremiumDrop Records
        </h2>

        <pre className="overflow-auto border p-4 rounded">
          {JSON.stringify(ownedDrops, null, 2)}
        </pre>
      </div>
    </div>
  );
}