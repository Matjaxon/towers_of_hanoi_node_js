const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TowersOfHanoi {
  constructor() {
    this.stacks = [[3, 2, 1],[], []];
  }

  run(completionCallback) {
    this.print();
    this.promptMove( (fromStack, toStack) => {
      this.move(fromStack, toStack);
      if (this.isWon()) {
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    });
  }

  promptMove(moveCallback) {
    console.log(this.stacks);
    reader.question("Which stack would you like move from? \n > ", (res) => {
      let fromStack = parseInt(res);
      reader.question("Where do you want to move this to? \n > ", (res1) => {
        let toStack = parseInt(res1);
        console.log(`From ${fromStack} to ${toStack}`);
        moveCallback(fromStack, toStack);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];
    let result = true;
    if (startTower.length === 0) {
      console.log("Invalid Move");
      result = false;
    } else {
      if (startTower[startTower.length-1] > endTower[endTower.length-1]){
        console.log("Invalid Move");
        result = false;
      }
    }
    return result;
  }

  move(startTowerIdx, endTowerIdx){
    console.log(this);
    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];
    let result = false;
    if (this.isValidMove(startTowerIdx, endTowerIdx)){
      endTower.push(startTower.pop());
      result = true;
    }
    return result;
  }

  print() {
    return JSON.stringify(this.stacks);
  }

  isWon() {
    let result = false;
     if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      result = true;
    }
    return result;
  }
}

const game = new TowersOfHanoi();
game.run(() => {
  console.log('Game Over');
  reader.close();
  return;}
);
