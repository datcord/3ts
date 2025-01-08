import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const startState = Array(9).fill(null);

const Game = () => {
  const [squares, setSquares] = useState(startState);
  const [turn, setTurn] = useState(true); //true is X
  let winner: null = null;
  const calcWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (squares.every((square) => square)) {
      console.log("draw");
    }
  };

  const board = (gameState: any[]) => {
    const gameJsx = [];
    for (let i = 0; i < 9; i += 3) {
      const rowJsx = [];
      for (let j = 0; j < 3; j++) {
        rowJsx.push(
          <TouchableOpacity
            style={styles.square}
            key={`square_${i + j}`}
            onPress={() => {
              handlePress(i + j);
            }}
          >
            <Text style={styles.text}>{gameState[i + j]}</Text>
          </TouchableOpacity>
        );
      }
      gameJsx.push(
        <View style={styles.row} key={`row${i}`}>
          {rowJsx}
        </View>
      );
    }
    return gameJsx;
  };

  const handlePress = (index: number) => {
    if (!squares[index] && !calcWinner()) {
      const newTable = squares.slice();
      newTable[index] = turn ? "X" : "O";
      setSquares(newTable);
      setTurn(!turn);
    }
    const winner = calcWinner();
    if (winner) {
      alert(winner);
    }
  };
  const reset = () => {
    setSquares(startState);
    setTurn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{winner}</Text>
      <View>{board(squares)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  square: {
    backgroundColor: "black",
    margin: 5,
    fontSize: 24,
    fontWeight: "bold",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Game;
