import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeView = ({ children }: { children: React.ReactNode }) => {
  const inset = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: inset.top }}>
      {children}
    </View>
  );
};

export default SafeView;
