import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const startState = Array(9).fill(null);

type ModeSelectionProps = {
  onModeSelect: (mode: "1player" | "2player") => void;
  onResetScores: () => void;
};
type DifficultySelectionProps = {
  onDifficultySelect: (difficulty: "easy" | "medium" | "hard") => void;
};
const ModeSelection = ({ onModeSelect, onResetScores }: ModeSelectionProps) => {
  return (
    <View style={[styles.container, { pointerEvents: "auto" }]}>
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />
      <Text style={styles.yellowText}>Select Game Mode</Text>
      <TouchableOpacity
        style={[styles.reset, { pointerEvents: "auto" }]}
        onPress={() => onModeSelect("1player")}
      >
        <Text style={styles.darkText}>Single Player</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reset, { pointerEvents: "auto" }]}
        onPress={() => onModeSelect("2player")}
      >
        <Text style={styles.darkText}>Two Players</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reset, { pointerEvents: "auto" }]}
        onPress={onResetScores}
      >
        <Text style={styles.darkText}>Reset Scores</Text>
      </TouchableOpacity>
    </View>
  );
};

const DifficultySelection = ({
  onDifficultySelect,
}: DifficultySelectionProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />
      <Text style={styles.yellowText}>Select Game Difficulty</Text>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => onDifficultySelect("easy")}
      >
        <Text style={styles.darkText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => onDifficultySelect("medium")}
      >
        <Text style={styles.darkText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => onDifficultySelect("hard")}
      >
        <Text style={styles.darkText}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
};

type GameMode = "1player" | "2player" | null;
type Difficulty = "easy" | "medium" | "hard" | null;
type ScoreCounter = {
  X: number;
  O: number;
};

const Game = () => {
  const [squares, setSquares] = useState(startState);
  const [turn, setTurn] = useState(true); //true is X
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState<GameMode>(null);
  const [scores, setScores] = useState<ScoreCounter>({ X: 0, O: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
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
      setMode(null); // Reset to mode selection
      reset();
      setDifficulty(null);
    };

    return (
      <TouchableOpacity style={styles.reset} onPress={modePress}>
        <Text style={styles.darkText}>Change Mode</Text>
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

    // Find empty squares
    const emptySquares = table.reduce((acc: number[], curr, idx) => {
      if (!curr) acc.push(idx);
      return acc;
    }, []);

    if (emptySquares.length > 0 && !calcWinner(table)) {
      // Check for potential winning moves or blocks with 50% probability
      var shouldBlock: any;
      var shouldWin: any;
      switch (difficulty) {
        case "easy":
          shouldBlock = Math.random() < 0.5;
          shouldWin = Math.random() < 0.5;
          break;
        case "medium":
          shouldBlock = Math.random() < 0.75;
          shouldWin = Math.random() < 0.75;
          break;
        case "hard":
          shouldBlock = 1;
          shouldWin = Math.random();
          break;
      }

      if (shouldWin) {
        // Check each line for two X's and an empty square
        for (const line of lines) {
          const [a, b, c] = line;
          const squares = [table[a], table[b], table[c]];
          const OCount = squares.filter((s) => s === "O").length;
          const emptyCount = squares.filter((s) => !s).length;

          if (OCount === 2 && emptyCount === 1) {
            // Found a potential winning line for X, block it
            const blockIndex = line[squares.findIndex((s) => !s)];
            const newTable = table.slice();
            newTable[blockIndex] = "O";
            setSquares(newTable);
            setTurn(true);
            setWinner(calcWinner(newTable));
            return;
          }
        }
      }
      if (shouldBlock) {
        // Check each line for two X's and an empty square
        for (const line of lines) {
          const [a, b, c] = line;
          const squares = [table[a], table[b], table[c]];
          const xCount = squares.filter((s) => s === "X").length;
          const emptyCount = squares.filter((s) => !s).length;

          if (xCount === 2 && emptyCount === 1) {
            // Found a potential winning line for X, block it
            const blockIndex = line[squares.findIndex((s) => !s)];
            const newTable = table.slice();
            newTable[blockIndex] = "O";
            setSquares(newTable);
            setTurn(true);
            setWinner(calcWinner(newTable));
            return;
          }
        }
      }
      // If no blocking needed or random chance didn't trigger, make a random move
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const computerMove = emptySquares[randomIndex];

      const newTable = table.slice();
      newTable[computerMove] = "O";
      setSquares(newTable);
      setTurn(true);
      setWinner(calcWinner(newTable));
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
      if (!squares[index] && !calcWinner(squares) && turn) {
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
    if (winner && winner !== "draw") {
      setScores((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    }
    setSquares(startState);
    setTurn(true);
    setWinner(null);
  };

  // If no mode is selected, show mode selection
  if (!mode) {
    return (
      <ModeSelection
        onModeSelect={(selectedMode) => setMode(selectedMode)}
        onResetScores={() => setScores({ X: 0, O: 0 })}
      />
    );
  }
  if (mode === "1player" && !difficulty) {
    return (
      <DifficultySelection
        onDifficultySelect={(selectedDifficulty) =>
          setDifficulty(selectedDifficulty)
        }
      />
    );
  }
  let status;
  if (winner) {
    status = winner === "draw" ? "It's a Draw!" : "Winner: " + winner;
  } else {
    status = "Next player: " + (turn ? "X" : "O");
  }

  const ScoreBoard = () => (
    <View style={styles.scoreBoard}>
      <Text style={styles.yellowText}>
        {mode === "1player" ? "Player: " : "Player X: "}
        {scores.X}
      </Text>
      <Text style={styles.yellowText}>
        {mode === "1player" ? "Computer: " : "Player O: "}
        {scores.O}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>{ModeButton()}</View>
      <ScoreBoard />
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
    height: "auto",
    width: "auto",
    margin: 5,
    padding: 10,
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
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#ffd33d",
  },
});
export default Game;
