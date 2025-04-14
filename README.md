# 💸 Sentra - "Meraba Finansial, Meraih Impian"

Sentra is a comprehensive financial solution designed specifically for visually impaired users and those with low vision. The app combines inclusive design with powerful financial management tools to provide greater independence and accessibility.

## 🔍 Overview

Sentra aims to bridge the gap in financial services for visually impaired individuals through an inclusive mobile application that offers:

- **Accessible Banking:** Intuitive interface designed with screen reader support
- **Currency Detection:** Real-time identification of Indonesian Rupiah banknotes
- **Financial Management:** Budget tracking, expense categorization, and financial reporting
- **Financial Literacy:** Access to curated financial news with text-to-speech capabilities
- **Secure Authentication:** Face recognition and biometric login options

## ✨ Features

### 🔐 Authentication & Security

- Phone number and email-based registration
- Biometric authentication (fingerprint)
- Face verification for enhanced security
- PIN creation for secure access

### 📝 E-KYC (Electronic Know Your Customer)

- ID card (KTP) verification system
- Facial recognition verification
- Secure identity confirmation process

### 📊 Home & Financial Dashboard

- Transaction history and categorization
- Income and expense tracking
- Budget progress visualization
- Date range filtering for financial data

### 💵 Currency Detection

- Indonesian Rupiah banknote recognition
- Audio feedback for identified currency
- Flash and camera settings for various environments

### 📚 Financial Literacy

- Curated financial news and articles
- Text-to-speech functionality
- Reading mode with text highlighting
- Category-based content filtering

### 👤 Profile Management

- User information editing
- Notification settings
- Security options
- Account preferences

### 📱 QR Code Payment

- QR code scanning for payments
- Generate personal QR code for receiving payments
- Transaction verification via PIN

## 🛠️ Technology Stack

- **Frontend:** React Native with Expo
- **UI Framework:** Native styling with TailwindCSS (NativeWind)
- **State Management:** React Query
- **Authentication:** Secure Store & JWT Tokens
- **Forms:** React Hook Form with Zod validation
- **Accessibility:** React Native Accessibility APIs
- **Computer Vision:** (For currency detection and KTP verification)
- **Biometrics:** Expo Local Authentication

## 📁 Project Structure

```
sentra/
├── app/                  # Main application screens and routes
│   ├── (auth)/           # Authentication screens
│   ├── (e-kyc)/          # KYC verification screens
│   ├── (main)/           # Main app screens
│   ├── (sentra-pay)/     # Payment screens
│   └── qrCode/           # QR code functionality
├── assets/               # Images, fonts, and static resources
├── components/           # Reusable UI components
├── constants/            # Application constants
├── context/              # React Context providers
├── features/             # Feature-based modules
│   ├── auth/             # Authentication logic
│   ├── deteksi-uang/     # Currency detection
│   ├── e-kyc/            # KYC verification
│   ├── home/             # Dashboard functionality
│   ├── literasi/         # Financial literacy
│   ├── profiles/         # User profile management
│   ├── qr/               # QR code components
│   └── verification/     # Verification processes
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions and helpers
```

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sentra.git
   cd sentra
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Run on a device or emulator:
   - Press `a` for Android
   - Press `i` for iOS (Mac only)
   - Scan QR code with Expo Go app for physical devices

## ♿ Accessibility Features

Sentra is designed with accessibility as a core principle:

- **Screen Reader Support:** Full compatibility with TalkBack (Android) and VoiceOver (iOS)
- **High Contrast Modes:** Enhanced visibility options
- **Audio Feedback:** Voice guidance throughout the application
- **Customizable Text Size:** Adjustable text for low vision users
- **Simple Navigation:** Intuitive layout with minimal cognitive load

## 🤝 Contributing

We welcome contributions to make Sentra even more accessible and functional for visually impaired users. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👏 Acknowledgements

- Special thanks to all contributors and organizations supporting financial inclusion for visually impaired individuals
- Icons provided by Expo Vector Icons
- Accessibility testing partners and visually impaired beta testers who provided invaluable feedback

---

Sentra - Financial independence for everyone. 🌟
