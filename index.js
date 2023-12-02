// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");
  allFlipped();
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  } // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};

let allBlocks = [...document.querySelectorAll(".game-block")],
  blocksContainer = document.querySelector(".memory-game-blocks"),
  triesElement = document.querySelector(".tries span"),
  correctAttempt = 0,
  duration = 1000;

function all() {
  let shuffleArray = shuffleArr();
  randomOrdering(allBlocks, shuffleArray);
}

all();

//At first flipped all blocks
function allFlipped() {
  allBlocks.forEach((e) => {
    e.classList.add("is-flipped");
  });
  setTimeout(() => {
    allBlocks.forEach((e) => {
      e.classList.remove("is-flipped");
    });
  }, duration + 2000);
}

//create shuffle array for ordering
function shuffleArr() {
  let shuffleArr = [];
  while (shuffleArr.length < 20) {
    for (let i = 0; i < 20; i++) {
      let random = Math.floor(Math.random() * 21);
      if (!shuffleArr.includes(random) && random !== 0) {
        shuffleArr.push(random);
      }
    }
  }
  return shuffleArr;
}

//random ordering
function randomOrdering(blocks, shuffleArr) {
  blocks.forEach((block, index) => {
    block.addEventListener("click", () => {
      flipBlock(block);
    });

    shuffleArr.forEach((e, i) => {
      if (i === index) {
        block.style.order = e;
      }
    });
  });
}

//function flip block
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  // Collect All Flipped Cards
  let allFlippedBlocks = allBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //Every 2 block Flipped
  if (allFlippedBlocks.length === 2) {
    //For Prevent any click
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//Fun check if 2 blocks matched
function checkMatchedBlocks(firstBlock, secondBlock) {
  //check if 2 blocks matched
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    //Remove is-flipped to (allFlippedBlocks.length === 2) works again
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    correctAttempt++;
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    if (correctAttempt === allBlocks.length / 2) {
      great();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

//Function when The user successfully gets the guess word
function great() {
  // Create Popup Div and Style
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Great, you get it after ${triesElement.innerHTML} Wrong Tries`
  );
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
  document.querySelector(".memory-game-blocks").style.pointerEvents = "none";
}
