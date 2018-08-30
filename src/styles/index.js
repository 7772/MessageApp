import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const colors = {
  white: "#fff",
  red: "#FF0000",
  gray: "#A6A6A6",
  lightGray: "#CED0CE"
};

const SharedStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonContainer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
  }
});

const LoginStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  headingText: {
    fontWeight: "500",
    fontSize: 18,
    color: "rgb(38, 38, 38)",
    marginTop: 20,
    marginBottom: 12
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center"
  },
  facebookLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 260,
    backgroundColor: "rgb(59, 90, 150)",
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 32
  },
  facebookLoginButtonText: {
    fontWeight: "normal",
    fontSize: 17,
    color: "rgb(255, 255, 255)"
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    // borderBottomWidth: 0.6
  },
  logoutButtonText: {
    fontWeight: "100",
    fontSize: 14,
    color: colors.gray
  },
  loadingIconStyle: {
    paddingVertical: 20,
    // borderTopWidth: 1,
    borderColor: colors.lightGray
  }
});

const ProfileStyles = StyleSheet.create({
  profileContainer: {
    height: 100,
    flexDirection: "row"
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textContainer: {
    flex: 5,
    flexDirection: "row",
    marginLeft: 10
  },
  nameTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  nameText: {
    fontSize: 18
  },
  contentContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  content: {
    fontSize: 14
  }
});

const MessageStyles = StyleSheet.create({
  contentInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 18,
  },
  innerTextInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  contentTextInput: {
    width: 200,
    height: 40, 
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  messageContainer: {
    width: width - 20,
    height: height - 120,
    borderWidth: 1
  },









  contentWithPhotoContainer: {
    height: 50,
    flexDirection: "row"
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textContainer: {
    flex: 5,
    flexDirection: "row",
    marginLeft: 10
  },
  nameTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  nameText: {
    fontSize: 16
  },
  contentContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  content: {
    fontSize: 13
  }

































});

export {
  colors,
  SharedStyles,
  MessageStyles,
  ProfileStyles,
  LoginStyles,
};
