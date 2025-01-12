import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const startState = Array(9).fill(null);

const Game = () => {
  const [squares, setSquares] = useState(startState);
  const [turn, setTurn] = useState(true); //true is X
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState("2player"); //1player with computer
  const calcWinner = (csquares: any[]) => {
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
        csquares[a] &&
        csquares[a] === csquares[b] &&
        csquares[a] === csquares[c]
      ) {
        return csquares[a];
      }
    }
    if (csquares.every((square) => square)) {
      return "draw";
    }
  };
  const ModeButton = () => {
    const modePress = () => {
      if (mode == "1player") {
        setMode("2player");
        reset();
        return;
      } else {
        setMode("1player");
        reset();
        return;
      }
    };

    return (
      <TouchableOpacity style={styles.reset} onPress={modePress}>
        <Text style={styles.darkText}>{mode}</Text>
      </TouchableOpacity>
    );
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

  const compTurn = (table: any[]) => {
    while (!turn) {
      let randomPlay = Math.floor(Math.random() * 9);
      if (!table[randomPlay] && !calcWinner(table)) {
        const newTable = table.slice();
        newTable[randomPlay] = "O";
        setSquares(newTable);
        setTurn(true);
        setWinner(calcWinner(newTable));
        return;
      }
    }
  };
  const handlePress = (index: number) => {
    if (mode == "2player") {
      if (!squares[index] && !calcWinner(squares)) {
        const newTable = squares.slice();
        newTable[index] = turn ? "X" : "O";
        setSquares(newTable);
        setTurn(!turn);
        setWinner(calcWinner(newTable));
      }
    } else {
      if (!squares[index] && !calcWinner(squares)) {
        const newTable = squares.slice();
        newTable[index] = "X";
        setSquares(newTable);
        setTurn(!turn);
        setWinner(calcWinner(newTable));
        setTimeout(() => {
          compTurn(newTable);
        }, 1000);
      }
    }
  };
  const reset = () => {
    setSquares(startState);
    setTurn(true);
    setWinner(null);
  };
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (turn ? "X" : "O");
  }
  return (
    <View style={styles.container}>
      <View>{ModeButton()}</View>
      <View>
        <Text style={styles.yellowText}>{status}</Text>
      </View>
      <View>{board(squares)}</View>
      <TouchableOpacity style={styles.reset}>
        <Text style={styles.darkText} onPress={reset}>
          Restart
        </Text>
      </TouchableOpacity>
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
  reset: {
    height: 50,
    width: 100,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "#ffd33d",
    alignItems: "center",
    justifyContent: "center",
  },
  yellowText: {
    color: "#ffd33d",
    fontSize: 25,
  },
  darkText: {
    color: "#25292e",
    fontSize: 25,
  },
  text: {
    color: "#fff",
    fontSize: 30,
  },
  square: {
    borderRadius: 10,
    backgroundColor: "black",
    margin: 5,
    fontWeight: "bold",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Game;
