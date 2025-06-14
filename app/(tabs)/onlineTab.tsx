import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const walletAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
  const solBalance = "1.2345";
  const usdValue = "$45.67";
//urls of logos are some random aigenerated, please replace with actual token logos
  const tokens = [
    { 
      symbol: "SOL", 
      balance: "1.2345", 
      usdValue: "$45.67", 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
    },
    { 
      symbol: "USDC", 
      balance: "100.00", 
      usdValue: "$100.00", 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
    },
    { 
      symbol: "RAY", 
      balance: "25.8", 
      usdValue: "$12.34", 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png"
    },
    { 
      symbol: "BONK", 
      balance: "1,000,000", 
      usdValue: "$8.90", 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png"
    },
  ];

  const styles = createStyles(colorScheme);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#4A90E2' }}
      headerImage={<></>}
    >
      <ThemedView style={styles.walletContainer}></ThemedView>
        <ThemedText type="title" style={styles.walletTitle}>Solana Wallet</ThemedText>
        
        {/* Wallet Address */}
        <ThemedView style={styles.addressContainer}>
          <ThemedText style={styles.addressLabel}>Wallet Address</ThemedText>
          <TouchableOpacity style={styles.addressBox}>
            <ThemedText style={styles.addressText}>
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </ThemedText>
            <IconSymbol name="doc.on.doc.fill" size={16} color={colorScheme === 'dark' ? '#4A90E2' : '#A1CEDC'} />
          </TouchableOpacity>
        </ThemedView>

        {/* Main Balance */}
        <ThemedView style={styles.balanceContainer}>
          <ThemedText style={styles.balanceAmount}>{solBalance} SOL</ThemedText>
          <ThemedText style={styles.balanceUsd}>{usdValue}</ThemedText>
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.up.circle.fill" size={20} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
            <ThemedText style={styles.actionText}>Send</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.down.circle.fill" size={20} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
            <ThemedText style={styles.actionText}>Receive</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={20} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
            <ThemedText style={styles.actionText}>Swap</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Tokens List */}
        <ThemedView style={styles.tokensContainer}>
          <ThemedText type="subtitle" style={styles.tokensTitle}>Tokens</ThemedText>
          {tokens.map((token, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.tokenItem}
            >
              <ThemedView style={styles.tokenLeft}>
                <ThemedView style={styles.tokenIcon}>
                  <Image 
                    source={{ uri: token.logoUrl }}
                    style={styles.tokenLogo}
                    resizeMode="contain"
                  />
                </ThemedView>
                <ThemedView>
                  <ThemedText style={styles.tokenSymbol}>{token.symbol}</ThemedText>
                  <ThemedText style={styles.tokenBalance}>{token.balance}</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.tokenRight}>
                <ThemedText style={styles.tokenUsd}>{token.usdValue}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
    </ParallaxScrollView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark' | null | undefined) => StyleSheet.create({
  walletContainer: {
    flex: 1,
    padding: 20,
  },
  walletTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    fontWeight: 'bold',
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#B0B0B0' : '#666666',
    marginBottom: 8,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#f0f0f0',
    borderWidth: 1,
    borderColor: colorScheme === 'dark' ? '#444444' : '#e0e0e0',
  },
  addressText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  },
  balanceUsd: {
    fontSize: 18,
    color: colorScheme === 'dark' ? '#B0B0B0' : '#666666',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: colorScheme === 'dark' ? '#4A90E2' : '#A1CEDC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  actionText: {
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  tokensContainer: {
    marginTop: 20,
  },
  tokensTitle: {
    marginBottom: 16,
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    fontWeight: 'bold',
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#f0f0f0',
    borderWidth: 1,
    borderColor: colorScheme === 'dark' ? '#444444' : '#e0e0e0',
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: colorScheme === 'dark' ? '#444444' : '#e0e0e0',
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  },
  tokenBalance: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#B0B0B0' : '#666666',
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenUsd: {
    fontSize: 16,
    fontWeight: '500',
    color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
  },
});
