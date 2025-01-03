import { Button, StyleSheet, View } from 'react-native';
function handle() {
  
}
function Square () {
  return <View style={styles.square}>
          <Button title='X' color={'black'} onPress={handle}/>
      </View>;
}
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <Square></Square>
      <Square></Square>
      <Square></Square>
      </View>
      <View style={styles.row}>
      <Square></Square>
      <Square></Square>
      <Square></Square>
      </View>
      <View style={styles.row}>
      <Square></Square>
      <Square></Square>
      <Square></Square>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  square:{
    backgroundColor: 'black',
    margin: 5,
    fontSize: 24,
    fontWeight: 'bold',
    height: 80,
    width: 80,
    justifyContent: 'center',
  },
});
