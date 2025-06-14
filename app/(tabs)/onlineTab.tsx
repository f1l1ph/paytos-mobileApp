import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const walletAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
  const solBalance = "1.2345";
  const usdValue = "$45.67";

  const tokens = [
    { symbol: "SOL", balance: "1.2345", usdValue: "$45.67", icon: "sun.max.fill" },
    { symbol: "USDC", balance: "100.00", usdValue: "$100.00", icon: "dollarsign.circle.fill" },
    { symbol: "RAY", balance: "25.8", usdValue: "$12.34", icon: "bolt.circle.fill" },
    { symbol: "BONK", balance: "1,000,000", usdValue: "$8.90", icon: "flame.fill" },
  ];

  const isDark = colorScheme === 'dark';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9945FF', dark: '#9945FF' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#14F195"
          name="creditcard.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.walletContainer}>
        <ThemedText type="title" style={styles.walletTitle}>Solana Wallet</ThemedText>
        
        {/* Wallet Address */}
        <ThemedView style={styles.addressContainer}>
          <ThemedText style={styles.addressLabel}>Wallet Address</ThemedText>
          <TouchableOpacity style={[
            styles.addressBox, 
            { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }
          ]}>
            <ThemedText style={styles.addressText}>
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </ThemedText>
            <IconSymbol name="doc.on.doc.fill" size={16} color="#9945FF" />
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
            <IconSymbol name="arrow.up.circle.fill" size={20} color="white" />
            <ThemedText style={styles.actionText}>Send</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.down.circle.fill" size={20} color="white" />
            <ThemedText style={styles.actionText}>Receive</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={20} color="white" />
            <ThemedText style={styles.actionText}>Swap</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Tokens List */}
        <ThemedView style={styles.tokensContainer}>
          <ThemedText type="subtitle" style={styles.tokensTitle}>Tokens</ThemedText>
          {tokens.map((token, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.tokenItem,
                { backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9' }
              ]}
            >
              <ThemedView style={styles.tokenLeft}>
                <ThemedView style={[
                  styles.tokenIcon,
                  { backgroundColor: isDark ? '#3a3a3a' : '#f0f0f0' }
                ]}>
                  <IconSymbol name={token.icon} size={24} color="#9945FF" />
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
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  walletContainer: {
    flex: 1,
    padding: 20,
  },
  walletTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#9945FF',
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  addressText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9945FF',
  },
  balanceUsd: {
    fontSize: 18,
    opacity: 0.7,
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#9945FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  actionText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  tokensContainer: {
    marginTop: 20,
  },
  tokensTitle: {
    marginBottom: 16,
    color: '#9945FF',
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
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
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  tokenBalance: {
    fontSize: 14,
    opacity: 0.7,
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenUsd: {
    fontSize: 16,
    fontWeight: '500',
  },
});
