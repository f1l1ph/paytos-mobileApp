import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, PaytosColors } from '@/constants/Colors';
import { useAppContext } from '@/hooks/useAppContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function WalletScreen() {
  const colorScheme = useColorScheme();
  const { balance } = useAppContext();
  const [showBalance, setShowBalance] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const walletAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
  const totalUSDValue = (balance.SOL * 43.50) + balance.USDC + balance.USDT + balance.PYUSD;
  
  const tokens = [
    { 
      symbol: "SOL", 
      balance: balance.SOL.toFixed(4), 
      usdValue: `$${(balance.SOL * 43.50).toFixed(2)}`, 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      change: "+2.34%",
      changePositive: true
    },
    { 
      symbol: "USDC", 
      balance: balance.USDC.toFixed(2), 
      usdValue: `$${balance.USDC.toFixed(2)}`, 
      logoUrl: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      change: "0.00%",
      changePositive: true
    },
    { 
      symbol: "USDT", 
      balance: balance.USDT.toFixed(2), 
      usdValue: `$${balance.USDT.toFixed(2)}`, 
      logoUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/825.png",
      change: "+0.01%",
      changePositive: true
    },
    { 
      symbol: "PYUSD", 
      balance: balance.PYUSD.toFixed(2), 
      usdValue: `$${balance.PYUSD.toFixed(2)}`, 
      logoUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/27772.png",
      change: "+0.12%",
      changePositive: true
    },
  ];

  const defiPositions = [
    {
      protocol: 'Raydium',
      position: 'SOL-USDC LP',
      value: '$125.50',
      apy: '12.5%',
    },
    {
      protocol: 'Marinade',
      position: 'mSOL Staking',
      value: '$89.25',
      apy: '7.2%',
    }
  ];

  const styles = createStyles(colorScheme);

  const copyAddress = () => {
    Alert.alert('Address Copied', 'Wallet address copied to clipboard');
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const executeAction = () => {
    Alert.alert('Transaction Submitted', `${selectedAction} transaction has been submitted to the blockchain.`);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerTop}>
          <ThemedView style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <ThemedText style={styles.brandName} selectable={false}>Paytos</ThemedText>
          </ThemedView>
          <TouchableOpacity style={styles.settingsButton}>
            <IconSymbol name="gearshape.fill" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        </ThemedView>
        

      </ThemedView>

      {/* Wallet Address */}
      <ThemedView style={styles.addressContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <ThemedText style={styles.addressLabel}>Wallet Address</ThemedText>
                  <TouchableOpacity style={[styles.addressBox, { backgroundColor: '#ffffff' }]} onPress={copyAddress}>
          <ThemedText style={styles.addressText}>
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
          </ThemedText>
          <IconSymbol name="doc.on.doc.fill" size={16} color={PaytosColors.blue} />
        </TouchableOpacity>
      </ThemedView>

      {/* Main Balance */}
      <ThemedView style={styles.balanceContainer} lightColor="#ffffff" darkColor={Colors.dark.card}>
        <TouchableOpacity 
          style={styles.balanceHeader}
          onPress={() => setShowBalance(!showBalance)}
        >
          <ThemedText style={styles.balanceLabel} selectable={false}>Total Balance</ThemedText>
          <IconSymbol 
            name={showBalance ? "eye.fill" : "eye.slash.fill"} 
            size={16} 
            color={Colors[colorScheme ?? 'light'].icon} 
          />
        </TouchableOpacity>
        
        {showBalance ? (
          <>
            <ThemedText style={styles.balanceAmount} selectable={false}>${totalUSDValue.toFixed(2)}</ThemedText>
            <ThemedText style={styles.balanceChange} selectable={false}>+$12.34 (2.1%) today</ThemedText>
          </>
        ) : (
          <ThemedText style={styles.balanceAmount} selectable={false}>••••••</ThemedText>
        )}
      </ThemedView>

      {/* Action Buttons */}
      <ThemedView style={styles.actionsContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleAction('Send')}
        >
          <ThemedView style={styles.actionIconContainer} lightColor={PaytosColors.blue} darkColor={PaytosColors.blue}>
            <IconSymbol name="arrow.up" size={20} color="#fff" />
          </ThemedView>
          <ThemedText style={styles.actionText} selectable={false}>Send</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleAction('Receive')}
        >
          <ThemedView style={styles.actionIconContainer} lightColor={PaytosColors.blue} darkColor={PaytosColors.blue}>
            <IconSymbol name="arrow.down" size={20} color="#fff" />
          </ThemedView>
          <ThemedText style={styles.actionText} selectable={false}>Receive</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleAction('Swap')}
        >
          <ThemedView style={styles.actionIconContainer} lightColor={PaytosColors.blue} darkColor={PaytosColors.blue}>
            <IconSymbol name="arrow.triangle.2.circlepath" size={20} color="#fff" />
          </ThemedView>
          <ThemedText style={styles.actionText} selectable={false}>Swap</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleAction('Stake')}
        >
          <ThemedView style={styles.actionIconContainer} lightColor={PaytosColors.blue} darkColor={PaytosColors.blue}>
            <IconSymbol name="bolt.fill" size={20} color="#fff" />
          </ThemedView>
          <ThemedText style={styles.actionText} selectable={false}>Stake</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Tokens List */}
      <ThemedView style={styles.tokensContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
                  <ThemedView style={styles.tokensHeader} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
          <ThemedText style={styles.tokensTitle} selectable={false}>Assets</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.manageButton}>Manage</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {tokens.map((token, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.tokenItem, { backgroundColor: '#ffffff' }]}
            onPress={() => Alert.alert('Token Details', `View ${token.symbol} details and transaction history`)}
          >
            <ThemedView style={styles.tokenLeft} lightColor="#ffffff" darkColor={Colors.dark.card}>
              <ThemedView style={styles.tokenIcon}>
                <Image 
                  source={{ uri: token.logoUrl }}
                  style={styles.tokenLogo}
                  resizeMode="contain"
                />
              </ThemedView>
              <ThemedView lightColor="#ffffff" darkColor={Colors.dark.card}>
                <ThemedText style={styles.tokenSymbol} selectable={false}>{token.symbol}</ThemedText>
                <ThemedText style={styles.tokenBalance} selectable={false}>
                  {showBalance ? token.balance : '••••••'}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.tokenRight} lightColor="#ffffff" darkColor={Colors.dark.card}>
              <ThemedText style={styles.tokenUsd} selectable={false}>
                {showBalance ? token.usdValue : '••••••'}
              </ThemedText>
              <ThemedText style={[
                styles.tokenChange,
                { color: token.changePositive ? Colors[colorScheme ?? 'light'].success : Colors[colorScheme ?? 'light'].error }
              ]} selectable={false}>
                {showBalance ? token.change : '•••••'}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* DeFi Positions */}
      <ThemedView style={styles.sectionContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <ThemedView style={styles.sectionHeader} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
          <ThemedText style={styles.sectionTitle} selectable={false}>DeFi Positions</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.seeAllButton} selectable={false}>See All</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {defiPositions.map((position, index) => (
          <TouchableOpacity key={index} style={[styles.defiItem, { backgroundColor: '#ffffff' }]}>
            <ThemedView style={styles.defiLeft} lightColor="#ffffff" darkColor={Colors.dark.card}>
              <ThemedView style={styles.defiIcon}>
                <ThemedText style={styles.defiIconText} selectable={false}>🏦</ThemedText>
              </ThemedView>
              <ThemedView lightColor="#ffffff" darkColor={Colors.dark.card}>
                <ThemedText style={styles.defiProtocol} selectable={false}>{position.protocol}</ThemedText>
                <ThemedText style={styles.defiPosition} selectable={false}>{position.position}</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.defiRight} lightColor="#ffffff" darkColor={Colors.dark.card}>
              <ThemedText style={styles.defiValue} selectable={false}>{position.value}</ThemedText>
              <ThemedText style={styles.defiApy} selectable={false}>{position.apy} APY</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Recent Activity */}
      <ThemedView style={styles.activityContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <ThemedView style={styles.activityHeader} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
          <ThemedText style={styles.activityTitle} selectable={false}>Recent Activity</ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.viewAllButton} selectable={false}>View All</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={[styles.activityItem, { backgroundColor: '#ffffff' }]}>
          <ThemedView style={styles.activityIcon}>
            <IconSymbol name="arrow.up" size={16} color={Colors[colorScheme ?? 'light'].warning} />
          </ThemedView>
          <ThemedView style={styles.activityDetails} lightColor="#ffffff" darkColor={Colors.dark.card}>
            <ThemedText style={styles.activityAction} selectable={false}>Sent USDC</ThemedText>
            <ThemedText style={styles.activityTime} selectable={false}>2 hours ago</ThemedText>
          </ThemedView>
          <ThemedText style={styles.activityAmount} selectable={false}>-$25.00</ThemedText>
        </ThemedView>
        
        <ThemedView style={[styles.activityItem, { backgroundColor: '#ffffff' }]}>
          <ThemedView style={styles.activityIcon}>
            <IconSymbol name="arrow.down" size={16} color={Colors[colorScheme ?? 'light'].success} />
          </ThemedView>
          <ThemedView style={styles.activityDetails} lightColor="#ffffff" darkColor={Colors.dark.card}>
            <ThemedText style={styles.activityAction} selectable={false}>Received SOL</ThemedText>
            <ThemedText style={styles.activityTime} selectable={false}>1 day ago</ThemedText>
          </ThemedView>
          <ThemedText style={styles.activityAmount} selectable={false}>+0.5 SOL</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Advanced Toggle */}
      <TouchableOpacity 
        style={styles.advancedToggle}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <ThemedText style={styles.advancedText}>Advanced Features</ThemedText>
        <IconSymbol 
          name={showAdvanced ? "chevron.up" : "chevron.down"} 
          size={16} 
          color={Colors[colorScheme ?? 'light'].icon} 
        />
      </TouchableOpacity>

      {showAdvanced && (
        <ThemedView style={styles.advancedContainer}>
          <TouchableOpacity style={styles.advancedButton}>
            <IconSymbol name="gear" size={20} color={PaytosColors.blue} />
            <ThemedText style={styles.advancedButtonText}>Transaction Settings</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.advancedButton}>
            <IconSymbol name="chart.bar" size={20} color={PaytosColors.blue} />
            <ThemedText style={styles.advancedButtonText}>Portfolio Analytics</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.advancedButton}>
            <IconSymbol name="doc.text" size={20} color={PaytosColors.blue} />
            <ThemedText style={styles.advancedButtonText}>Transaction History</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* Modal for actions */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>{selectedAction}</ThemedText>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <IconSymbol name="xmark" size={20} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          </ThemedView>

          <ScrollView style={styles.modalContent}>
            {selectedAction === 'Send' && (
              <ThemedView style={styles.formContainer}>
                <ThemedText style={styles.inputLabel}>Recipient Address</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Solana address"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
                
                <ThemedText style={styles.inputLabel}>Amount</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
                
                <ThemedText style={styles.inputLabel}>Token</ThemedText>
                <TouchableOpacity style={styles.tokenSelector}>
                  <ThemedText style={styles.tokenSelectorText}>USDC</ThemedText>
                  <IconSymbol name="chevron.down" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                </TouchableOpacity>
              </ThemedView>
            )}

            {selectedAction === 'Swap' && (
              <ThemedView style={styles.formContainer}>
                <ThemedText style={styles.inputLabel}>From</ThemedText>
                <TouchableOpacity style={styles.tokenSelector}>
                  <ThemedText style={styles.tokenSelectorText}>SOL</ThemedText>
                  <IconSymbol name="chevron.down" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                </TouchableOpacity>
                
                <ThemedView style={styles.swapIconContainer}>
                  <IconSymbol name="arrow.up.arrow.down" size={20} color={PaytosColors.blue} />
                </ThemedView>
                
                <ThemedText style={styles.inputLabel}>To</ThemedText>
                <TouchableOpacity style={styles.tokenSelector}>
                  <ThemedText style={styles.tokenSelectorText}>USDC</ThemedText>
                  <IconSymbol name="chevron.down" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                </TouchableOpacity>
                
                <TextInput
                  style={styles.input}
                  placeholder="Amount to swap"
                  keyboardType="numeric"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </ThemedView>
            )}

            <TouchableOpacity style={styles.executeButton} onPress={executeAction}>
              <ThemedText style={styles.executeButtonText}>Execute {selectedAction}</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </Modal>

      {/* Footer Padding */}
      <ThemedView style={{ height: 100 }} />
    </ScrollView>
  );
}

