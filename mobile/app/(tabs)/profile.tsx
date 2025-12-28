import SafeScreen from "@/components/SafeScreen";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

const MENU_ITEMS = [
  {
    id: 1,
    icon: "person-outline",
    title: "Edit Profile",
    color: "#3B82F6",
    action: "/profile",
  },
  {
    id: 2,
    icon: "list-outline",
    title: "Orders",
    color: "#10B981",
    action: "/orders",
  },
  {
    id: 3,
    icon: "location-outline",
    title: "Addresses",
    color: "#F59E0B",
    action: "/addresses",
  },
  {
    id: 4,
    icon: "heart-outline",
    title: "Wishlist",
    color: "#EF4444",
    action: "/wishlist",
  },
] as const;

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleMenuPress = (action: (typeof MENU_ITEMS)[number]["action"]) => {
    if (action !== "/profile") {
      router.push(action);
    }
  };
  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View className="px-6 pt-6 pb-6">
          <View className="rounded-3xl bg-surface p-5">
            <View className="flex-row items-center">
              {/* AVATAR */}
              <View className="relative">
                <Image
                  source={user?.imageUrl}
                  contentFit="cover"
                  transition={200}
                  className="h-20 w-20 rounded-full bg-background-lighter"
                />
                <View className="absolute -bottom-1 -right-1 h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-primary">
                  <Ionicons name="checkmark" size={16} color="#121212" />
                </View>
              </View>

              {/* USER INFO */}
              <View className="ml-4 flex-1">
                <Text className="mb-1 text-2xl font-bold text-text-primary">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-sm text-text-secondary">
                  {user?.emailAddresses?.[0]?.emailAddress || "No email"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* MENU GRID */}
        <View className="mx-6 mb-4 flex-row flex-wrap gap-3">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleMenuPress(item.action)}
              className="flex-1 rounded-2xl bg-surface p-6 items-center justify-center"
            >
              <View
                className="mb-4 h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text className="text-base font-bold text-text-primary">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SETTINGS LINKS */}
        <View className="mx-6 mb-3 rounded-2xl bg-surface p-4">
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-2"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#FFFFFF"
              />
              <Text className="ml-3 font-semibold text-text-primary">
                Notifications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View className="mx-6 mb-4 rounded-2xl bg-surface p-4">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/privacy-security")}
            className="flex-row items-center justify-between py-2"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#FFFFFF"
              />
              <Text className="ml-3 font-semibold text-text-primary">
                Privacy & Security
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* SIGN OUT */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => signOut()}
          className="mx-6 mb-4 flex-row items-center justify-center rounded-2xl border border-red-500/30 bg-surface py-5"
        >
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text className="ml-2 text-base font-bold text-red-500">
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <Text className="mx-6 mb-3 text-center text-xs text-text-secondary">
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeScreen>
  );
};

export default ProfileScreen;
