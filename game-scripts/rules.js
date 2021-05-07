import { PIECES } from "./pieces.js";

let arr = [];
let soldierDanger = [];
let lastCheck, inCheck;

export function findOptions(piece, color, checkForDanger = true, removePiece=null) {
  let removePieceParent;
  removePiece ? removePieceParent = removePiece.parentElement : null;
  removePiece ? removePiece.remove() : null;
  arr = [];
  let x, y;

  if (PIECES.kings.includes(piece)) {
    arr = [];
    x = piece.parentElement.value.x;
    y = piece.parentElement.value.y;
    arr.push(findSpot(x + 1, y));
    arr.push(findSpot(x - 1, y));
    arr.push(findSpot(x + 1, y + 1));
    arr.push(findSpot(x + 1, y - 1));
    arr.push(findSpot(x, y + 1));
    arr.push(findSpot(x, y - 1));
    arr.push(findSpot(x - 1, y + 1));
    arr.push(findSpot(x - 1, y - 1));
    if (PIECES.whitePieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.blackPieces.includes(a.firstElementChild)
          ) {
            color && !a.classList.contains("danger")
              ? a.classList.add("possible")
              : null;
          }
          if (!PIECES.whitePieces.includes(a.firstElementChild)) {
            color && !a.classList.contains("danger")
              ? a.classList.add("possible")
              : null;
          }
        }
      }
    }
    if (PIECES.blackPieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.whitePieces.includes(a.firstElementChild)
          ) {
            color && !a.classList.contains("danger")
              ? a.classList.add("possible")
              : null;
          }
          if (!PIECES.blackPieces.includes(a.firstElementChild)) {
            color && !a.classList.contains("danger")
              ? a.classList.add("possible")
              : null;
          }
        }
      }
    }
  } else if (PIECES.bishops.includes(piece)) {
    arr = [];
    arr = findDiagonals(piece);
    if (PIECES.whitePieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.blackPieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.whitePieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
    if (PIECES.blackPieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.whitePieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.blackPieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
  } else if (PIECES.queens.includes(piece)) {
    arr = [];
    arr = findHorizontals(piece).concat(findDiagonals(piece));
    if (PIECES.whitePieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.blackPieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.whitePieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
    if (PIECES.blackPieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.whitePieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.blackPieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
  } else if (PIECES.soldiers.includes(piece)) {
    arr = [];
    let soldierDanger = [];
    piece.parentElement ? (x = piece.parentElement.value.x) : null;
    piece.parentElement ? (y = piece.parentElement.value.y) : null;
    if (PIECES.whitePieces.includes(piece)) {
      arr = findWhitePawn(piece, color);
      soldierDanger = arr;
      soldierDanger.push(findSpot(x - 1, y + 1));
      soldierDanger.push(findSpot(x + 1, y + 1));
      soldierDanger.remove(findSpot(x, y + 1));
      // array modifiction for when kingDanger is called
    } else if (PIECES.blackPieces.includes(piece)) {
      arr = findBlackPawn(piece, color);
      soldierDanger = arr;
      soldierDanger.push(findSpot(x - 1, y - 1));
      soldierDanger.push(findSpot(x + 1, y - 1));
      soldierDanger.remove(findSpot(x, y - 1));
      // array modifiction for when kingDanger is called
    }
  } else if (PIECES.walls.includes(piece)) {
    arr = [];
    arr = findHorizontals(piece);
    if (PIECES.whitePieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.blackPieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.whitePieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
    if (PIECES.blackPieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.whitePieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.blackPieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
  } else if (PIECES.horses.includes(piece)) {
    arr = [];
    arr = findHorses(piece);
    if (PIECES.whitePieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.blackPieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.whitePieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
    if (PIECES.blackPieces.includes(piece)) {
      for (let a of arr) {
        if (a) {
          if (
            a.firstElementChild &&
            PIECES.whitePieces.includes(a.firstElementChild)
          ) {
            color ? a.classList.add("possible") : null;
          }
          if (!PIECES.blackPieces.includes(a.firstElementChild)) {
            color ? a.classList.add("possible") : null;
          }
        }
      }
    }
  }
  if (PIECES.blackPieces.includes(piece)) {
    if (checkForDanger && PIECES.soldiers.includes(piece)) {
      findSpot(x, y - 1) ? arr.push(findSpot(x, y - 1)) : null;
    }
  }

  if (PIECES.whitePieces.includes(piece)) {
    if (checkForDanger && PIECES.soldiers.includes(piece)) {
      findSpot(x, y + 1) ? arr.push(findSpot(x, y + 1)) : null;
    }
  }

  removePieceParent ? removePieceParent.append(removePiece) : null;
  return arr;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function removeOptions() {
    for (let a of arr) {
      await sleep(1);
      if (a) a.classList.remove("possible");
    }
}

function getArraysIntersection(a1, a2) {
  return a1.filter(function (n) {
    return a2.indexOf(n) !== -1;
  });
}

export function findKingDanger(piece, curr) {
  lastCheck ? lastCheck.classList.remove("check") : null;
  let dangerFound;
  let x, y;
  let kingArr = [];
  let newKingArr = [];
  let allOppositeMoves = [];
  if (PIECES.blackPieces.includes(piece)) {
    x = PIECES.kings[1].parentElement.value.x;
    y = PIECES.kings[1].parentElement.value.y;
  } else {
    x = PIECES.kings[0].parentElement.value.x;
    y = PIECES.kings[0].parentElement.value.y;
  }
  kingArr.push(findSpot(x + 1, y));
  kingArr.push(findSpot(x - 1, y));
  kingArr.push(findSpot(x + 1, y + 1));
  kingArr.push(findSpot(x + 1, y - 1));
  kingArr.push(findSpot(x, y + 1));
  kingArr.push(findSpot(x, y - 1));
  kingArr.push(findSpot(x - 1, y + 1));
  kingArr.push(findSpot(x - 1, y - 1));
  let dangerZone = [];
  if (PIECES.blackPieces.includes(piece)) {
    newKingArr = kingArr.filter((e) => {
      return e && !PIECES.whitePieces.includes(e.firstElementChild);
    });
    for (let b of PIECES.blackPieces) {
      allOppositeMoves.push(findOptions(b, false, false));
    }
    if (kingArr.includes(curr)) newKingArr.push(curr);
    for (let o of allOppositeMoves) {
      if (o.includes(findSpot(x, y))) {
        findSpot(x, y).classList.add("danger");
        dangerFound = true;
      }
      for (let c of getArraysIntersection(o, kingArr)) {
        if (c) {
          c.classList.add("danger");
          dangerZone ? dangerZone.push(c) : null;
        }
      }
    }
  }
  if (PIECES.whitePieces.includes(piece)) {
    newKingArr = kingArr.filter((e) => {
      return e && !PIECES.blackPieces.includes(e.firstElementChild);
    });
    for (let b of PIECES.whitePieces) {
      allOppositeMoves.push(findOptions(b, false, false));
    }
    if (kingArr.includes(curr)) newKingArr.push(curr);
    for (let o of allOppositeMoves) {
      if (o.includes(findSpot(x, y))) {
        findSpot(x, y).classList.add("danger");
        dangerFound = true;
      }
      for (let c of getArraysIntersection(o, kingArr)) {
        if (c) {
          c.classList.add("danger");
          dangerZone ? dangerZone.push(c) : null;
        }
      }
    }
  }
  for (let k of newKingArr) {
    if (
      k &&
      !dangerZone.includes(k) &&
      PIECES.blackPieces.includes(k.firstElementChild)
    ) {
      k.classList.remove("danger");
    }
  }
  if (PIECES.kings[0].parentElement.classList.contains("danger")) {
    PIECES.kings[0].parentElement.classList.add("check");
    lastCheck = PIECES.kings[0].parentElement;
  }
  if (PIECES.kings[1].parentElement.classList.contains("danger")) {
    PIECES.kings[1].parentElement.classList.add("check");
    lastCheck = PIECES.kings[1].parentElement;
  }
}

export function fixCheck(piece) {
  findPath(piece);
}

function findPath(piece) {
  let x, y;
  let kingArr = [];
  let newKingArr = [];
  let opponentArr = [];
  let killArr = [];
  let tempArr = [];
  let restrictedAreas = [];
  let possibles = [];
  if (PIECES.blackPieces.includes(piece)) {
    x = PIECES.kings[0].parentElement.value.x;
    y = PIECES.kings[0].parentElement.value.y;
  } else {
    x = PIECES.kings[1].parentElement.value.x;
    y = PIECES.kings[1].parentElement.value.y;
  }
  kingArr.push(findSpot(x + 1, y));
  kingArr.push(findSpot(x - 1, y));
  kingArr.push(findSpot(x + 1, y + 1));
  kingArr.push(findSpot(x + 1, y - 1));
  kingArr.push(findSpot(x, y + 1));
  kingArr.push(findSpot(x, y - 1));
  kingArr.push(findSpot(x - 1, y + 1));
  kingArr.push(findSpot(x - 1, y - 1));
  if (PIECES.whitePieces.includes(piece) && PIECES.kings[1] != (piece)) {
    restrictedAreas = [];
    killArr = []
    newKingArr = kingArr.filter((e) => {
      return e && !PIECES.whitePieces.includes(e.firstElementChild);
    });
    for (let a of findOptions(piece, false, true)) {
      opponentArr = [];
      a ? a.classList.add("vision") : null;
      for (let b of PIECES.blackPieces) {
        tempArr = findOptions(b, false, true, piece)
        tempArr = tempArr.filter((e) => {
          return e && !PIECES.blackPieces.includes(e) && !e.classList.contains('vision');
        });
      killArr = findOptions(b, false, false)  
      for (let k of killArr) {
        if (k && k.firstElementChild == PIECES.kings[1]) {
          if (findOptions(piece, false, true).includes(b.parentElement)) {
           possibles.push(b.parentElement)
          }
        }
      }
        tempArr.length > 0 ? opponentArr.push(tempArr) : null;
      }
      kingArr = [PIECES.kings[1].parentElement]
      for (let t of opponentArr) {
        if (getArraysIntersection(t, kingArr).length > 0) {
          restrictedAreas.push(a)
        }
      }
      a ? a.classList.remove('vision'): null;
    }
    let c = getArraysIntersection(restrictedAreas, findOptions(piece, false, true))
    for (let k of c) {
      k ? k.classList.remove('possible') : null;
    }
  } else if (PIECES.blackPieces.includes(piece) && PIECES.kings[0] != (piece)) {
    restrictedAreas = [];
    killArr = []
    newKingArr = kingArr.filter((e) => {
      return e && !PIECES.blackPieces.includes(e.firstElementChild);
    });
    for (let a of findOptions(piece, false, true)) {
      opponentArr = [];
      a ? a.classList.add("vision") : null;
      for (let b of PIECES.whitePieces) {
        tempArr = findOptions(b, false, true, piece)
        tempArr = tempArr.filter((e) => {
          return e && !PIECES.whitePieces.includes(e) && !e.classList.contains('vision');
        });
      killArr = findOptions(b, false, false)  
      for (let k of killArr) {
        if (k && k.firstElementChild == PIECES.kings[0]) {
          if (findOptions(piece, false, true).includes(b.parentElement)) {
           possibles.push(b.parentElement)
          }
        }
      }
        tempArr.length > 0 ? opponentArr.push(tempArr) : null;
      }
      kingArr = [PIECES.kings[0].parentElement]
      for (let t of opponentArr) {
        if (getArraysIntersection(t, kingArr).length > 0) {
          restrictedAreas.push(a)
        }
      }
      a ? a.classList.remove('vision'): null;
    }
    let c = getArraysIntersection(restrictedAreas, findOptions(piece, false, true))
    for (let k of c) {
      k ? k.classList.remove('possible') : null;
    }
  }
  for (let p of possibles) {
    p.classList.add('possible')
  }


  //DONT RUN THIS FOR KING

  //have: The friendly king's options (in newKingArr)
  //for each option of the dragging piece
  // add ('vision') class to each one
  // implement that a findOptions loop will break if it meets a vision
  // find opponent's options
  // if opponent's options still includes king's spot
  // remove the option
}

export function checkMate(color) {
  // console.log('checking mate')
  // let sameSideMoves = [];
  // if (color == 'white') {
  //   for (let w of PIECES.whitePieces) {
  //     sameSideMoves.push(findPath(w))
  //   }
  //   let empty = false;
  //   for (let s of sameSideMoves) {
  //     if (s) s = s.filter((e) => {
  //       return e && !PIECES.whitePieces.includes(e.firstElementChild);
  //     });
  //     console.log(s)
  //     if (s && s.length > 0){
  //       empty = true
  //     }
  //   }
  //   !empty ? alert('Black Wins') : null;
  // }
  // else if (color == "black") {
  //   for (let w of PIECES.blackPieces) {
  //     sameSideMoves.push(findOptions(w, false, true))
  //   }
  //   let empty = false;
  //   for (let s of sameSideMoves) {
  //     if (s.length > 0){
  //       empty = true
  //     }
  //   }
  //   !empty ? alert('White Wins') : null;
  // }
}

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function findDiagonals(piece) {
  let x, y;
  var arr = [];
  x = piece.parentElement.value.x;
  y = piece.parentElement.value.y;
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x + 1 + i, y + 1 + i)) {
      break;
    }
    if (
      findSpot(x + 1 + i, y + 1 + i) &&
      findSpot(x + 1 + i, y + 1 + i).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x + 1 + i, y + 1 + i)) {
      arr.push(findSpot(x + 1 + i, y + 1 + i));
    } else if (
      findSpot(x + 1 + i, y + 1 + i) &&
      findSpot(x + 1 + i, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(
          findSpot(x + 1 + i, y + 1 + i).firstElementChild
        )
      ) {
      }
    } else if (
      findSpot(x + 1 + i, y + 1 + i) &&
      findSpot(x + 1 + i, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(
          findSpot(x + 1 + i, y + 1 + i).firstElementChild
        )
      ) {
        arr.push(findSpot(x + 1 + i, y + 1 + i));
      }
    }
    if (
      findSpot(x + 1 + i, y + 1 + i) &&
      PIECES.whitePieces.includes(
        findSpot(x + 1 + i, y + 1 + i).firstElementChild
      )
    ) {
      break;
    }
    if (
      findSpot(x + 1 + i, y + 1 + i) &&
      PIECES.blackPieces.includes(
        findSpot(x + 1 + i, y + 1 + i).firstElementChild
      )
    ) {
      
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x - 1 - i, y + 1 + i)) {
      break;
    }
    if (
      findSpot(x - 1 - i, y + 1 + i) &&
      findSpot(x - 1 - i, y + 1 + i).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x - 1 - i, y + 1 + i)) {
      arr.push(findSpot(x - 1 - i, y + 1 + i));
    } else if (
      findSpot(x - 1 - i, y + 1 + i) &&
      findSpot(x - 1 - i, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(
          findSpot(x - 1 - i, y + 1 + i).firstElementChild
        )
      ) {
      }
    } else if (
      findSpot(x - 1 - i, y + 1 + i) &&
      findSpot(x - 1 - i, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(
          findSpot(x - 1 - i, y + 1 + i).firstElementChild
        )
      ) {
        arr.push(findSpot(x - 1 - i, y + 1 + i));
      }
    }
    if (
      PIECES.whitePieces.includes(
        findSpot(x - 1 - i, y + 1 + i).firstElementChild
      )
    ) {
      break;
    }
    if (
      PIECES.blackPieces.includes(
        findSpot(x - 1 - i, y + 1 + i).firstElementChild
      )
    ) {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x + 1 + i, y - 1 - i)) {
      break;
    }
    if (
      findSpot(x + 1 + i, y - 1 - i) &&
      findSpot(x + 1 + i, y - 1 - i).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x + 1 + i, y - 1 - i)) {
      arr.push(findSpot(x + 1 + i, y - 1 - i));
    } else if (
      findSpot(x + 1 + i, y - 1 - i) &&
      findSpot(x + 1 + i, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(
          findSpot(x + 1 + i, y - 1 - i).firstElementChild
        )
      ) {
      }
    } else if (
      findSpot(x + 1 + i, y - 1 - i) &&
      findSpot(x + 1 + i, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(
          findSpot(x + 1 + i, y - 1 - i).firstElementChild
        )
      ) {
        arr.push(findSpot(x + 1 + i, y - 1 - i));
      }
    }
    if (
      findSpot(x + 1 + i, y - 1 - i) &&
      PIECES.whitePieces.includes(
        findSpot(x + 1 + i, y - 1 - i).firstElementChild
      )
    ) {
      break;
    }
    if (
      findSpot(x + 1 + i, y - 1 - i) &&
      PIECES.blackPieces.includes(
        findSpot(x + 1 + i, y - 1 - i).firstElementChild
      )
    ) {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x - 1 - i, y - 1 - i)) {
      break;
    }
    if (
      findSpot(x - 1 - i, y - 1 - i) &&
      findSpot(x - 1 - i, y - 1 - i).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x - 1 - i, y - 1 - i)) {
      arr.push(findSpot(x - 1 - i, y - 1 - i));
    } else if (
      findSpot(x - 1 - i, y - 1 - i) &&
      findSpot(x - 1 - i, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(
          findSpot(x - 1 - i, y - 1 - i).firstElementChild
        )
      ) {
      }
    } else if (
      findSpot(x - 1 - i, y - 1 - i) &&
      findSpot(x - 1 - i, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(
          findSpot(x - 1 - i, y - 1 - i).firstElementChild
        )
      ) {
        arr.push(findSpot(x - 1 - i, y - 1 - i));
      }
    }
    if (
      PIECES.whitePieces.includes(
        findSpot(x - 1 - i, y - 1 - i).firstElementChild
      )
    ) {
      break;
    }
    if (
      PIECES.blackPieces.includes(
        findSpot(x - 1 - i, y - 1 - i).firstElementChild
      )
    ) {
      break;
    }
  }
  return arr;
}

