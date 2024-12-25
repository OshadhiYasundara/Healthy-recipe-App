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

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleSignUp = () => {
    setYourName(name);
    let formValid = true;
    const newErrors: any = {};

    if (!name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

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
      setUserEmail(email);
      setUserPassword(password);
      router.push("/login");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/acai-bowl-recipe_23-2148562027.jpg?t=st=1735138952~exp=1735142552~hmac=6856e792503bd34584ec4a1e91088ad43ac39677319a61e70a1e72482c6e3bd4&w=826",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Healthy Recipe</Text>
        
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <TextInput
          placeholderTextColor="#FFFFFF"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link}>
            <Link href="/login">Login</Link>
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
    backgroundColor: "rgba(11, 30, 68, 0.8)",
    padding: 20,
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
