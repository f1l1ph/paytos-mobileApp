# 🪙 Paytos Mobile App

A comprehensive Solana wallet application showcasing both **Online** and **Offline (SMS)** modes for blockchain transactions, bridging Web3 and traditional mobile money.

## 🌟 Features

### 💎 Modern Wallet Interface
- **Clean, Metamask/Phantom-inspired UI/UX**
- **Real-time portfolio tracking** with live prices
- **Multi-token support**: SOL, USDC, USDT, PYUSD
- **DeFi positions** and **NFT collection** views
- **Transaction history** and activity tracking
- **Dark/Light theme** support with Paytos brand colors

### 🌐 Online Mode
- Full blockchain connectivity interface
- Send, Receive, Swap, and Stake functionality
- Advanced portfolio analytics
- DeFi position tracking
- Real-time transaction processing
- Advanced settings and history

### 📱 SMS Mode (Offline)
- **SMS-based transactions** for users without internet
- **Interactive message drafting** with preview
- **One-tap SMS sending** to Paytos service number
- Support for all core operations:
  - **Register** new wallet with PIN
  - **Check balance** 
  - **Send tokens** to phone numbers
- Clean, intuitive interface for non-technical users

## 🎨 Design

Built with **Paytos brand colors**:
- Primary: `#1571e2` (Blue)
- Background: `#f7f5f2` (Cream)
- Consistent theming across all components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI
- iOS Simulator / Android Emulator (optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/f1l1ph/paytos-mobileApp.git
   cd paytos-mobileApp
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open the app:**
   - Scan QR code with Expo Go app
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for web browser

## 📖 How to Use

### 🏠 Wallet Tab
- View your **portfolio overview** with total balance
- Toggle **balance visibility** with eye icon
- **Copy wallet address** by tapping the address box
- Access **quick actions**: Send, Receive, Swap, Stake
- Browse your **token holdings** and **recent activity**
- View **DeFi positions** and advanced features
- Configure **transaction settings** and analytics

### 📲 SMS Tab (The Star Feature!)
- Choose from **three main actions**:
  1. **Register Wallet** - Create new SMS wallet with PIN
  2. **Check Balance** - View current token balances  
  3. **Send Money** - Transfer tokens to phone numbers

- For each action:
  1. **Fill required information** (PIN, amount, recipient, etc.)
  2. **Preview the SMS** that will be sent
  3. **Tap "Send SMS"** to open your messages app
  4. The SMS is **pre-composed** and ready to send to `+1234567890`

### 📨 SMS Commands Format
```
REGISTER <PIN>
BALANCE <PIN>  
SEND <phone_number> <amount> <token> <PIN>
```

## 🛠 Technical Details

### Architecture
- **React Native** with **Expo Router**
- **TypeScript** for type safety
- **Context API** for state management
- **expo-sms** for SMS functionality
- **Themed components** for consistent styling

### Key Components
- `AppProvider` - Global state management
- `WalletScreen` - Main portfolio interface
- `OnlineTab` - Advanced trading features
- `OfflineTab` - SMS interaction interface
- Themed components for consistent design

### File Structure
```
app/
├── (tabs)/
│   ├── index.tsx        # Main wallet interface with all features
│   ├── offlineTab.tsx   # SMS functionality
│   └── _layout.tsx      # Tab navigation
├── _layout.tsx          # Root layout with app provider
components/              # Reusable UI components
constants/
└── Colors.ts           # Paytos brand colors
hooks/
└── useAppContext.tsx   # Global state management
```

## 🎯 Use Cases

### For Users

1. **Full-Featured Wallet**:
   - Navigate through the modern wallet interface
   - Manage portfolio overview and token holdings
   - Access transaction history and activity feeds
   - Use advanced DeFi features and analytics

2. **Offline Accessibility**:
   - Switch to SMS tab when internet is unavailable
   - Register new wallet via SMS commands
   - Send money using simple text messages
   - Copy or send SMS messages directly from the app

### Key Benefits
- "**Bridging Web3 and traditional mobile money**"
- "**No internet required** for basic transactions"
- "**Feature phone compatibility** through SMS"
- "**Financial inclusion** for underserved markets"
- "**Production-ready UI/UX** with clean design"

## 🔧 Production Considerations

For a real deployment, you would need to:

1. **Backend SMS Gateway** (Twilio integration)
2. **Custodial wallet management** system
3. **Real Solana blockchain** integration
4. **SMS number provisioning** and carrier partnerships
5. **PIN security** and user authentication
6. **Transaction confirmation** flows

## 🌍 Real-World Impact

This demo showcases how **Paytos** can serve:
- **Feature phone users** in developing markets
- **Areas with poor internet** connectivity  
- **Financial inclusion** initiatives
- **Remittance** and **micro-payments**
- **Emergency transaction** scenarios

## 🤝 Contributing

For production development and improvements:

1. Fork the repository
2. Create feature branches
3. Follow the existing code style
4. Test on multiple devices
5. Submit pull requests

## 📄 License

MIT License - feel free to use this application as inspiration for your own projects!

---

**Built with ❤️ for financial inclusion and Web3 accessibility**
