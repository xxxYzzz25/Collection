let number = 5,
  flag = 1,
  betflag = 1,
  countdown = document.querySelector('.countdown'),
  cardStartArea = document.querySelector('.cardStartArea'),
  item = document.querySelectorAll('.item'),
  third = document.querySelector('.third'),
  bankerbox = document.querySelectorAll('.bankerbox'),
  cardbox = document.querySelectorAll('.cardbox'),
  self = document.querySelectorAll('.self'),
  myBanker = document.querySelector('.myBanker'),
  bankerItem = document.querySelectorAll('.bankerItem'),
  myBet = document.querySelector('.myBet'),
  betItem = document.querySelectorAll('.betItem'),
  mybox = document.querySelector('.mybox'),
  betStartArea = document.querySelector('.mybox .namebox .betStartArea'),
  mybankerbox = document.querySelector('#mybankerbox'),
  mycircle = document.querySelectorAll('#mybankerbox .circle'),
  mybetbox = document.querySelector('#mybetbox'),
  mycardbox = document.querySelector('#mycardbox'),
  myTotal = document.querySelector('#myTotal'),
  result = document.querySelector('.result'),
  myResult = document.querySelector('#myResult'),
  betdata = {
    coinCount: [1, 4, 8, 11, 15],
    coinColor: ['Green', 'Purple', 'Yellow', 'Pink', 'Blue']
  },
  bullResultFunction;

// i18n
loadProperties('zh-TW');
function loadProperties(lan) {
  jQuery.i18n.properties({
    //加载资浏览器语言对应的资源文件
    name: 'strings', //资源文件名称
    path: './i18n/', //资源文件路径
    mode: 'map', //用Map的方式使用资源文件中的值
    language: lan,
    callback: function() {
      //加载成功后设置显示内容
      $('#bankerStr').html($.i18n.prop('string_bankerstr'));
      $('#betStr').html($.i18n.prop('string_betstr'));
    }
  });
}
$('#tw').click(function() {
  loadProperties('zh-TW');
  bullResultFunction();
});
$('#cn').click(function() {
  loadProperties('zh-CN');
  bullResultFunction();
});
$('#en').click(function() {
  loadProperties('en');
  bullResultFunction();
});

// 取得座標位置
function getPosition(element) {
  let x = 0;
  let y = 0;
  while (element) {
    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollLeft + element.clientTop;
    element = element.offsetParent;
  }
  return {
    x: x,
    y: y
  };
}

// 移動
function positionFun(a, b) {
  let x = 0;
  let y = 0;
  if (a.x > b.x) {
    x = -(a.x - b.x);
  } else {
    x = b.x - a.x;
  }
  if (a.y > b.y) {
    y = -(a.y - b.y);
  } else {
    y = b.y - a.y;
  }
  return {
    x: x,
    y: y
  };
}

// 判斷手機板
var os = (function() {
  var ua = navigator.userAgent,
    isAndroid = navigator.userAgent.match(/Android/i),
    isPhone = navigator.userAgent.match(/iPhone/i),
    isTablet = navigator.userAgent.match(/Tablet|iPad/i),
    isPc = !isPhone && !isAndroid && !isTablet;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
})();

// 亂數
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 搶注
let timer1 = setInterval(function() {
  if (number >= 0) {
    countdown.innerHTML = number;
    number -= 1;
  } else if (number < 0) {
    clearInterval(timer1);
    for (let i = 0; i < bankerbox.length; i++) {
      bankerbox[i].style.opacity = '0';
    }
    bankerbox[3].style.display = 'none';
    mybetbox.style.display = 'flex';
    toSecond();
  }
}, 1000);