function findHorizontals(piece) {
  let x, y;
  var arr = [];
  x = piece.parentElement.value.x;
  y = piece.parentElement.value.y;
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x + 1 + i, y)) {
      break;
    }
    if (
      findSpot(x + 1 + i, y) &&
      findSpot(x + 1 + i, y).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x + 1 + i, y)) {
      arr.push(findSpot(x + 1 + i, y));
    } else if (
      findSpot(x + 1 + i, y) &&
      findSpot(x + 1 + i, y).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(findSpot(x + 1 + i, y).firstElementChild)
      ) {
      }
    } else if (
      findSpot(x + 1 + i, y) &&
      findSpot(x + 1 + i, y).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(findSpot(x + 1 + i, y).firstElementChild)
      ) {
        arr.push(findSpot(x + 1 + i, y));
      }
    }
    if (
      findSpot(x + 1 + i, y) &&
      PIECES.whitePieces.includes(findSpot(x + 1 + i, y).firstElementChild)
    ) {
      break;
    }
    if (
      findSpot(x + 1 + i, y) &&
      PIECES.blackPieces.includes(findSpot(x + 1 + i, y).firstElementChild)
    ) {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x - 1 - i, y)) {
      break;
    }
    if (
      findSpot(x - 1 - i, y) &&
      findSpot(x - 1 - i, y).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x - 1 - i, y)) {
      arr.push(findSpot(x - 1 - i, y));
    } else if (
      findSpot(x - 1 - i, y) &&
      findSpot(x - 1 - i, y).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(findSpot(x - 1 - i, y).firstElementChild)
      ) {
      }
    } else if (
      findSpot(x - 1 - i, y) &&
      findSpot(x - 1 - i, y).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(findSpot(x - 1 - i, y).firstElementChild)
      ) {
        arr.push(findSpot(x - 1 - i, y));
      }
    }
    if (PIECES.whitePieces.includes(findSpot(x - 1 - i, y).firstElementChild)) {
      break;
    }
    if (PIECES.blackPieces.includes(findSpot(x - 1 - i, y).firstElementChild)) {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x, y + i + 1)) {
      break;
    }
    if (
      findSpot(x, y + i + 1) &&
      findSpot(x, y + i + 1).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x, y + 1 + i)) {
      arr.push(findSpot(x, y + 1 + i));
    } else if (
      findSpot(x, y + 1 + i) &&
      findSpot(x, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(findSpot(x, y + 1 + i).firstElementChild)
      ) {
      }
    } else if (
      findSpot(x + 1 + i, y) &&
      findSpot(x, y + 1 + i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(findSpot(x, y + 1 + i).firstElementChild)
      ) {
        arr.push(findSpot(x, y + 1 + i));
      }
    }
    if (PIECES.whitePieces.includes(findSpot(x, y + 1 + i).firstElementChild)) {
      break;
    }
    if (PIECES.blackPieces.includes(findSpot(x, y + 1 + i).firstElementChild)) {
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if (!findSpot(x, y - 1 - i)) {
      break;
    }
    if (
      findSpot(x, y - 1 - i) &&
      findSpot(x, y - 1 - i).classList.contains("vision")
    ) {
      break;
    }
    if (findSpot(x, y - 1 - i)) {
      arr.push(findSpot(x, y - 1 - i));
    } else if (
      findSpot(x, y - 1 - i) &&
      findSpot(x, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.blackPieces.includes(findSpot(x, y - 1 - i).firstElementChild)
      ) {
      }
    } else if (
      findSpot(x, y - 1 - i) &&
      findSpot(x, y - 1 - i).firstElementChild
    ) {
      if (
        PIECES.whitePieces.includes(findSpot(x, y - 1 - i).firstElementChild)
      ) {
        arr.push(findSpot(x, y - 1 - i));
      }
    }
    if (PIECES.whitePieces.includes(findSpot(x, y - 1 - i).firstElementChild)) {
      break;
    }
    if (PIECES.blackPieces.includes(findSpot(x, y - 1 - i).firstElementChild)) {
      break;
    }
  }
  return arr;
}

