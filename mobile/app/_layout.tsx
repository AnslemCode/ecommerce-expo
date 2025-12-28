import { Stack } from "expo-router";
import {
  // MutationCache,
  // QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import "../global.css";

// Sentry.init({
//   dsn: "https://fb6731b90610cc08333e6c16ffac5724@o4509813037137920.ingest.de.sentry.io/4510451611205712",

//   // Adds more context data to events (IP address, cookies, user, etc.)
//   // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
//   sendDefaultPii: true,

//   // Enable Logs
//   enableLogs: true,

//   // Configure Session Replay
//   replaysSessionSampleRate: 1.0,
//   replaysOnErrorSampleRate: 1,
//   integrations: [Sentry.mobileReplayIntegration({
// maskAllImages: false, maskAllText: false, maskAllVectors: false
//})],

//   // uncomment the line below to enable Spotlight (https://spotlightjs.com)
//   // spotlight: __DEV__,
// });

const queryClient = new QueryClient({
  // queryCache: new QueryCache({
  //   onError: (error: any, query) => {
  //     Sentry.captureException(error, {
  //       tags: {
  //         type: "react-query-error",
  //         queryKey: query.queryKey[0]?.toString() || "unknown",
  //       },
  //       extra: {
  //         errorMessage: error.message,
  //         statusCode: error.response?.status,
  //         queryKey: query.queryKey,
  //       },
  //     });
  //   },
  // }),
  // mutationCache: new MutationCache({
  //   onError: (error: any) => {
  //     // global error handler for all mutations
  //     Sentry.captureException(error, {
  //       tags: { type: "react-query-mutation-error" },
  //       extra: {
  //         errorMessage: error.message,
  //         statusCode: error.response?.status,
  //       },
  //     });
  //   },
  // }),
});

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        {/* <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        > */}
        <Stack screenOptions={{ headerShown: false }} />
        {/* </StripeProvider> */}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
