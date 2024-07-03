import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";

// import { orders } from "@wix/ecom";

// import { members } from "@wix/members";

export const wixClientServer = async () => {
  let refreshToken;
  const { cookies } = await import("next/headers");

  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
  } catch (e) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