function findHorses(piece) {
  let x, y;
  var arr = [];
  x = piece.parentElement.value.x;
  y = piece.parentElement.value.y;
  findSpot(x + 1, y + 2) && !findSpot(x + 1, y + 2).classList.contains("vision")
    ? arr.push(findSpot(x + 1, y + 2))
    : null;
  findSpot(x + 2, y + 2) && !findSpot(x + 2, y + 2).classList.contains("vision")
    ? arr.push(findSpot(x + 2, y + 1))
    : null;
  findSpot(x + 2, y - 2) && !findSpot(x + 2, y - 2).classList.contains("vision")
    ? arr.push(findSpot(x + 2, y - 1))
    : null;
  findSpot(x + 1, y - 2) && !findSpot(x + 1, y - 2).classList.contains("vision")
    ? arr.push(findSpot(x + 1, y - 2))
    : null;
  findSpot(x - 1, y - 2) && !findSpot(x - 1, y - 2).classList.contains("vision")
    ? arr.push(findSpot(x - 1, y - 2))
    : null;
  findSpot(x - 2, y - 1) && !findSpot(x - 2, y - 1).classList.contains("vision")
    ? arr.push(findSpot(x - 2, y - 1))
    : null;
  findSpot(x - 2, y + 1) && !findSpot(x - 2, y + 1).classList.contains("vision")
    ? arr.push(findSpot(x - 2, y + 1))
    : null;
  findSpot(x - 1, y + 2) && !findSpot(x - 1, y + 2).classList.contains("vision")
    ? arr.push(findSpot(x - 1, y + 2))
    : null;
  return arr;
}

