import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    color: '#191970',
  },
  inputText: {
    width: '90%',
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#191970',
    marginLeft: 'auto',
    marginRight: 'auto',
    outlineStyle: 'none',
  },
  buttonNewTask: {
    width: 60,
    height:60,
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#191970',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonSave: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 'bold'
  },
  statusTask: {
    marginTop: 20,
    marginLeft: 20
  }
})

export default styles