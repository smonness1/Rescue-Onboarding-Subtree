import { ScrollView } from "react-native";

const Container = ({ children }) => (
  <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
    {children}
  </ScrollView>
);

export default Container;
