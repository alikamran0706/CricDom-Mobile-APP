export default ({ config }) => {
  return {
    ...config,
    name: "Cricdom",
    slug: "cricdom",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "cricdom",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.techlaud.cricdom",
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000"
      },
      edgeToEdgeEnabled: true,
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyDjLd8-m49Y7IDVT4VfR6sMX_lugEajnVA"
        }
      }
    },
    web: {
      bundler: "metro",
      "output": "server",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      appEnv: process.env.APP_ENV,
      eas: {
        projectId: "7517fea4-2956-49d0-9b7f-37b7880cbf14"
      },
      expoRouter: {
        appRoot: "app", // 👈 critical for web build
      },
    }
  };
};
