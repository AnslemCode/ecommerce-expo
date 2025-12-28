import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import SafeScreen from "../../components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import useProducts from "@/hooks/useProducts";
import ProductsGrid from "@/components/ProductsGrid";

const CATEGORIES = [
  { name: "All", icon: "grid-outline" as const },
  { name: "Electronics", image: require("@/assets/images/electronics.png") },
  { name: "Fashion", image: require("@/assets/images/fashion.png") },
  { name: "Sports", image: require("@/assets/images/sports.png") },
  { name: "Books", image: require("@/assets/images/books.png") },
];

const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: products, isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View className="px-6 pt-6 pb-4">
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-text-primary text-3xl font-bold tracking-tight">
                Shop
              </Text>
              <Text className="mt-1 text-sm text-text-secondary">
                Browse all products
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="rounded-full bg-surface/50 p-3"
            >
              <Ionicons name="options-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* SEARCH */}
          <View className="flex-row items-center rounded-2xl bg-surface px-5 py-3.5">
            <Ionicons name="search" size={22} color="#666" />
            <TextInput
              className="ml-3 flex-1 text-base text-text-primary"
              placeholder="Search for products"
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* CATEGORIES */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;

              return (
                <TouchableOpacity
                  key={category.name}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(category.name)}
                  className={`mr-4 h-20 w-20 items-center justify-center rounded-2xl overflow-hidden ${
                    isSelected ? "bg-primary" : "bg-surface"
                  }`}
                >
                  {category.icon ? (
                    <Ionicons
                      name={category.icon}
                      size={34}
                      color={isSelected ? "#121212" : "#fff"}
                    />
                  ) : (
                    <Image
                      source={category.image}
                      className="h-12 w-12"
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* PRODUCTS */}
        <View className="px-6 pb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-text-primary">
              Products
            </Text>
            <Text className="text-sm text-text-secondary">
              {filteredProducts.length} items
            </Text>
          </View>

          <ProductsGrid
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default ShopScreen;