function findWhitePawn(piece, color) {
  let x, y;
  var arr = [];
  piece.parentElement ? (x = piece.parentElement.value.x) : null;
  piece.parentElement ? (y = piece.parentElement.value.y) : null;
  if (piece.value.firstTime) {
    if (findSpot(x, y + 2) && !findSpot(x, y + 2).firstElementChild)
      !findSpot(x, y + 2).classList.contains("vision")
        ? arr.push(findSpot(x, y + 2))
        : null;
    if (findSpot(x, y + 1) && !findSpot(x, y + 1).firstElementChild)
      !findSpot(x, y + 1).classList.contains("vision")
        ? arr.push(findSpot(x, y + 1))
        : null;
  } else if (findSpot(x, y + 1) && !findSpot(x, y + 1).firstElementChild) {
    !findSpot(x, y + 1).classList.contains("vision")
      ? arr.push(findSpot(x, y + 1))
      : null;
  }
  if (
    findSpot(x + 1, y + 1) &&
    findSpot(x + 1, y + 1).firstElementChild &&
    PIECES.blackPieces.includes(findSpot(x + 1, y + 1).firstElementChild)
  ) {
    !findSpot(x + 1, y + 1).classList.contains("vision")
      ? arr.push(findSpot(x + 1, y + 1))
      : null;
  }
  if (
    findSpot(x - 1, y + 1) &&
    findSpot(x - 1, y + 1).firstElementChild &&
    PIECES.blackPieces.includes(findSpot(x - 1, y + 1).firstElementChild)
  ) {
    !findSpot(x - 1, y + 1).classList.contains("vision")
      ? arr.push(findSpot(x - 1, y + 1))
      : null;
  }
  for (let a of arr) {
    if (a) {
      if (
        a.firstElementChild &&
        PIECES.blackPieces.includes(a.firstElementChild)
      ) {
        color ? a.classList.add("possible") : null;
      }
      if (!PIECES.whitePieces.includes(a.firstElementChild)) {
        color ? a.classList.add("possible") : null;
      }
    }
  }
  return arr;
}

