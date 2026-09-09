import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Fonts } from '@/constants/theme';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

type TextWithDefaults = typeof Text & {
  defaultProps?: {
    style?: unknown;
  };
};

const DefaultText = Text as TextWithDefaults;
DefaultText.defaultProps = {
  ...(DefaultText.defaultProps ?? {}),
  style: [{ fontFamily: Fonts.sans || 'Moonpig-Regular' }, DefaultText.defaultProps?.style].filter(Boolean),
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'Moonpig-Light': require('../../assets/font/moonpig-light.ttf'),
    'Moonpig-Regular': require('../../assets/font/moonpig-regular.ttf'),
    'Moonpig-Bold': require('../../assets/font/moonpig-bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return <AnimatedSplashOverlay />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
