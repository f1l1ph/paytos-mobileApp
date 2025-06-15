/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Using Paytos brand colors: #f7f5f2 (cream) and #1571e2 (blue)
 */

const paytosBrandBlue = '#1571e2';
const paytosBrandCream = '#f7f5f2';

export const Colors = {
  light: {
    text: '#11181C',
    background: paytosBrandCream,
    tint: paytosBrandBlue,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: paytosBrandBlue,
    card: '#ffffff',
    border: '#e0e0e0',
    accent: paytosBrandBlue,
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0f1419',
    tint: paytosBrandCream,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: paytosBrandCream,
    card: '#1a1a1a',
    border: '#333333',
    accent: paytosBrandBlue,
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  },
};

export const PaytosColors = {
  blue: paytosBrandBlue,
  cream: paytosBrandCream,
};
