import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  const [meals, setMeals] = useState<any[]>([]);

  // Fetch meals from TheMealDB API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );
        const data = await response.json();
        setMeals(data.meals); // Set meals from API response
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  // Handle item clicks
  const handleItemClick = () => {
    setClickCount(clickCount + 1); // Update click count using context
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Hi {" " + yourName} 👋</Text>
      </View>

      {/* Meals List */}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D3B66", // Ocean Blue
  },
  topBar: {
    height: 60,
    backgroundColor: "#EE6C4D", // Coral
    justifyContent: "center",
    alignItems: "center",
  },
  topBarText: {
    color: "#F4F4F9", // White Sand
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    borderColor: "#3D8361", // Seafoam Green
    borderWidth: 1,
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F4F4F9", // White Sand
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F95738", // Sunset Orange
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#F4F4F9", // White Sand
    fontSize: 18,
    fontWeight: "bold",
  },
});