const createStyles = (colorScheme: 'light' | 'dark' | null | undefined) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
  },
  header: {
    padding: 20,
    paddingTop: 70, // Increased padding to prevent cutoff
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // Increased margin
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PaytosColors.blue,
  },
  settingsButton: {
    padding: 8,
  },
  networkIndicator: {
    fontSize: 12,
    color: Colors[colorScheme ?? 'light'].icon,
    fontWeight: '500',
  },
  addressContainer: {
    marginHorizontal: 20,
    marginBottom: 16, // Reduced from 20 to move up
    marginTop: -8, // Add negative top margin to move up further
  },
  addressLabel: {
    fontSize: 12,
    color: Colors[colorScheme ?? 'light'].icon,
    marginBottom: 8,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  addressText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].text,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  balanceContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24, // Reduced from 30 to move up
    padding: 20,
    paddingTop: 24, // Extra top padding to prevent cutoff
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 4,
    marginTop: -4, // Reduce gap between label and amount
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
    backgroundColor: 'transparent',
    lineHeight: 40,
  },
  balanceChange: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].success,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 24, // Reduced from 30 to move up
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PaytosColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: Colors[colorScheme ?? 'light'].text,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  tokensContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  tokensHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokensTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  manageButton: {
    fontSize: 14,
    color: PaytosColors.blue,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tokenLogo: {
    width: 28,
    height: 28,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  tokenBalance: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  tokenRight: {
    alignItems: 'flex-end',
  },
  tokenUsd: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  tokenChange: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  seeAllButton: {
    fontSize: 14,
    color: PaytosColors.blue,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  defiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  defiLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  defiIconText: {
    fontSize: 20,
  },
  defiProtocol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  defiPosition: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  defiRight: {
    alignItems: 'flex-end',
  },
  defiValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  defiApy: {
    fontSize: 12,
    color: Colors[colorScheme ?? 'light'].success,
    fontWeight: '500',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  activityContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  viewAllButton: {
    fontSize: 14,
    color: PaytosColors.blue,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  activityTime: {
    fontSize: 12,
    color: Colors[colorScheme ?? 'light'].icon,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
    marginBottom: 16,
  },
  advancedText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors[colorScheme ?? 'light'].text,
  },
  advancedContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  advancedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
    marginBottom: 8,
    gap: 12,
  },
  advancedButtonText: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].text,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors[colorScheme ?? 'light'].border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    gap: 16,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
  },
  input: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
    fontSize: 16,
    color: Colors[colorScheme ?? 'light'].text,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  tokenSelectorText: {
    fontSize: 16,
    color: Colors[colorScheme ?? 'light'].text,
    fontWeight: '500',
  },
  swapIconContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  executeButton: {
    backgroundColor: PaytosColors.blue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  executeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
