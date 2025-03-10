import { StyleSheet } from "react-native";

export const OtpStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 20,
    gap: 10,
  },
  pinCodeContainer: {
    width: 55,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E0E0E0",
  },
  focusedPinCodeContainer: {
    borderColor: "black",
    backgroundColor: "#FFFFFF",
  },
  pinCodeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  errorContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 20,
    gap: 12,
  },
  errorPinCodeContainer: {
    width: 50,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
  },
  errorPinCodeText: {
    color: "black",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
