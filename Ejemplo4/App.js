import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardWoman from './components/CardWoman';

const URL = "https://68d0b33de6c0cbeb39a23838.mockapi.io/api/v1/data";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para obtener datos, manejando también errores por status HTTP distinto de 200-299
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        // Generamos error si la respuesta no es OK
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Desarrollo de Aplicaciones Móviles</Text>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: 'red', padding: 10 }}>{error}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardWoman woman={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFooterText: {
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageSize: {
    width: 100,
    height: 100,
  },
});