// 下注
function toSecond() {
  myBanker.style.display = 'none';
  myBet.style.display = 'flex';
  for (let i = 0; i < bankerbox.length; i++) {
    bankerbox[i].style.opacity = '0';
  }
  number = 5;
  let timer2 = setInterval(function() {
    if (number >= 0) {
      countdown.innerHTML = number;
      number -= 1;
    } else if (number < 0) {
      clearInterval(timer2);
      myBet.style.display = 'none';

      if (os.isPhone || os.isAndroid) {
        item[3].style.height = '40%';
        mybox.firstElementChild.style.height = '35px';
        third.style.width = '40%';
        third.style.justifyContent = 'space-between';
      } else if (os.isTablet) {
        item[3].style.height = '40%';
        third.style.width = '37%';
        third.style.justifyContent = 'space-between';
      } else {
        item[3].style.height = '45%';
      }
      for (let i = 0; i < cardbox.length; i++) {
        cardbox[i].style.display = 'flex';
      }
      distribute();
    }
  }, 1000);
}

// 發牌
// distribute();
function distribute() {
  for (let i = 0; i < bankerbox.length; i++) {
    bankerbox[i].style.display = 'none';
  }
  mybetbox.style.display = 'none';

  // 定義四个花色
  let cardType = ['Peach', 'Heart', 'Diamond', 'Flower'];

  // 定義13張普通牌
  let cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // 生成一副撲克牌
  function generatePoker() {
    // 根據上面陣列生成54張牌
    let allCards = [];
    for (let i = 0, len1 = cardType.length; i < len1; i++) {
      for (let j = 0, len2 = cardValue.length; j < len2; j++) {
        allCards.push(cardType[i] + ',' + cardValue[j]);
      }
    }
    return allCards;
  }

  // 洗牌算法，傳入一個陣列，隨機亂序排列，不影響原陣列
  function shuffle(arr) {
    if (!arr) {
      throw '錯誤，請傳入正確陣列';
    }

    let newArr = arr.slice(0);

    for (let i = newArr.length - 1; i >= 0; i--) {
      // 隨機範圍
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let itemAtIndex = newArr[randomIndex];
      newArr[randomIndex] = newArr[i];
      newArr[i] = itemAtIndex;
    }
    return newArr;
  }

  // 生成撲克牌
  let allCards = generatePoker();

  // 洗牌 -不污染原先的陣列
  let randomCards = shuffle(allCards);

  //發牌
  let person = ['', '', '', ''];
  for (let i = 0; i < 20; i++) {
    switch (i % 4) {
      case 0:
        person[0] += `<img src='./images/Poker/${randomCards[i].split(',')[0]}/${randomCards[i].split(',')[1]}.png' class="pokerCard" />`;
        break;
      case 1:
        person[1] += `<img src='./images/Poker/${randomCards[i].split(',')[0]}/${randomCards[i].split(',')[1]}.png' class="pokerCard" />`;
        break;
      case 2:
        person[2] += `<img src='./images/Poker/${randomCards[i].split(',')[0]}/${randomCards[i].split(',')[1]}.png' class="pokerCard" />`;
        break;
      case 3:
        person[3] += `<img src='./images/Poker/${randomCards[i].split(',')[0]}/${randomCards[i].split(',')[1]}.png' class="pokerCard" />`;
        break;
    }
  }
  for (let i = 0; i < cardbox.length; i++) {
    cardbox[i].innerHTML = person[i];
  }

  // 自己的牌
  let totalNumber = 0,
    countThree = 0,
    arr = [];

  mycardbox.childNodes.forEach(function(item) {
    const last = arr => arr[arr.length - 1];
    let lastChild = last(item.src.split('/')).split('.')[0];
    if (lastChild == 'J' || lastChild == 'Q' || lastChild == 'K') {
      lastChild = 10;
    } else if (lastChild == 'A') {
      lastChild = 1;
    }
    let thisNumber = parseInt(lastChild);
    arr.push(thisNumber);

    let up = false;
    item.addEventListener('click', function() {
      if (up == false) {
        countThree++;
        if (countThree > 3) {
          countThree = 3;
          return;
        }
        totalNumber += thisNumber;
        if (os.isPc) {
          this.style.transform = 'translateY(-30px)';
        } else {
          this.style.transform = 'translateY(-15px)';
        }
      } else {
        countThree--;
        totalNumber -= thisNumber;
        this.style.transform = 'translateY(0)';
      }
      myTotal.textContent = totalNumber;
      up = !up;
    });
  });

  // 自己的牌總合
  function add() {
    return Array.from(arguments).reduce(function(sum, num) {
      return sum + num;
    });
  }
  let reducePlus = add.apply(null, arr);
  // 取個位數
  let bullNumber = reducePlus.toString().substring(1);
  // 判斷認取三張有沒有是10的倍數
  let threeSum = function(nums) {
    let result = [];
    nums.sort(function(a, b) {
      return a > b ? 1 : -1;
    });
    let len = nums.length;
    for (let i = 0; i < len - 2; i++) {
      if (i === 0 || nums[i] > nums[i - 1]) {
        for (let m = 1; m < 6; m++) {
          target = m * 10 - nums[i];
          j = i + 1;
          k = len - 1;
          while (j < k) {
            if (nums[j] + nums[k] === target) {
              result.push([nums[i], nums[j], nums[k]]);
              j++;
              k--;
              while (j < k && nums[j] === nums[j - 1]) {
                j++;
              }
              while (j < k && nums[k] === nums[k + 1]) {
                k--;
              }
            } else if (nums[j] + nums[k] < target) {
              j++;
            } else {
              k--;
            }
          }
        }
      }
    }
    return result;
  };
  // 更換語言
  bullResultFunction = function() {
    if (threeSum(arr)[0] == null) {
      myResult.textContent = $.i18n.prop('string_nocbull');
    } else {
      if (bullNumber == 0) {
        myResult.textContent = $.i18n.prop('string_bullbull');
      } else {
        myResult.textContent = `${$.i18n.prop('string_bull')}${bullNumber}`;
      }
    }
    return myResult.textContent;
  };
  bullResultFunction();

  // 發牌動畫
  let promise = new Promise(function(resolve, reject) {
    let pokerCard = document.querySelectorAll('.pokerCard');
    for (let i = 0; i < 20; i++) {
      let cardStart = document.createElement('img');
      cardStart.src = './images/Poker/Blue.png';
      cardStartArea.appendChild(cardStart);

      let position = positionFun(getPosition(cardStartArea.childNodes[i]), getPosition(pokerCard[i])),
        delay = i * 0.15;

      if (os.isPc) {
        move(cardStartArea.childNodes[i])
          .translate(position.x, position.y)
          .delay(`${delay}s`)
          .end();
      } else if (os.isTablet) {
        move(cardStartArea.childNodes[i])
          .translate(position.x - 29, position.y - 18)
          .delay(`${delay}s`)
          .scale(0.8)
          .end();
      } else {
        move(cardStartArea.childNodes[i])
          .translate(position.x - 29, position.y - 40)
          .delay(`${delay}s`)
          .scale(0.5)
          .end();
      }
    }
    resolve();
  });
  promise.then(function() {
    let promiseInterval = setInterval(function() {
      for (let i = 15; i < 20; i++) {
        cardStartArea.childNodes[i].style.visibility = 'hidden';
      }
      clearInterval(promiseInterval);
    }, 400);
  });
  promise.then(function() {
    let promiseInterval = setInterval(function() {
      cardbox[3].style.visibility = 'visible';
      result.style.display = 'block';
      clearInterval(promiseInterval);
    }, 3300);
  });
}

