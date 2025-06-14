import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

export default function HomeScreen() {
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const colorScheme = useColorScheme();

  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Paytos</ThemedText>
        <ThemedView style={styles.subtitleContainer}></ThemedView>
          <ThemedText style={styles.subtitle}>Pay tokens over SMS</ThemedText>
          <Image 
            source={{ uri: 'https://cryptologos.cc/logos/solana-sol-logo.png' }}
            style={styles.solanaLogo}
            resizeMode="contain"
          />
      </ThemedView>

      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setSendOpen(!sendOpen)}
        >
          <ThemedText style={styles.tabText}>Send</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setReceiveOpen(!receiveOpen)}
        >
          <ThemedText style={styles.tabText}>Receive</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      {sendOpen && (
        <ThemedView style={styles.popup}>
          <ThemedText style={styles.popupTitle}>Send Money</ThemedText>
          <ThemedText style={styles.popupText}>Enter recipient details and amount to send money.</ThemedText>
          <ThemedText style={styles.popupText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</ThemedText>
        </ThemedView>
      )}
      
      {receiveOpen && (
        <ThemedView style={styles.popup}>
          <ThemedText style={styles.popupTitle}>Receive Money</ThemedText>
          <ThemedText style={styles.popupText}>Share your details to receive money from others.</ThemedText>
          <ThemedText style={styles.popupText}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark' | null | undefined) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colorScheme === 'dark' ? '#B0B0B0' : '#666666',
  },
  solanaLogo: {
    width: 24,
    height: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colorScheme === 'dark' ? '#4A90E2' : '#A1CEDC',
  },
  tabText: {
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    fontWeight: '600',
  },
  popup: {
    backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    gap: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: colorScheme === 'dark' ? '#444444' : '#e0e0e0',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  },
  popupText: {
    color: colorScheme === 'dark' ? '#E0E0E0' : '#333333',
    lineHeight: 20,
  },
});