function findBlackPawn(piece, color) {
  let x, y;
  var arr = [];
  piece.parentElement ? (x = piece.parentElement.value.x) : null;
  piece.parentElement ? (y = piece.parentElement.value.y) : null;
  if (piece.value.firstTime) {
    if (findSpot(x, y - 2) && !findSpot(x, y - 2).firstElementChild)
      !findSpot(x, y - 2).classList.contains("vision")
        ? arr.push(findSpot(x, y - 2))
        : null;
    if (findSpot(x, y - 1) && !findSpot(x, y - 1).firstElementChild)
      !findSpot(x, y - 1).classList.contains("vision")
        ? arr.push(findSpot(x, y - 1))
        : null;
  } else if (findSpot(x, y + 1) && !findSpot(x, y - 1).firstElementChild) {
    !findSpot(x, y - 1).classList.contains("vision")
      ? arr.push(findSpot(x, y - 1))
      : null;
  }
  if (
    findSpot(x + 1, y - 1) &&
    findSpot(x + 1, y - 1).firstElementChild &&
    PIECES.whitePieces.includes(findSpot(x + 1, y - 1).firstElementChild)
  ) {
    !findSpot(x + 1, y - 1).classList.contains("vision")
      ? arr.push(findSpot(x + 1, y - 1))
      : null;
  }
  if (
    findSpot(x - 1, y - 1) &&
    findSpot(x - 1, y - 1).firstElementChild &&
    PIECES.whitePieces.includes(findSpot(x - 1, y - 1).firstElementChild)
  ) {
    !findSpot(x - 1, y - 1).classList.contains("vision")
      ? arr.push(findSpot(x - 1, y - 1))
      : null;
  }
  for (let a of arr) {
    if (a) {
      if (
        a.firstElementChild &&
        PIECES.whitePieces.includes(a.firstElementChild)
      ) {
        color && !PIECES.blackPieces.includes(a.firstElementChild)
          ? a.classList.add("possible")
          : null;
      }
      if (!PIECES.blackPieces.includes(a.firstElementChild)) {
        color && !PIECES.blackPieces.includes(a.firstElementChild)
          ? a.classList.add("possible")
          : null;
      }
    }
  }
  return arr;
}

function findSpot(x, y) {
  let elements = document.getElementsByClassName("el");
  for (let e of elements) {
    if (e.value.x == x && e.value.y == y) {
      return e;
    }
  }
  return undefined;
}