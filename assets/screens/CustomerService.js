import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import { colors } from "../backendFiles/colors";

function CustomerService() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <View style={styles.question}>
        <Text style={styles.questionText}>1. How can I place an order?</Text>
        <Text style={styles.answerText}>
          To place an order, simply browse through our coffee selections, choose
          your favorite, and proceed to checkout.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>
          2. Can I customize my coffee order?
        </Text>
        <Text style={styles.answerText}>
          Yes, you can customize your coffee order by selecting your preferred
          size, type, and additional options like milk type, sugar, etc.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>3. How do I track my order?</Text>
        <Text style={styles.answerText}>
          Once your order is placed, you'll receive a confirmation email or
          notification with tracking details. You can also check the status of
          your order in the app.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>
          4. What payment methods are accepted?
        </Text>
        <Text style={styles.answerText}>
          We accept various payment methods including credit/debit cards, mobile
          wallets, and other online payment options.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>
          5. How can I contact customer support?
        </Text>
        <Text style={styles.answerText}>
          For any inquiries or assistance, you can reach out to our customer
          support team through the app or by emailing 2002bharatdas@gmail.com.
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Additional Information"
          onPress={() => {
            Linking.openURL("https://youtu.be/dQw4w9WgXcQ?si=nEHTOXg40FCpWUNM");
          }}
          color={colors.buttons}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.primary,
    paddingTop: "30%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
  },
});

export default CustomerService;
