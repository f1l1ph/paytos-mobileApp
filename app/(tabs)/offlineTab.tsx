import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, PaytosColors } from '@/constants/Colors';
import { useAppContext } from '@/hooks/useAppContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Clipboard from 'expo-clipboard';
import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PAYTOS_SMS_NUMBER = '+1234567890'; // Replace with actual Paytos SMS number

export default function OfflineTab() {
  const colorScheme = useColorScheme();
  const { balance } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [pin, setPin] = useState('');

  const styles = createStyles(colorScheme);

  const sendSMS = async (message: string) => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          [PAYTOS_SMS_NUMBER],
          message,
        );
        
        if (result === 'sent') {
          Alert.alert('SMS Sent', 'Your transaction request has been sent successfully!');
        } else if (result === 'cancelled') {
          Alert.alert('SMS Cancelled', 'SMS sending was cancelled. The message has been copied to your clipboard for manual sending.');
          await copyToClipboard(message);
        } else {
          Alert.alert('SMS Failed', 'Failed to send SMS. The message has been copied to your clipboard.');
          await copyToClipboard(message);
        }
      } else {
        Alert.alert('SMS Not Available', 'SMS is not available on this device. The message has been copied to your clipboard.');
        await copyToClipboard(message);
      }
    } catch (error) {
      console.error('SMS Error:', error);
      Alert.alert('Error', 'Failed to send SMS. The message has been copied to your clipboard.');
      await copyToClipboard(message);
    }
  };

  const copyToClipboard = async (message: string) => {
    await Clipboard.setStringAsync(message);
    Alert.alert('Copied', 'SMS message copied to clipboard. You can paste it in your messages app.');
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setModalVisible(true);
    // Reset form
    setRecipientPhone('');
    setAmount('');
    setPin('');
  };

  const generateSMSMessage = () => {
    switch (selectedAction) {
      case 'register':
        return `REGISTER ${pin}`;
      case 'balance':
        return `BALANCE ${pin}`;
      case 'send':
        return `SEND ${recipientPhone} ${amount} ${selectedToken} ${pin}`;
      default:
        return '';
    }
  };

  const executeSMSAction = () => {
    const message = generateSMSMessage();
    if (message) {
      sendSMS(message);
      setModalVisible(false);
    }
  };

  const actionButtons = [
    {
      id: 'register',
      title: 'Register Wallet',
      description: 'Create a new SMS wallet',
      icon: 'person.badge.plus',
      color: Colors[colorScheme ?? 'light'].success,
    },
    {
      id: 'balance',
      title: 'Check Balance',
      description: 'View your current balance',
      icon: 'chart.line.uptrend.xyaxis',
      color: PaytosColors.blue,
    },
    {
      id: 'send',
      title: 'Send Money',
      description: 'Send tokens to another phone',
      icon: 'arrow.up.circle.fill',
      color: Colors[colorScheme ?? 'light'].warning,
    },
  ];

  const tokenOptions = ['SOL', 'USDC', 'USDT', 'PYUSD'];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <ThemedView style={styles.headerTop} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
          <ThemedView style={styles.logoContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
            <Image 
              source={require('@/assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <ThemedText style={styles.brandName} selectable={false}>Paytos</ThemedText>
          </ThemedView>
          <ThemedView style={styles.rightSection} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
            <ThemedView style={styles.offlineIndicator}>
              <ThemedView style={styles.offlineDot} />
              <ThemedText style={styles.offlineText}>Offline Mode</ThemedText>
            </ThemedView>
            <TouchableOpacity style={styles.settingsButton}>
              <IconSymbol 
                name="gearshape.fill" 
                size={20} 
                color={Colors[colorScheme ?? 'light'].icon} 
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        
        <ThemedText style={styles.title} selectable={false}>SMS Transactions</ThemedText>
        <ThemedText style={styles.subtitle} selectable={false}>
          Send transactions via SMS when offline
        </ThemedText>
        
        <ThemedView style={styles.infoCard} lightColor="#ffffff" darkColor={Colors.dark.card}>
          <ThemedText style={styles.infoTitle} selectable={false}>💡 How it works</ThemedText>
          <ThemedText style={styles.infoText} selectable={false}>
            • Choose an action below{'\n'}
            • Fill in the required details{'\n'}
            • We&apos;ll compose the SMS for you{'\n'}
            • Send it to your local Paytos number
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.actionsContainer} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
        <ThemedText style={styles.sectionTitle} selectable={false}>Quick Actions</ThemedText>
        
        {actionButtons.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionButton, { borderLeftColor: action.color, backgroundColor: '#ffffff' }]}
            onPress={() => handleAction(action.id)}
          >
            <ThemedView style={styles.actionContent} lightColor="#ffffff" darkColor={Colors.dark.card}>
              <IconSymbol 
                name={action.icon as any} 
                size={24} 
                color={action.color} 
              />
              <ThemedView style={styles.actionText} lightColor="#ffffff" darkColor={Colors.dark.card}>
                <ThemedText style={styles.actionTitle} selectable={false}>{action.title}</ThemedText>
                <ThemedText style={styles.actionDescription} selectable={false}>{action.description}</ThemedText>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Modal for action details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              {actionButtons.find(a => a.id === selectedAction)?.title}
            </ThemedText>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <IconSymbol name="xmark" size={20} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          </ThemedView>

          <ScrollView style={styles.modalContent}>
            {selectedAction === 'register' && (
              <ThemedView>
                <ThemedText style={styles.inputLabel}>Create a PIN (4-6 digits)</ThemedText>
                <TextInput
                  style={styles.input}
                  value={pin}
                  onChangeText={setPin}
                  placeholder="Enter PIN"
                  secureTextEntry
                  maxLength={6}
                  keyboardType="numeric"
                />
              </ThemedView>
            )}

            {selectedAction === 'balance' && (
              <ThemedView>
                <ThemedText style={styles.inputLabel}>Enter your PIN</ThemedText>
                <TextInput
                  style={styles.input}
                  value={pin}
                  onChangeText={setPin}
                  placeholder="Enter PIN"
                  secureTextEntry
                  maxLength={6}
                  keyboardType="numeric"
                />
              </ThemedView>
            )}

            {selectedAction === 'send' && (
              <ThemedView>
                <ThemedText style={styles.inputLabel}>Recipient Phone Number</ThemedText>
                <TextInput
                  style={styles.input}
                  value={recipientPhone}
                  onChangeText={setRecipientPhone}
                  placeholder="+1234567890"
                  keyboardType="phone-pad"
                />

                <ThemedText style={styles.inputLabel}>Amount</ThemedText>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                />

                <ThemedText style={styles.inputLabel}>Token</ThemedText>
                <ThemedView style={styles.tokenSelector}>
                  {tokenOptions.map((token) => (
                    <TouchableOpacity
                      key={token}
                      style={[
                        styles.tokenOption,
                        selectedToken === token && styles.tokenOptionSelected
                      ]}
                      onPress={() => setSelectedToken(token)}
                    >
                      <ThemedText style={[
                        styles.tokenOptionText,
                        selectedToken === token && styles.tokenOptionTextSelected
                      ]}>
                        {token}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>

                <ThemedText style={styles.inputLabel}>Enter your PIN</ThemedText>
                <TextInput
                  style={styles.input}
                  value={pin}
                  onChangeText={setPin}
                  placeholder="Enter PIN"
                  secureTextEntry
                  maxLength={6}
                  keyboardType="numeric"
                />
              </ThemedView>
            )}

            <ThemedView style={styles.previewContainer}>
              <ThemedText style={styles.previewTitle}>SMS Preview:</ThemedText>
              <ThemedView style={styles.previewBox}>
                <ThemedText style={styles.previewText}>
                  To: {PAYTOS_SMS_NUMBER}
                </ThemedText>
                <ThemedText style={styles.previewMessage}>
                  {generateSMSMessage() || 'Fill in the details above...'}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !generateSMSMessage() && styles.sendButtonDisabled
                ]}
                onPress={executeSMSAction}
                disabled={!generateSMSMessage()}
              >
                <IconSymbol name="paperplane.fill" size={20} color="#fff" />
                <ThemedText style={styles.sendButtonText}>Send SMS</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.copyButton,
                  !generateSMSMessage() && styles.copyButtonDisabled
                ]}
                onPress={() => copyToClipboard(generateSMSMessage())}
                disabled={!generateSMSMessage()}
              >
                <IconSymbol name="doc.on.doc.fill" size={20} color={PaytosColors.blue} />
                <ThemedText style={styles.copyButtonText}>Copy Message</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </Modal>
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
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 32, // Match wallet tab size
    height: 32, // Match wallet tab size
    marginRight: 8,
  },
  brandName: {
    fontSize: 24, // Match wallet tab size
    fontWeight: 'bold',
    color: PaytosColors.blue, // Match wallet tab color
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  offlineText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 24, // Reduced from 28 to prevent cutoff
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 8,
    marginTop: 16, // Add top margin to increase distance from header
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  subtitle: {
    fontSize: 16,
    color: Colors[colorScheme ?? 'light'].icon,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  infoCard: {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  infoText: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    lineHeight: 20,
    backgroundColor: 'transparent',
  },
  balanceCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceItem: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].text,
    fontFamily: 'monospace',
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  actionButton: {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
    borderLeftWidth: 4,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    backgroundColor: 'transparent',
  },
  actionDescription: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    marginTop: 2,
    backgroundColor: 'transparent',
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
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 8,
    marginTop: 16,
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
    flexWrap: 'wrap',
    gap: 8,
  },
  tokenOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
    backgroundColor: 'transparent',
  },
  tokenOptionSelected: {
    backgroundColor: PaytosColors.blue,
    borderColor: PaytosColors.blue,
  },
  tokenOptionText: {
    color: Colors[colorScheme ?? 'light'].text,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  tokenOptionTextSelected: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
  previewContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors[colorScheme ?? 'light'].text,
    marginBottom: 8,
  },
  previewBox: {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors[colorScheme ?? 'light'].border,
  },
  previewText: {
    fontSize: 14,
    color: Colors[colorScheme ?? 'light'].icon,
    marginBottom: 8,
  },
  previewMessage: {
    fontSize: 16,
    color: Colors[colorScheme ?? 'light'].text,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
  },
  sendButton: {
    backgroundColor: PaytosColors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sendButtonDisabled: {
    backgroundColor: Colors[colorScheme ?? 'light'].icon,
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PaytosColors.blue,
    gap: 8,
  },
  copyButtonDisabled: {
    borderColor: Colors[colorScheme ?? 'light'].icon,
    opacity: 0.5,
  },
  copyButtonText: {
    color: PaytosColors.blue,
    fontSize: 16,
    fontWeight: '600',
  },
}); 