import React from "react";
import { Platform } from "react-native";

let Map: React.FC<any>;  

if (Platform.OS === "web") {
  Map = require("./Map.web").default;
} else {
  Map = require("./Map").default;
}

export default Map;
