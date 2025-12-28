import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

interface ProductsGridProps {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}

const ProductsGrid = ({ isLoading, isError, products }: ProductsGridProps) => {
  const {
    isInWishlist,
    toggleWishlist,
    isAddingToWishlist,
    isRemovingFromWishlist,
  } = useWishlist();

  const { isAddingToCart, addToCart } = useCart();

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          Alert.alert("Added to cart", `${productName} has been added.`);
        },
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error?.response?.data?.error || "Failed to add item"
          );
        },
      }
    );
  };

  const renderProduct = ({ item: product }: { item: Product }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/product/${product._id}`)}
      className="mb-4 flex-1 rounded-3xl bg-surface overflow-hidden"
    >
      {/* IMAGE */}
      <View className="relative">
        <Image
          source={{ uri: product.images[0] }}
          className="h-40 w-full bg-background-lighter"
          resizeMode="cover"
        />

        {/* WISHLIST */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="absolute top-3 right-3 rounded-full bg-black/30 p-2"
          onPress={() => toggleWishlist(product._id)}
          disabled={isAddingToWishlist || isRemovingFromWishlist}
        >
          {isAddingToWishlist || isRemovingFromWishlist ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons
              name={isInWishlist(product._id) ? "heart" : "heart-outline"}
              size={18}
              color={isInWishlist(product._id) ? "#FF6B6B" : "#FFFFFF"}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View className="p-3">
        <Text className="mb-1 text-xs text-text-secondary">
          {product.category}
        </Text>

        <Text
          numberOfLines={2}
          className="mb-2 text-sm font-bold text-text-primary"
        >
          {product.name}
        </Text>

        {/* RATING */}
        <View className="mb-2 flex-row items-center">
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text className="ml-1 text-xs font-semibold text-text-primary">
            {product.averageRating.toFixed(1)}
          </Text>
          <Text className="ml-1 text-xs text-text-secondary">
            ({product.totalReviews})
          </Text>
        </View>

        {/* PRICE + CART */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            className="h-8 w-8 items-center justify-center rounded-full bg-primary"
            onPress={() => handleAddToCart(product._id, product.name)}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <ActivityIndicator size="small" color="#121212" />
            ) : (
              <Ionicons name="add" size={18} color="#121212" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View className="items-center justify-center py-24">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="mt-4 text-text-secondary">Loading products…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="items-center justify-center py-24">
        <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
        <Text className="mt-4 font-semibold text-text-primary">
          Failed to load products
        </Text>
        <Text className="mt-2 text-sm text-text-secondary">
          Please try again later
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ListEmptyComponent={NoProductsFound}
    />
  );
};

export default ProductsGrid;

function NoProductsFound() {
  return (
    <View className="items-center justify-center py-24">
      <Ionicons name="search-outline" size={48} color="#666" />
      <Text className="mt-4 font-semibold text-text-primary">
        No products found
      </Text>
      <Text className="mt-2 text-sm text-text-secondary">
        Try adjusting your filters
      </Text>
    </View>
  );
}
