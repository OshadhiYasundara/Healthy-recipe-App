import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleLogin = () => {
    let formValid = true;
    const newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true);
        router.push("/home");
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" });
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/several-plates-with-tasty-healthy-food_23-2147591705.jpg?t=st=1735138918~exp=1735142518~hmac=37f72823b30081a3425f4084ab3b5c76423a93e9ed8ad04a813ba9877c0a32ce&w=826",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Healthy Recipe</Text>

        <TextInput
          placeholderTextColor="#fff"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholderTextColor="#fff"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Create Your Own Account?{" "}
          <Text style={styles.link}>
            <Link href="/">Sign Up</Link>
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(11, 30, 68, 0.8)",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F4F4F9",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#7F53AC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#F95738",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#F4F4F9",
  },
  link: {
    color: "#EE6C4D",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#EE6C4D",
    fontSize: 12,
    marginBottom: 10,
  },
});