// 搶注動畫
let coinPic = document.querySelectorAll('.coinPic'),
  coin1Pos = positionFun(getPosition(coinPic[0]), getPosition(mycircle[0])),
  coin2Pos = positionFun(getPosition(coinPic[1]), getPosition(mycircle[0])),
  coin3Pos = positionFun(getPosition(coinPic[2]), getPosition(mycircle[1])),
  coin4Pos = positionFun(getPosition(coinPic[3]), getPosition(mycircle[0])),
  coin5Pos = positionFun(getPosition(coinPic[4]), getPosition(mycircle[1])),
  coin6Pos = positionFun(getPosition(coinPic[5]), getPosition(mycircle[2]));

bankerItem[1].onclick = function(e) {
  if (flag == 0) {
    return false;
  }
  if (os.isPhone || os.isPhone) {
    move('.coin1')
      .translate(coin1Pos.x + 8, coin1Pos.y + 8)
      .scale(1.8)
      .end();
  } else {
    move('.coin1')
      .translate(coin1Pos.x, coin1Pos.y)
      .scale(1.5)
      .end();
  }
  flag = 0;
};
bankerItem[2].onclick = function(e) {
  if (flag == 0) {
    return false;
  }
  if (os.isPhone || os.isPhone) {
    move('.coin2')
      .translate(coin2Pos.x + 8, coin2Pos.y + 8)
      .scale(1.8)
      .end();
    move('.coin3')
      .translate(coin3Pos.x + 8, coin3Pos.y + 8)
      .scale(1.8)
      .end();
  } else {
    move('.coin2')
      .translate(coin2Pos.x, coin2Pos.y)
      .scale(1.5)
      .end();
    move('.coin3')
      .translate(coin3Pos.x, coin3Pos.y)
      .scale(1.5)
      .end();
  }
  flag = 0;
};
bankerItem[3].onclick = function(e) {
  if (flag == 0) {
    return false;
  }
  if (os.isPhone || os.isPhone) {
    move('.coin4')
      .translate(coin4Pos.x + 8, coin4Pos.y + 8)
      .scale(1.8)
      .end();
    move('.coin5')
      .translate(coin5Pos.x + 8, coin5Pos.y + 8)
      .scale(1.8)
      .end();
    move('.coin6')
      .translate(coin6Pos.x + 8, coin6Pos.y + 8)
      .scale(1.8)
      .end();
  } else {
    move('.coin4')
      .translate(coin4Pos.x, coin4Pos.y)
      .scale(1.5)
      .end();
    move('.coin5')
      .translate(coin5Pos.x, coin5Pos.y)
      .scale(1.5)
      .end();
    move('.coin6')
      .translate(coin6Pos.x, coin6Pos.y)
      .scale(1.5)
      .end();
  }
  flag = 0;
};

