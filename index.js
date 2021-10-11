
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


class Room {
  //constructor that makes the room
  constructor(roomName, description, items, lock ) {
    (this.roomName = roomName),
      (this.description = description),
      (this.items = items);
      (this.lock = lock || false)
  }
  // function that changes your room if you are able to 
  move(room){
    if(validRoomChange[Room].includes(room)){
      currentRoom = room
    } else {
      console.log(`You cannot enter room yet! \n you might need somthing`)
    }
  }
  // changeRoom(newRoom) {
  //     if (validRoomChange[Room].includes(newRoom)) {
  //       currentRoom = newRoom
  //       console.log(describe());
  //     }
  // }
  // function that describes your room
  describe(){
    console.log(`You are in the ${this.roomName} this room ${this. description}`)
  }
}

class player {
  constructor(currentRoom, inventory) {
    (this.currentRoom = currentRoom || `street`),
      (this.inventory = inventory || [] );
  }
  describePlayer(input){
    if (input === `I`){
      console.log(`you have ${this.inventory} on you, and are in the ${this.currentRoom}`)
    }
  }
}

class Item {
  constructor(name, description, action, takable) {
    (this.name = name),
      (this.description = description),
      (this.action = action || `nothing happens`),
      (this.takable = takable || false);
  }

  //take function
  take() {
    if (this.takable) {
      inventory.push(this.name);
      return `you picked up ${this.name}`;
    } else {
      return `You cannot take that!!!`;
    }
  }

  //use function
  use() {
    if (this.takable) {
      return this.action;
    }
  }
}


let playerInventory = new player (
  `street`,
  `empty pocket`
)

// setting a current room 
let street = new Room(
`street`, 
`You are standing on Main Street between Church and South Winooski.
There is a door here.`, 
`door and doormat`,
`unlocked`
);

let currentRoom = "street"

let mudRoom = new Room(
`mudRoom`, 
`you are standing in a mudroom there are shose and clothes everywhere somone left is a mess... infront of you there is another door! On the left there is another door!`,
`shoes, clothes and a door`,
`locked`
)

let livingRoom = new Room(
  `living room`,
  `you have entered the living room it is odly empty, but there are 3 doors on the left, and to the right! what door will you enter?`,
  `2 doors`,
  `unlocked`
)

let garage = new Room(
  `garage`,
  `you have entered the garage it is really dark but in the corner there is a bat!`,
  `bat`,
  `unlocked`
)

let basement = new Room(
  `basement`,
  `You have entered the basement not much down here other than a old wooden stool`,
  `stool`,
  `unlocked`
)

let bathroom = new Room(
  `bathroom`,
  `You have entered the the bathroom, its a normal bathroom but there is a high window!`,
  `high window`,
  `unlocked`
)

let doormat = new Item (
`door mat`,
`old most door mat`,
`You looked under the door mat, there seems to be a hosue key!`,
false
)

let houseKey = new Item (
  `house key`,
  `shinny house key`,
  `You have taken the hosue key and put in in you pocket!`,
  true
)

let woodenBat = new Item (
  `bat`,
  `wooden baseball bat`,
  `You have picked up the baseball bat!`,
  true
)

let stool = new Item(
  `stool`,
  `old metal stool`,
  `You have taken the stool, maybe you can use it to reach somthing!`,
  true
)

let lookUpTable = {
  street: street,
  mudRoom: mudRoom,
  livingRoom: livingRoom,
  garage: garage,
  basement: basement,
  bathroom: bathroom,
  doormat: doormat,
  houseKey: houseKey,
  "hosue key": houseKey,
  woodenBat: woodenBat,
"wooden bat": woodenBat,
  stool: stool,
  playerInventory: playerInventory,
  currentRoom: currentRoom,
}


// rooms and rooms that you can go into 
let validRoomChange = {
  street: ["mudRoom"],
  mudRoom: ["street", "garage", "livingRoom"],
  garage: ["mudRoom"],
  livingRoom:  ["mudRoom","bathRoom", "basement"],
  basement: ["livingRoom"],
  bathroom:["livingRoom"]
};
 
start();

async function start() {
  let userAction = await ask(`What would you like to do? `);

  let inputArray = incomingInput(userAction)

  let action = inputArray[0]

  let target = inputArray.slice(1).join(" ")
if(action === `use`){
  console.log(lookUpTable[target].use())
} else if (action == `take`)
if(lookUpTable[target] instanceof Item){
  console.log(lookUpTable[target].take())
} else {
  console.log(lookUpTable[target] instanceof Item)
  console.log(`thats not an item to take! `)
} else if (action === `I`){
  console.log(describePlayer())
} else if (action === `move`){
  if(this.lock === unlocked)
 return changeRoom()

} else if (action === ` open door` && this.lock === `locked`) {
console.log(`Door is locked you cannot go into it`)
} else {
  console.log(`invalid Input, pls try again!!`)
}
  // while the answer does not = to exit 
  
  return start()
}


function incomingInput(words) {
  fixedInput = words.toLowerCase().trim().split(" ");
  return fixedInput;
}

console.log(`
You are standing on Main Street between Church and South Winooski.
There is a door here.

Press "I" to see player inventory`)

// keeping an array of known input 

