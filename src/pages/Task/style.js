import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  Tasks: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  deleteTask: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  DescriptionTask: {
    width: '75%',
    alignContent: 'flex-start',
    backgroundColor: '#f5f5fc',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
    marginLeft: 20,
    color: '#282b2db5'
  },
  DescriptionTaskOk: {
    width: '75%',
    alignContent: 'flex-start',
    backgroundColor: '#526f9445',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
    marginLeft: 20,
    color: '#282b2db5'
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
  iconButton: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonLogOut: {
    width: 60,
    height:60,
    position: 'absolute',
    bottom: 30,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLogOut: {
    color: "#191970",
    fontSize: 25,
    fontWeight: 'bold'
  },
  
})

export default styles