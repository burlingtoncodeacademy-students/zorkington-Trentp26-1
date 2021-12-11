//async boilerplate code
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//----------------------------------------------------
// classes
//
//
//

class Room {
  //constructor that makes the room
  constructor(roomName, description, items, lock) {
    (this.roomName = roomName),
      (this.description = description),
      (this.items = items),
      (this.lock = lock || false);
  }
  // function that changes your room if you are able to
  move(newRoom) {
    console.log(newRoom)
    console.log(validRoomChange[currentRoom.roomName][0]);
    if (validRoomChange[currentRoom.roomName].includes(newRoom.roomName)) {
      playerInventory.currentRoom = newRoom;
    } else {
      console.log(`You cannot enter room yet! \n you might need somthing`);
    }
  }
}

//class that sets up the payer info
class player {
  constructor(currentRoom, inventory) {
    (this.currentRoom = currentRoom || `street`),
      (this.inventory = inventory || []);
  }
  // function that takes i and outputs the payers inventory
  describePlayer(input) {
    if (input === `i`) {
      console.log(
        `you have ${this.inventory} on you, and are in the ${this.currentRoom.roomName}`
      );
    } else {
      console.log("unkown input try (i) to see inventory");
    }
  }
}
// this class sets up an item and deals with taking and using the item
class Item {
  constructor(name, description, action, takable) {
    (this.name = name),
      (this.description = description),
      (this.action = action || `nothing happens`),
      (this.takable = takable || false);
  }

  //take function lets the player take an item
  take() {
    if (this.takable === true) {
      playerInventory.inventory.push(this.name);
      return `you picked up ${this.name}`;
    } else {
      return `You cannot take that!!!`;
    }
  }

  //use function lets the player use the item
  use() {
    return this.action;
  }
}

// -------------------
//
//
//

//letting the player inventory to start
let playerInventory = new player(`street`);
//setting the current room to the starting room

// setting a starting room
let street = new Room(
  `street`,
  `You are standing on Main Street between Church and South Winooski.
There is a door here.`,
  `door and doormat`,
  `unlocked`
);

// using the class the make a room
let mudRoom = new Room(
  `mudRoom`,
  `you are standing in a mudroom there are shoes and clothes everywhere someone left is a mess... infront of you there is another door! On the left there is another door!`,
  `shoes, clothes and a door`,
  `unlocked`
);
// using the class the make a room
let livingRoom = new Room(
  `living room`,
  `you have entered the living room it is odly empty, but there are 3 doors on the left, and to the right! what door will you enter?`,
  `2 doors`,
  `unlocked`
);
// using the class the make a room
let garage = new Room(
  `garage`,
  `you have entered the garage it is really dark but in the corner there is a bat!`,
  `bat`,
  `unlocked`
);
// using the class the make a room
let basement = new Room(
  `basement`,
  `You have entered the basement not much down here other than a old wooden stool`,
  `stool`,
  `unlocked`
);
// using the class the make a room
let bathroom = new Room(
  `bathroom`,
  `You have entered the the bathroom, its a normal bathroom but there is a high window!`,
  `high window`,
  `unlocked`
);
// using the class the make a room
let doormat = new Item(
  `door mat`,
  `old most door mat`,
  `You looked under the door mat, there seems to be a hosue key!`,
  true
);
// using the class the make a room
let houseKey = new Item(
  `house key`,
  `shinny house key`,
  `You have taken the hosue key and put in in you pocket!`,
  true
);
// using the class the make a room
let woodenBat = new Item(
  `bat`,
  `wooden baseball bat`,
  `You have picked up the baseball bat!`,
  true
);
// using the class the make a room
let stool = new Item(
  `stool`,
  `old metal stool`,
  `You have taken the stool, maybe you can use it to reach somthing!`,
  true
);

let currentRoom = street;
//--------------------------------------------------------
//lookup table
//setting a array to find items and rooms
let lookUpTable = {
  street: street,
  mudroom: mudRoom,
  livingRoom: livingRoom,
  garage: garage,
  basement: basement,
  bathroom: bathroom,
  doormat: doormat,
  houseKey: houseKey,
  "house key": houseKey,
  woodenBat: woodenBat,
  "wooden bat": woodenBat,
  stool: stool,
  playerInventory: playerInventory,
  currentRoom: currentRoom,
};

// rooms and rooms that you can go into
let validRoomChange = {
  street: ["mudRoom"],
  mudRoom: ["street", "garage", "livingRoom"],
  garage: ["mudRoom"],
  livingRoom: ["mudRoom", "bathRoom", "basement"],
  basement: ["livingRoom"],
  bathroom: ["livingRoom"],
};

//-------------------------------------------------------------
// game running function
//
//
//

//calling game function
start();

//the game running function "start"
async function start() {
  //input sanitzation
  let userAction = await ask(`What would you like to do? `);
  //function sanitizes the string
  let inputArray = incomingInput(userAction);
  //puts string into an array
  let action = inputArray[0];
  //takes array and joins together
  let target = inputArray.slice(1).join(" ");
  // if the playing says "use" it will run the use function
  if (action === `use`) {
    console.log(lookUpTable[target].use());
  } else if (action == `take`) {
    if (lookUpTable[target] instanceof Item) {
      //if the player says "take" the game will run the take function
      console.log(lookUpTable[target].take());
    } else {
      // if they cannot take item then tell them so
      console.log(lookUpTable[target] instanceof Item);
      console.log(`thats not an item to take! `);
    }
  }
  //if the player says "i" the game will return there current inventory
  else if (action === `i`) {
    playerInventory.describePlayer(action);

    //if the player says "move" it will check if it can move
  } else if (action === `move`) {
    //if the room is unlocked then change rooms
    
    if (currentRoom.lock === "unlocked") {
      currentRoom.move(lookUpTable[target]);
      console.log("changed room");
    }
    //if the room is locked then tell them the room is locked and do nothing
  } else if (action === `move` && currentRoom.lock === `locked`) {
    console.log(`Door is locked you cannot go into it`);
  } else {
    //if the player put is an unknown input then tell them so
    console.log(`invalid Input, pls try again!!`);
  }
  // while the answer does not = to exit

  return start();
}
//function to deal with player input and san
function incomingInput(words) {
  fixedInput = words.toLowerCase().trim().split(" ");
  return fixedInput;
}
//starting lines
console.log(`
You are standing on Main Street between Church and South Winooski.
There is a doormat with a door to enter the house. once you enter the house try to get out!

Press "i" to see player inventory`);