// 下注動畫
for (let i = 0; i < betItem.length; i++) {
  betItem[i].onclick = function() {
    if (betflag == 0) {
      return false;
    }

    for (let j = 1; j <= betdata.coinCount[i]; j++) {
      let coin = document.createElement('img');
      coin.src = `./images/${betdata.coinColor[i]}.png`;
      betStartArea.appendChild(coin);
    }

    for (let k = 0; k <= betStartArea.childElementCount; k++) {
      let position = positionFun(getPosition(betStartArea), getPosition(mybetbox)),
        delay = k * 0.1,
        randomWidthPC = getRandom(k + 130, 440),
        randomHeightPC = getRandom(k - 50, 100),
        randomWidthTab = getRandom(k + 50, 300),
        randomHeightTab = getRandom(k - 60, 70),
        randomWidthPhone = getRandom(k + 30, 220),
        randomHeightPhone = getRandom(k - 30, 40);

      if (os.isPc) {
        move(betStartArea.childNodes[k])
          .translate(position.x + randomWidthPC, position.y + randomHeightPC)
          .delay(`${delay}s`)
          .scale(2)
          .end();
      } else if (os.isTablet) {
        move(betStartArea.childNodes[k])
          .translate(position.x + randomWidthTab, position.y + randomHeightTab)
          .delay(`${delay}s`)
          .scale(1.5)
          .end();
      } else {
        move(betStartArea.childNodes[k])
          .translate(position.x + randomWidthPhone, position.y + randomHeightPhone)
          .delay(`${delay}s`)
          .scale(1)
          .end();
      }
    }
    betflag = 0;
  };
}
