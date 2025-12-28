import useSocialAuth from "@/hooks/useSocialAuth";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();
  const isLoading = loadingStrategy !== null;

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      {/* DEMO IMAGE */}
      <Image
        source={require("../../assets/images/auth-image.png")}
        className="size-72"
        resizeMode="contain"
      />

      <View className="mt-3 w-full">
        {/* GOOGLE SIGN IN */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          className="mb-4 flex-row items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3"
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {loadingStrategy === "oauth_google" ? (
            <ActivityIndicator size="small" color="#4285f4" />
          ) : (
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/images/google.png")}
                className="mr-3 h-8 w-8"
                resizeMode="contain"
              />
              <Text className="text-base font-medium text-black">
                Continue with Google
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* APPLE SIGN IN */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
          className="flex-row items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3"
          onPress={() => handleSocialAuth("oauth_apple")}
          disabled={isLoading}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {loadingStrategy === "oauth_apple" ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/images/apple.png")}
                className="mr-3 h-8 w-8"
                resizeMode="contain"
              />
              <Text className="text-base font-medium text-black">
                Continue with Apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* TERMS */}
      <Text className="mt-6 px-2 text-center text-xs leading-4 text-gray-500">
        By signing up, you agree to our{" "}
        <Text className="text-blue-500">Terms</Text>,{" "}
        <Text className="text-blue-500">Privacy Policy</Text>, and{" "}
        <Text className="text-blue-500">Cookie Use</Text>
      </Text>
    </View>
  );
}
