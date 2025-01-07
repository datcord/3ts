import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const startState = Array(9).fill(null);

const Game = () => {
  const [squares, setSquares] = useState(startState);
  const [turn, setTurn] = useState(true); //true is X
  const [winner, setWinner] = useState('');
  
  const calcWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
    if (squares.every(square => square)) {
      setWinner('draw');
    }
  }

  function Square() {
    return <View style={styles.square}>
            <Button title='X' color={'black'} onPress={()=>{
            }}/>
        </View>;
  }

  const handlePress = (index: number) => {
    if (!squares[index] && (winner == '')) {
      const newTable = [...squares];
      newTable[index] = turn ? 'X' : 'O';
      setSquares(newTable);
      setTurn(!turn);
    }
  };
  const reset = () => {
    setSquares(startState);
    setTurn(true);
    setWinner('');
  };
  const firstRow = squares.map((num)=>
    <View style={styles.square}>
      <Button title={squares[num]} color={'black'} onPress={()=>{handlePress}}/>
    </View>
  );
  return (
    <View style = {styles.container}>
      
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
export default Game;