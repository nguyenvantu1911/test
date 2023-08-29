import { FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=26763d7bf2e94098192e629eb975dab0&page=1"
    )
        .then((response) => response.json())
        .then((data) => {
          setData(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
    );
  }
  return (
      <View style={styles.container}>
        <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.bgimageContainer}>
                    <ImageBackground
                        source={{
                          uri: "https://image.tmdb.org/t/p/original" + item.backdrop_path,
                        }}
                        style={styles.bgimage}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>{item.vote_average}</Text>
                      </View>
                      <View style={styles.textContainern}>
                        <Text style={styles.yearText}>{item.release_date}</Text>
                        <Text style={styles.titleText}>{item.title}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
            )}
            onRefresh={fetchData}
            refreshing={isLoading}
        />
      </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  bgimageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
  },
  bgimage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    margin: 13,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  textContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
  textContainern: {
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,

  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  yearText: {
    fontSize: 16,
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});