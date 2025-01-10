import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#ffd33d",
        statusBarBackgroundColor: "#25292e",
        headerStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tic Tac Toe" }} />
    </Stack>
  );
}
