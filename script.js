// -----------
//  MAIN GAME
// -----------

//  VARIABLES
// -----------

// MAIN VARIABLES
let hardMode = false;
let corruptionCore = false;

// USER VARIABLES
let name = "";
let userRank = "Začátečník";
let userHP = 100;
let userMaxHP = 100;
let userGold = 0;
let userDeaths = 0;

let userWeapon = "Dřevěný Meč";
let userWeaponTier = 0;
let userMinDmg = 2;
let userMaxDmg = 5;
let userDmg = 0;

let userArmor = "Žádné";
let userArmorBonus = 0;
let userArmorTier = 0;

// MONSTER VARIABLES
let monsterDmg = 0;
let monsterHP = 0;

// SHOP VARIABLES
let shopBan = false;

// TEXT OBJECTS
const weaponText = {
    text1: 'Potřebujete nějakou zbraň? Drahý zákazníku, hned vám něco dobrého nabídnu...'
}





// -------------
//  OTHER STUFF
// -------------


// RANDOM RANDINT
function randint(min,max) {
    let fromZero = min
    min = 0
    max -= fromZero
    return Math.floor(Math.random()*(max+1)) + fromZero
}


// BUTTONS SOUND EFFECTS
let buttonSound = new Audio('./Music-Library/button.wav');
const buttons = document.querySelectorAll('.button')
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (event.target === button) {
            let buttonHover = new Audio('./Music-Library/buttonHover.wav');
            buttonHover.volume = 0.4;
            buttonHover.play();
        }
    });
    button.addEventListener('click', () => {
        buttonSound.volume = 0.3;
        buttonSound.play();
    });
});


// MAXWELL SFX
const maxwellNoseBtn = document.querySelector('.maxwellSfx');
let chosenSfx = '';
let maxwellSfx = new Audio(chosenSfx);

maxwellNoseBtn.addEventListener('click', () => {
    if (maxwellSfx.paused) {
        chooseMaxwellSfx();
        maxwellSfx.src = chosenSfx;
        maxwellSfx.play();
    };
});

function chooseMaxwellSfx() {
    let maxwellSfxNumber = randint(1, 5);
    switch (maxwellSfxNumber) {
        case 1:
            chosenSfx = './Music-Library/meow1.mp3'
            break
        case 2:
            chosenSfx = './Music-Library/meow2.mp3'
            break
        case 3:
            chosenSfx = './Music-Library/meow3.mp3'
            break
        case 4:
            chosenSfx = './Music-Library/meow4.mp3'
            break
        case 5:
            chosenSfx = './Music-Library/meow5.mp3'
            break
    };
};


// NAME MENU
const nameBlur = document.getElementById('backgroundStartBlur');
const nameMenu = document.querySelector('.containerName');

document.getElementById('playBtn').addEventListener('click', () => {
    name = document.getElementById('nameInput').value;
    nameBlur.setAttribute('closing', "");
    nameMenu.setAttribute('closing', "");
    nameMenu.addEventListener('animationend', () => {
        nameBlur.style.display = 'none';
        nameMenu.style.display = 'none';
    })
})


// OPENABLE STATUS
const openableMenu = document.getElementById('openMenu');
const backgroundBlur = document.getElementById('backgroundBlur');
const body = document.body;

const heading = document.getElementById('statusHeading')
const textCon = document.querySelector('.statusContainer')

const statusButton = document.getElementById('statusButton');

let isMenuOpening = false;

statusButton.addEventListener('click', () => {
    event.stopPropagation();

    isMenuOpening = true;
    openableMenu.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    openableMenu.style.display = 'block';
    openableMenu.classList.add('closableMenu')
    body.style.overflow = 'hidden';

    openableMenu.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                heading.style.display = 'block';
                textCon.style.display = 'flex';

                // RANK CHANGE
                if (userWeaponTier === 10 && userArmorTier === 10) {
                    userRank = "Overlord"
                } else if (userWeaponTier >= 8 && userArmorTier >= 8) {
                    userRank = "Warlord"
                } else if (userWeaponTier >= 6 && userArmorTier >= 6) {
                    userRank = "Lord"
                } else if (userWeaponTier >= 4 && userArmorTier >= 4) {
                    userRank = "Bojovník"
                } else if (userWeaponTier >= 2 && userArmorTier >= 2) {
                    userRank = "Dobrodruh"
                };

                // ASSIGNING VALUES
                document.querySelector('.statusName').innerHTML = `Jméno: ${name}`;
                document.querySelector('.statusRank').innerHTML = `Hodnost: ${userRank}`;
                document.querySelector('.statusHP').innerHTML = `Body života: ${userHP}/${userMaxHP}`;
                document.querySelector('.statusGold').innerHTML = `Zlato: ${userGold}`;

                document.querySelector('.statusWeapon').innerHTML = `Zbraň: ${userWeapon}`;
                document.querySelector('.statusDmg').innerHTML = `Útočná síla: ${userMinDmg}-${userMaxDmg}`;
                document.querySelector('.statusWepTier').innerHTML = `Úroveň zbraně: ${userWeaponTier}`;

                document.querySelector('.statusArmor').innerHTML = `Brnění: ${userArmor}`;
                document.querySelector('.statusArmorBonus').innerHTML = `Bonusové životy: ${userArmorBonus}`;
                document.querySelector('.statusArmTier').innerHTML = `Úroveň Brnění: ${userArmorTier}`;

                heading.setAttribute('appear', "");
                textCon.setAttribute('appear', "");
            }, 250)
        }
    })
    
    let windowClickHandler = () => {
        if (openableMenu.classList.contains('closableMenu')) {
            isMenuOpening = false;
            openableMenu.removeAttribute('open')
            backgroundBlur.removeAttribute('open')
            heading.removeAttribute('appear')
            textCon.removeAttribute('appear')
            openableMenu.setAttribute('close', "")
            backgroundBlur.setAttribute('close', "")
            heading.setAttribute('disappear', "")
            textCon.setAttribute('disappear', "")
    
            let animationEndHandler = () => {
                openableMenu.removeAttribute('close')
                backgroundBlur.removeAttribute('close')
                heading.style.display = 'none';
                textCon.style.display = 'none';
                heading.removeAttribute('disappear')
                textCon.removeAttribute('disappear')
                backgroundBlur.style.display = 'none';
                openableMenu.style.display = 'none';
                openableMenu.classList.remove('closableMenu')
                openableMenu.removeEventListener('animationend', animationEndHandler)
                body.style.overflow = '';
            }
    
            openableMenu.addEventListener('animationend', animationEndHandler)
            window.removeEventListener('click', windowClickHandler)
        }
    }
    window.addEventListener('click', windowClickHandler)
})

// BACKGROUND
const imageList = {
    spawn: "url('./Image-Library/spawn.jpg')",
    plains: "url('./Image-Library/plains.jpg')",
    desert: "url('./Image-Library/desert.jpg')",
    iceLands: "url('./Image-Library/icelands.jpg')",
    skeletonCastle: "url('./Image-Library/skeletoncastle.jpg')",
    magmaLands: "url('./Image-Library/magmalands.jpg')",
    swamp: "url('./Image-Library/swamp.jpg')",
    orcCastle: "url('./Image-Library/orccastle.jpg')",
    clouds: "url('./Image-Library/clouds.jpg')",
    vampireForest: "url('./Image-Library/vampireforest.jpg')",
    corruption: "url('./Image-Library/corruption.jpg')",
    altar: "url('./Image-Library/altar.jpg')"
} 

const keys = Object.keys(imageList);
let background = document.querySelector('.backgroundMenu');

function zoneChange(index) {
    console.log("Změněno");
    background.style.backgroundImage = imageList[keys[index]];
    background.id = keys[index];
}



// -----------
//   TEXT UI
// -----------

const textDiv = document.getElementById('textUI');
let isWriting = false;

const hlUp = document.getElementById('hlUp');
const hlDown = document.getElementById('hlDown');
const hlRight = document.getElementById('hlRight');
const hlLeft = document.getElementById('hlLeft');

let index = 0;
let wasZoneSwitched = false;

let timeoutId = null;
function stopAniText() {
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    };

    index = 0;
    currentTextArray = null;
    currentKeys = null;
    moneyGlitchCheck = true;
    monsterDead = false;
    userDead = false;
    specialDrei = false;
    specialVier = false;
    specialFunf = false;
    userDead = false;

    textDiv.style.cursor = 'default';
    removeClickListener();
    textDiv.removeEventListener('click', handleClickFighting);
    testIdkBro = false;
};


function removeClickListener() {
    console.log('Removing click listener');
    textDiv.removeEventListener('click', handleClick);
}

let currentTextArray = {};
let currentKeys = [];
let lastZone = 'spawn';
let testIdkBro = true;

function aniText(textArray) {
    if (lastZone !== background.id) {
        lastZone = background.id;
        return;
    }

    const keys = Object.keys(textArray);
    console.log(index)

    if(keys.length > 0) {
        timeoutId = setTimeout(() => {
            console.log('F TO PAY RESPECT BITCH')
            testIdkBro = true
            aniText2(textArray[keys[index]]);
            index++
        }, 200);
    }

    currentTextArray = textArray;
    currentKeys = keys;

    textDiv.removeEventListener('click', handleClick);
}

function opacityRemover() {
    const opaCheck = window.getComputedStyle(hlUp);
    if (opaCheck.opacity != 0) {
        hlUp.style.setProperty('--dynamicOpacity', opaCheck.opacity);
        hlDown.style.setProperty('--dynamicOpacity', opaCheck.opacity);
        hlRight.style.setProperty('--dynamicOpacity', opaCheck.opacity);
        hlLeft.style.setProperty('--dynamicOpacity', opaCheck.opacity);

        hlUp.style.animation = 'unglow 500ms';
        hlDown.style.animation = 'unglow 500ms';
        hlRight.style.animation = 'unglow 500ms';
        hlLeft.style.animation = 'unglow 500ms';

        hlUp.addEventListener('animationend', () => {
            hlUp.style.animation = '';
            hlDown.style.animation = '';
            hlRight.style.animation = '';
            hlLeft.style.animation = '';
        });
    };
};

function handleClick() {
    if (isWriting === false) {
        console.log(loc);

        isWriting = true;
        textDiv.style.cursor = 'default';

        opacityRemover();

        hlUp.removeAttribute('glow');
        hlDown.removeAttribute('glow');
        hlRight.removeAttribute('glow');
        hlLeft.removeAttribute('glow');

        aniText2(currentTextArray[currentKeys[index]]);
        index++;
    }
}

function aniText2(text, i = 0) {
    if (i === 0) {
        textDiv.textContent = '';
    }
    textDiv.textContent += text[i];
    if (i < text.length - 1 && testIdkBro) {
        setTimeout(() => aniText2(text, i + 1), 15);
    } else if (!testIdkBro) {
        return
    } else {
        isWriting = false;
        hlUp.setAttribute('glow', "");
        hlDown.setAttribute('glow', "");
        hlRight.setAttribute('glow', "");
        hlLeft.setAttribute('glow', "");
        setTimeout(() => {
            textDiv.style.cursor = 'pointer';
            textDiv.addEventListener('click', handleClick);
        }, 50);
    };
};

// BACKGROUND MUSIC
const audio = document.getElementById('music');
audio.volume = 1;
window.addEventListener('click', () => {
    audio.play();
})



// -----------------
//   ZONE CHANGING
// -----------------

let loc = 'spawn';

const zones = {
    shop: {
        text: {
            text1: 'Zdravím tě, zákazníku. Konstantin jméno mé. Lepší zboží nenajdeš široko daleko!',
            text2: 'Mohu ti nabídnout zbraně a brnění všeho druhu. V nejlepší kvalitě samozřejmě a za nejlepší cenu!'
        },
        background: "url('./Image-Library/shop.jpg')",
        music: "./Music-Library/spawnTheme.mp3"
    },
    spawn: {
        text: {
            text1: 'Nacházíš se na spawnu. Rozhlédneš se kolem sebe.',
            text2: 'Na levo vidíš obchod. Můžeš jít nakupovat k obchodníkovi Konstantinovi. Prodává zboží z celé říše!',
            text3: 'Před sebou také vidíš magickou fontánu se zářící vodou. Zdejší léčící fontána z legend. Vyléčí vše.',
            text4: 'Za fontánou zahlédneš obří bránu. Je to ta brána o které si četl ve všech těch knížkách.',
            text5: 'Porta Magnifica! Magická brána, která tě může udělat silnějším. Drží v sobě nepředstavitelné bohatství. Ale také spoustu nebezpečí...'
        },
        background: "url('./Image-Library/spawn.jpg')",
        music: "./Music-Library/spawnTheme.mp3"
    },
    fountain: {
        text: {
            text1: 'Přijdeš k fontáně. Ihned cítíš tu velkou magickou moc, která uniká z její léčivé křišťálové vody.',
            text2: 'Letí kolem lehce zraněný ptáček. Už po jedné vypité kapce zase radostně zpívá a letí dál. Opravdu dar z nebes.'
        },
        background: "url('./Image-Library/fountain.jpg')",
        music: "./Music-Library/fountainTheme.mp3"
    },
    gate: {
        text: {
            text1: 'Už z dálky ji zahlédneš. Jak se tyčí mezi útesy. Je ještě větší než sis ji představoval.',
            text2: 'Je s ní vázaných několik příběhů a teoriích o jejím vzniku. Jedna říká, že byla vystavěna velmi vyspělou civilizací. Nyní už zapomenutou v čase.',
            text3: 'Jiná říká, že ji stvořili bohové. A že našim úkolem je ji prozkoumávat. Abychom získali sílu a mohli zachránit náš svět. Kdyby přišla kalamita.',
            text4: 'Všechno jsou to ovšem jen spekulace, o kterých se mluví už po staletí. Možná se ale dozvíš pravdu na konci své cesty.'
        },
        background: "url('./Image-Library/gate.jpeg')",
        music: "./Music-Library/gateTheme.mp3"
    },
    plains: {
        text: {
            text1: 'Rozhlédneš se kolem sebe, kam tě brána transportovala. Přivítá tě příjemná vůně přírody. Tohle není tak špatný začátek.',
            text2: 'Nacházíš se na pláni. Příjemné místo. Snad to tak bude i následovat..'
        },
        background: "url('./Image-Library/plains.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    desert: {
        text: {
            text1: 'Než se vůbec stihneš probrat z teleportace, oslepí tě žhnoucí slunce a obrovské teplo.',
            text2: 'Nacházíš se na poušti. Velké, horké, poušti.'
        },
        background: "url('./Image-Library/desert.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    iceLands: {
        text: {
            text1: 'Z jednoho extrému do druhého extrému. Už ti není teplo, teď začínáš pro změnu mrznout.',
            text2: 'Všude jen bílo a ledovce. Nacházíš se v ledové pustině.'
        },
        background: "url('./Image-Library/icelands.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    skeletonCastle: {
        text: {
            text1: 'Jakmile se probereš po změně prostředí, mile tě překvapí nynější zóna. Normální teplota.',
            text2: 'Nacházíš se v lehce rozpadajícím se hradě. V dáli jdou slyšet divné klepací a skřípací zvuky. Připomíná ti to.. kosti?'
        },
        background: "url('./Image-Library/skeletoncastle.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    magmaLands: {
        text: {
            text1: 'Ihned začneš litovat tvého dalšího přesunu. Na tohle prostředí nemá ani dřívější poušť.',
            text2: 'Nacházíš se v lávové pustině. Sopka a láva všude kam se podíváš. Je ti hodně.. teplo.'
        },
        background: "url('./Image-Library/magmalands.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    swamp: {
        text: {
            text1: 'Oddychneš si, že tě tady nečekalo místo, s obří zimou. Místo toho se zaboříš do bahna.',
            text2: 'Nacházíš se v bažině. Stále jedno z nejvíc přívětivých míst, za tuhle cestu.'
        },
        background: "url('./Image-Library/swamp.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    orcCastle: {
        text: {
            text1: 'Hezky tě přivítá povědomá struktura. Tentokrát to nevypadá na úplnou zříceninu jak posledně.',
            text2: 'Nacházíš se v hradě. Vypadá vyspěle. To neznamená že bude čas na odpočinek.'
        },
        background: "url('./Image-Library/orccastle.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    clouds: {
        text: {
            text1: 'Ocitáš se v ještě nespatřeném prostředí. Uklidnující pocit projde tvým tělem, kvůli krásným výhledům.',
            text2: 'Nacházíš se v mracích. Líbí se ti tady. Dokud ti nedojde, že na každém rohu čeká nebezpečí. A tahle zóna není výjimkou. Tvá cesta se blíží ke konci..'
        },
        background: "url('./Image-Library/clouds.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    vampireForest: {
        text: {
            text1: 'Z hezky světlého místa do temného. Cítíš že je tady něco špatně. Všude jde cítit krev.',
            text2: 'Nacházíš se v temném lese. Jediný zdroj světla je daleký měsíc na obloze. Co lehce prosvítá skrz stromy. Jsi v předposlední zóně. Už jen kousek.'
        },
        background: "url('./Image-Library/vampireforest.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    corruptionZone: {
        text: {
            text1: 'Došel jsi do poslední zóny. Možná si čekal trochu příjemnější místo. V okolí je nepříjemná energie. Pravý opak, co si cítil z fontány.',
            text2: 'Nacházíš se v zóně korupce. Asi by si tu neměl strávit moc času. Zdejší energie není moc přátelská.'
        },
        background: "url('./Image-Library/corruption.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
    altar: {
        text: {
            text1: 'Cítíš se zmaten. Všichni totiž ví, že v bráně je jen deset zón. Co je tedy tohle za místo?',
            text2: 'Nacházíš se u oltáře. Vypadá to, že tohle místo blokuje nechtěnou energii z předchozí zóny.',
            text3: 'Po chvíli co se koukáš po okolí, si všimneš v oltáři kulatého otvoru. Vypadá důležitě..'
        },
        background: "url('./Image-Library/altar.jpg')",
        music: "./Music-Library/altarTheme.mp3"
    },
}
const zoneKeys =  Object.keys(zones);
const monsters = {
    goblin: {
        name: 'Goblin',
        health: 20,
        minDmg: 2,
        maxDmg: 4,
        gold: 10,
        image: './Image-Library/goblin.png'
    },
    goblinLeader: {
        name: 'Vůdce Goblinů',
        health: 35,
        minDmg: 3,
        maxDmg: 10,
        gold: 25,
        tier: 0,
        image: './Image-Library/goblinLeader.png'
    },
    mummy: {
        name: 'Mumie',
        health: 40,
        minDmg: 3,
        maxDmg: 15,
        gold: 25,
        image: './Image-Library/mummy.png'
    },
    sandman: {
        name: 'Písečný Muž',
        health: 60,
        minDmg: 5,
        maxDmg: 17,
        gold: 50,
        tier: 1,
        image: './Image-Library/sandman.png'
    },
    iceGuardian: {
        name: 'Ledový Ochránce',
        health: 65,
        minDmg: 4,
        maxDmg: 17,
        gold: 50,
        image: './Image-Library/iceGuardian.png'
    },
    iceKnight: {
        name: 'Ledový Rytíř',
        health: 80,
        minDmg: 6,
        maxDmg: 20,
        gold: 100,
        tier: 2,
        image: './Image-Library/iceKnight.png'
    },
    skeleton: {
        name: 'Kostlivec',
        health: 85,
        minDmg: 6,
        maxDmg: 23,
        gold: 125,
        image: './Image-Library/skeleton.png'
    },
    skeletonKing: {
        name: 'Král Kostlivců',
        health: 95,
        minDmg: 9,
        maxDmg: 25,
        gold: 250,
        tier: 3,
        image: './Image-Library/skeletonKing.png'
    },
    magmaMinion: {
        name: 'Magma Minion',
        health: 100,
        minDmg: 8,
        maxDmg: 25,
        gold: 250,
        image: './Image-Library/magmaMinion.png'
    },
    magmaTrasher: {
        name: 'Magma Trasher',
        health: 130,
        minDmg: 10,
        maxDmg: 30,
        gold: 500,
        tier: 4,
        image: './Image-Library/magmaTrasher.png'
    },
    swampMonster: {
        name: 'Bažinové Monstrum',
        health: 140,
        minDmg: 10,
        maxDmg: 30,
        gold: 500,
        image: './Image-Library/swampMonster.png'
    },
    swampGuardian: {
        name: 'Ochránce Bažin',
        health: 170,
        minDmg: 15,
        maxDmg: 40,
        gold: 1000,
        tier: 5,
        image: './Image-Library/swampGuardian.png'
    },
    orc: {
        name: 'Orc',
        health: 175,
        minDmg: 15,
        maxDmg: 45,
        gold: 1000,
        image: './Image-Library/orc.png'
    },
    orcLeader: {
        name: 'Orc Vojevůdce',
        health: 240,
        minDmg: 20,
        maxDmg: 55,
        gold: 2000,
        tier: 6,
        image: './Image-Library/orcLeader.png'
    },
    cloudLurker: {
        name: 'Cloud Lurker',
        health: 250,
        minDmg: 25,
        maxDmg: 70,
        gold: 2000,
        image: './Image-Library/cloudLurker.png'
    },
    cloudLord: {
        name: 'Cloud Lord',
        health: 320,
        minDmg: 30,
        maxDmg: 80,
        gold: 4000,
        tier: 7,
        image: './Image-Library/cloudLord.png'
    },
    vampire: {
        name: 'Upír',
        health: 340,
        minDmg: 30,
        maxDmg: 80,
        gold: 3000,
        image: './Image-Library/vampire.png'
    },
    vampireKing: {
        name: 'Upíří Král',
        health: 400,
        minDmg: 45,
        maxDmg: 90,
        gold: 6000,
        tier: 8,
        image: './Image-Library/vampireKing.png'
    },
    corrupted: {
        name: 'Corrupted',
        health: 450,
        minDmg: 50,
        maxDmg: 95,
        gold: 5000,
        image: './Image-Library/corrupted.png'
    },
    corruptionLord: {
        name: 'Lord Korupce',
        health: 800,
        minDmg: 100,
        maxDmg: 150,
        gold: 10000,
        tier: 9,
        image: './Image-Library/corruptionLord.png'
    }
};
const monsterKeys = Object.keys(monsters);

let visitedGate = false;
let visitedPlains = false;
let visitedDesert = false;
let visitediceLands = false;
let visitedSkeletonCastle = false;
let visitedMagmaLands = false;
let visitedSwamp = false;
let visitedOrcCastle = false;
let visitedClouds = false;
let visitedVampireForest = false;
let visitedCorruptionZone = false;

const spawnEventBtn = document.getElementById('spawnEventBtn');
const shopEventBtn = document.getElementById('shopEventBtn');
const fountainEventBtn = document.getElementById('fountainEventBtn');
const gateEventBtn = document.getElementById('gateEventBtn');
const altarEventBtn = document.getElementById('altarEventBtn');

const swordIconCon = document.getElementById('swordIconCon');
const fightBtnBase = document.getElementById('fightBtnBase');

let currentEventBtn = spawnEventBtn;

let currentMonster = '';
let currentBossMonster = '';

function zoneChange(direction) {
    const keys = Object.keys(zones);
    let index = keys.indexOf(loc);
    let nextIndex = index + direction
    console.log('pouští se')

    if (nextIndex >= 0 && nextIndex < keys.length) {
        console.log('změněno?')
        loc = keys[nextIndex];
        console.log(loc);

        opacityRemover();

        hlUp.removeAttribute('glow');
        hlDown.removeAttribute('glow');
        hlRight.removeAttribute('glow');
        hlLeft.removeAttribute('glow');

        background.style.backgroundImage = zones[loc].background;
        if (audio.src.split('/').pop() !== zones[loc].music.split('/').pop()) {
            audio.src = zones[loc].music;
        }

        stopAniText();
        aniText(zones[loc].text);

        switch(loc) {
            case 'spawn':
                currentEventBtn.removeAttribute('appear');
                currentEventBtn.setAttribute('disappear', "");
                currentEventBtn.addEventListener('animationend', () => {
                    currentEventBtn.style.visibility = 'hidden';
                    currentEventBtn.style.zIndex = '-1';
                    currentEventBtn.removeAttribute('disappear');
            
                    spawnEventBtn.style.visibility = 'visible';
                    spawnEventBtn.style.zIndex = '3';
                    spawnEventBtn.setAttribute('appear', "");
                    currentEventBtn = spawnEventBtn;
                }, {once: true});
                fightBtnDisappear();
                break
            case 'shop':
                currentEventBtn.removeAttribute('appear');
                currentEventBtn.setAttribute('disappear', "");
                currentEventBtn.addEventListener('animationend', () => {
                    currentEventBtn.style.visibility = 'hidden';
                    currentEventBtn.style.zIndex = '-1';
                    currentEventBtn.removeAttribute('disappear');
            
                    shopEventBtn.style.visibility = 'visible';
                    shopEventBtn.style.zIndex = '3';
                    shopEventBtn.setAttribute('appear', "");
                    currentEventBtn = shopEventBtn;
                }, {once: true});
                break
            case 'fountain':
                currentEventBtn.removeAttribute('appear');
                currentEventBtn.setAttribute('disappear', "");
                currentEventBtn.addEventListener('animationend', () => {
                    currentEventBtn.style.visibility = 'hidden';
                    currentEventBtn.style.zIndex = '-1';
                    currentEventBtn.removeAttribute('disappear');
            
                    fountainEventBtn.style.visibility = 'visible';
                    fountainEventBtn.style.zIndex = '3';
                    fountainEventBtn.setAttribute('appear', "");
                    currentEventBtn = fountainEventBtn;
                }, {once: true});
                break
            case 'gate':
                visitedGate = true;
                if (currentEventBtn !== gateEventBtn) {
                    currentEventBtn.removeAttribute('appear');
                    currentEventBtn.setAttribute('disappear', "");
                    currentEventBtn.addEventListener('animationend', () => {
                        currentEventBtn.style.visibility = 'hidden';
                        currentEventBtn.style.zIndex = '-1';
                        currentEventBtn.removeAttribute('disappear');
                
                        gateEventBtn.style.visibility = 'visible';
                        gateEventBtn.style.zIndex = '3';
                        gateEventBtn.setAttribute('appear', "");
                        currentEventBtn = gateEventBtn;
                    }, {once: true});
                }

                // FIGHT BTN
                function fightBtnDisappear() {
                    if (fightBtn.style.display === 'block') {
                        swordIconCon.setAttribute('disappear', "");
                        fightBtnBase.setAttribute('disappear', "");
                        swordIconCon.removeAttribute('appear');
                        fightBtnBase.removeAttribute('appear');  
                        fightBtnBase.addEventListener('animationend', () => {
                            fightBtn.style.display = 'none';
                            swordIconCon.style.display = 'none';
                            fightBtnBase.style.display = 'none';
                            swordIconCon.removeAttribute('disappear');
                            fightBtnBase.removeAttribute('disappear');  
                        }, {once: true});
                    }
                }
                fightBtnDisappear();
                break
            case 'plains':
                visitedPlains = true;
                currentMonster = 'goblin';
                currentBossMonster = 'goblinLeader';

                // FIGHT BTN
                function fightBtnAppear() {
                    if (fightBtn.style.display = 'none') {
                        fightBtn.style.display = 'block';
                        swordIconCon.style.display = 'block';
                        fightBtnBase.style.display = 'block';
                        swordIconCon.setAttribute('appear', "");
                        fightBtnBase.setAttribute('appear', "");  
                    }
                }
                fightBtnAppear();
                break
            case 'desert':
                visitedDesert = true;
                currentMonster = 'mummy';
                currentBossMonster = 'sandman';
                fightBtnAppear();
                break
            case 'iceLands':
                visitediceLands = true;
                currentMonster = 'iceGuardian';
                currentBossMonster = 'iceKnight';
                fightBtnAppear();
                break
            case 'skeletonCastle':
                visitedSkeletonCastle = true;
                currentMonster = 'skeleton';
                currentBossMonster = 'skeletonKing';
                fightBtnAppear();
                break
            case 'magmaLands':
                visitedMagmaLands = true;
                currentMonster = 'magmaMinion';
                currentBossMonster = 'magmaTrasher';
                fightBtnAppear();
                break
            case 'swamp':
                visitedSwamp = true;
                currentMonster = 'swampMonster';
                currentBossMonster = 'swampGuardian';
                fightBtnAppear();
                break
            case 'orcCastle':
                visitedOrcCastle = true;
                currentMonster = 'orc';
                currentBossMonster = 'orcLeader';
                fightBtnAppear();
                break
            case 'clouds':
                visitedClouds = true;
                currentMonster = 'cloudLurker';
                currentBossMonster = 'cloudLord';
                fightBtnAppear();
                break
            case 'vampireForest':
                visitedVampireForest = true;
                currentMonster = 'vampire';
                currentBossMonster = 'vampireKing';
                fightBtnAppear();
                break
            case 'corruptionZone':
                visitedCorruptionZone = true;
                currentMonster = 'corrupted';
                currentBossMonster = 'corruptionLord';
                if (currentEventBtn !== gateEventBtn) {
                    currentEventBtn.removeAttribute('appear');
                    currentEventBtn.setAttribute('disappear', "");
                    currentEventBtn.addEventListener('animationend', () => {
                        currentEventBtn.style.visibility = 'hidden';
                        currentEventBtn.style.zIndex = '-1';
                        currentEventBtn.removeAttribute('disappear');
                
                        gateEventBtn.style.visibility = 'visible';
                        gateEventBtn.style.zIndex = '3';
                        gateEventBtn.setAttribute('appear', "");
                        currentEventBtn = gateEventBtn;
                    }, {once: true});
                }
                fightBtnAppear();
                break
            case 'altar':
                currentEventBtn.removeAttribute('appear');
                currentEventBtn.setAttribute('disappear', "");
                currentEventBtn.addEventListener('animationend', () => {
                    currentEventBtn.style.visibility = 'hidden';
                    currentEventBtn.style.zIndex = '-1';
                    currentEventBtn.removeAttribute('disappear');
            
                    altarEventBtn.style.visibility = 'visible';
                    altarEventBtn.style.zIndex = '3';
                    altarEventBtn.setAttribute('appear', "");
                    currentEventBtn = altarEventBtn;
                }, {once: true});
                fightBtnDisappear();
                break
        };

    } else {
        console.log("Konec světa. Bariéra chuj.");
    }
};


fountainEventBtn.addEventListener('click', () => {
    console.log('FONTAN CHUJ');
    hpDifference = userMaxHP - userHP;
    userHP = userMaxHP;
    statusHealth.innerHTML = `HP: ${userHP}`;
    text = {
        text1: `Voda z fontány tě vyléčila o ${hpDifference} životů. Cítíš se jako nový!`
    }
    stopAniText();
    aniText(text);
});


nameMenu.addEventListener('animationend', () => {
    setTimeout(() => {aniText(zones[loc].text)}, 800);
});
document.addEventListener('DOMContentLoaded', () => {
    audio.src = zones[loc].music;
});

document.getElementById('leftBtn').addEventListener('click', () => {
    zoneChange(-1);
})

document.getElementById('rightBtn').addEventListener('click', () => {
    zoneChange(1);
})



// --------
//   SHOP
// --------

const swordBtn = document.querySelector('.shopSwordBtn');
const armorBtn = document.querySelector('.shopArmorBtn');
const swordGlow = document.querySelector('.swordGlow');
const armorGlow = document.querySelector('.armorGlow');

function shopOpaSwordRemover(item) {
    const shopOpaCheck = window.getComputedStyle(item).opacity;
    if (shopOpaCheck != 0) {
        item.style.setProperty('--dynamicOpacity', shopOpaCheck);
        item.style.animation = 'unglow 500ms';

        item.addEventListener('animationend', () => {
            item.style.animation = '';
        });
    };
};

function shopOpaArmorRemover(item) {
    const shopOpaCheck = window.getComputedStyle(item).opacity;
    if (shopOpaCheck != 0) {
        item.style.setProperty('--dynamicOpacity', shopOpaCheck);
        item.style.animation = 'unglow 500ms';

        item.addEventListener('animationend', () => {
            item.style.animation = '';
        });
    };
};

swordBtn.addEventListener('mouseenter', () => {
    console.log('MEČ')
    swordGlow.classList.add('glowing');
    swordBtn.addEventListener('mouseleave', () => {
        shopOpaSwordRemover(swordGlow);
        swordGlow.classList.remove('glowing');
    });
});

armorBtn.addEventListener('mouseenter', () => {
    console.log('BRNKO')
    armorGlow.classList.add('glowing');
    armorBtn.addEventListener('mouseleave', () => {
        shopOpaArmorRemover(armorGlow);
        armorGlow.classList.remove('glowing');
    });
});

let scrollHorizontal = document.querySelector('.shopScrollerWeapons');
scrollHorizontal.addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY * 5;
    e.preventDefault();
}, { passive: false });

let scrollHorizontal2 = document.querySelector('.shopScrollerArmors');
scrollHorizontal2.addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY * 5;
    e.preventDefault();
}, { passive: false });

let scrollHorizontal3 = document.querySelector('.zoneScroller');
scrollHorizontal3.addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY * 5;
    e.preventDefault();
}, { passive: false });

function itemGlow(element, wepOrArmor) {
    if (wepOrArmor === 1) {
        console.log('weaponChosen')
        let productGlow = document.getElementById(element.id + 'Glow');
        productGlow.classList.add('glowing');
        element.addEventListener('mouseleave', () => {
            shopOpaSwordRemover(productGlow);
            productGlow.classList.remove('glowing');
        });
    } else {
        console.log('armorChosen')
        let productGlow = document.getElementById(element.id + 'Glow');
        productGlow.classList.add('glowing');
        element.addEventListener('mouseleave', () => {
            shopOpaArmorRemover(productGlow);
            productGlow.classList.remove('glowing');
        });
    };
};

let itemElements = document.querySelectorAll('.itemElement');

let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
            let element = mutation.target;
            if (element.classList.contains('unlocked')) {
                element.addEventListener('mouseenter', () => {
                    console.log(element.id);
                    itemGlow(element, 1);
                });
            };
        };
    });
});

itemElements.forEach(element => {
    observer.observe(element, { attributes: true });
});

const shopMenu = document.querySelector('.scrollerBase');
const categoryChoice = document.querySelector('.shopProductChoice');
const shopWeaponsList = document.querySelector('.shopScrollerWeapons');
const shopArmorsList = document.querySelector('.shopScrollerArmors');

const choiceElement1 = document.querySelector('.choiceElement1');
const choiceElement2 = document.querySelector('.choiceElement2');

const swordsForPurchase = document.querySelectorAll('.itemSwordElement');

let isWeaponScrollerOpen = false;
let isArmorScrollerOpen = false;

let isBuyingMenuOpen = false;
let deutschChecker = false;

let firstWeaponsOpen = true;
let firstArmorsOpen = true;

const shopBtn = document.getElementById('shopEventBtn');
shopBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    // BEGIN OPENING SEQUENCE
    isMenuOpening = true;
    shopMenu.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    shopMenu.style.display = 'block';
    shopMenu.classList.add('closableMenu')
    body.style.overflow = 'hidden';

    shopMenu.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                categoryChoice.style.display = 'flex';
                categoryChoice.setAttribute('appear', "");
            }, 250)
        }
    })


    choiceElement1.addEventListener('click', (event) => { // WEAPONS
        event.stopPropagation();

        if (isWeaponScrollerOpen === false) {
            isWeaponScrollerOpen = true;
            categoryChoice.setAttribute('disappear', "");
            categoryChoice.addEventListener('animationend', handleAnimationEndWeapons, { once: true });
        };
    });

    function handleAnimationEndWeapons() {
        categoryChoice.removeAttribute('disappear');
        categoryChoice.style.display = 'none';

        setTimeout(() => {
            shopWeaponsList.style.display = 'grid';
            shopWeaponsList.setAttribute('appear', "");

            const bronzeSword = document.getElementById('bronzeSword');
            if (!bronzeSword.classList.contains('unlocked')) {
                setTimeout(() => {
                    unlockingItem(bronzeSword);
                }, 400);
            };

            if (firstWeaponsOpen) {
                firstWeaponsOpen = false;
                setTimeout(() => {
                    unlockStuff()
                }, 2100);
            } else {
                unlockStuff()
            }
            
            function unlockStuff() {
                let currentWeapon = document.getElementById(keysWeapon[userWeaponTier-1]);
                let nextWeapon = document.getElementById(keysWeapon[userWeaponTier]);

                let weapons = Array.from(document.querySelectorAll('.itemSwordElement'));
                let userWeaponIndex = weapons.findIndex(weapon => weapon.id === currentWeapon.id);

                if (!currentWeapon.classList.contains('unlocked')) {
                    for (let i = 0; i <= userWeaponIndex; i++) {
                        let weapon = weapons[i];
                        let weaponCheckmark = document.getElementById(weapon.id + 'Check');
                        if (!weapon.classList.contains('unlocked')) {
                            unlockingWeapon(weapon);
                        }
                        if (!weapon.classList.contains('purchased')) {
                            setTimeout(() => {
                                checkmarkIdkJa2(weaponCheckmark, weapon);
                            }, 400);
                        }
                    }
                    unlockingWeapon(nextWeapon);

                    function checkmarkIdkJa2(element, weapon) {
                        element.style.display = 'block';
                        element.setAttribute('appear', "");
                        element.addEventListener('animationend', () => {
                            element.removeAttribute('appear');
                            weapon.classList.add('purchased');
                        }, {once: true});
                    }
                } else {
                    if (!nextWeapon.classList.contains('unlocked')) {
                        setTimeout(() => {
                            unlockingItem(nextWeapon);
                        }, 400);
                    }
                    if (!currentWeapon.classList.contains('purchased')) {
                        function checkmarkIdkJa() {
                            let checkmark = document.getElementById(currentWeapon.id + 'Check');
                            checkmark.style.display = 'block';
                            checkmark.setAttribute('appear', "");
                            checkmark.addEventListener('animationend', () => {
                                checkmark.removeAttribute('appear');
                                currentWeapon.classList.add('purchased');
                            }, {once: true});
                        }
                        setTimeout(() => {
                            checkmarkIdkJa();
                        }, 400);
                    }
                }
            }

        }, 250);
    };

    let animationQueue = [];

    function unlockingWeapon(element) {
        animationQueue.push(element);
    
        if (animationQueue.length === 1) {
            startAnimation(element);
        }
    };
    
    function startAnimation(element) {
        if (element.classList.contains('unlocked')) {
            animationQueue.shift();
            if (animationQueue.length > 0) {
                startAnimation(animationQueue[0]);
            }
            return;
        }
    
        deutschChecker = true;
        element.classList.add('unlocked');
        lockId = document.getElementById(element.id + 'Lock');
        lockId.addEventListener('animationend', () => {
            setTimeout(() => {
                lockId.setAttribute('disappear', "");
                lockId.addEventListener('animationend', () => {
                    lockId.removeAttribute('disappear')
                    lockId.setAttribute('unlocked', "");
                    deutschChecker = false;
    
                    animationQueue.shift();
    
                    if (animationQueue.length > 0) {
                        startAnimation(animationQueue[0]);
                    }
                }, {once: true});
            }, 100);
        }, {once: true});
    }


    choiceElement2.addEventListener('click', (event) => { // ARMORS
        event.stopPropagation();

        if (isArmorScrollerOpen === false) {
            isArmorScrollerOpen = true;
            categoryChoice.setAttribute('disappear', "");
            categoryChoice.addEventListener('animationend', handleAnimationEndArmors, { once: true });
        }
    });

    function handleAnimationEndArmors() {
        categoryChoice.removeAttribute('disappear');
        categoryChoice.style.display = 'none';
        setTimeout(() => {
            shopArmorsList.style.display = 'grid';
            shopArmorsList.setAttribute('appear', "");

            const leatherArmor = document.getElementById('leatherArmor');
            if (!leatherArmor.classList.contains('unlocked')) {
                setTimeout(() => {
                    unlockingItem(leatherArmor);
                }, 400);
            };

            if (firstArmorsOpen) {
                firstArmorsOpen = false;
                setTimeout(() => {
                    unlockStuff()
                }, 2100);
            } else {
                unlockStuff()
            }
            
            function unlockStuff() {
                let currentArmor = document.getElementById(keysArmor[userArmorTier-1]);
                let nextArmor = document.getElementById(keysArmor[userArmorTier]);

                let armors = Array.from(document.querySelectorAll('.itemArmorElement'));
                let userArmorIndex = armors.findIndex(armor => armor.id === currentArmor.id);

                if (!currentArmor.classList.contains('unlocked')) {
                    for (let i = 0; i <= userArmorIndex; i++) {
                        let armor = armors[i];
                        let armorCheckmark = document.getElementById(armor.id + 'Check');
                        if (!armor.classList.contains('unlocked')) {
                            unlockingWeapon(armor);
                        }
                        if (!armor.classList.contains('purchased')) {
                            setTimeout(() => {
                                checkmarkIdkJa2(armorCheckmark, armor);
                            }, 400);
                        }
                    }
                    unlockingWeapon(nextArmor);

                    function checkmarkIdkJa2(element, armor) {
                        element.style.display = 'block';
                        element.setAttribute('appear', "");
                        element.addEventListener('animationend', () => {
                            element.removeAttribute('appear');
                            armor.classList.add('purchased');
                        }, {once: true});
                    }
                } else {
                    if (!nextArmor.classList.contains('unlocked')) {
                        setTimeout(() => {
                            unlockingItem(nextArmor);
                        }, 400);
                    }
                    if (!currentArmor.classList.contains('purchased')) {
                        function checkmarkIdkJa() {
                            let checkmark = document.getElementById(currentArmor.id + 'Check');
                            checkmark.style.display = 'block';
                            checkmark.setAttribute('appear', "");
                            checkmark.addEventListener('animationend', () => {
                                checkmark.removeAttribute('appear');
                                currentArmor.classList.add('purchased');
                            }, {once: true});
                        }
                        setTimeout(() => {
                            checkmarkIdkJa();
                        }, 400);
                    }
                }
            }
        }, 250);
    };


    shopWeaponsList.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    shopArmorsList.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    let windowClickHandler = () => { // CLOSING DOWN
        if (!isBuyingMenuOpen && shopMenu.classList.contains('closableMenu') && !deutschChecker) {
            isMenuOpening = false;
            shopMenu.removeAttribute('open');
            backgroundBlur.removeAttribute('open');
            categoryChoice.removeAttribute('appear');
            shopMenu.setAttribute('close', "");
            backgroundBlur.setAttribute('close', "");
            categoryChoice.setAttribute('disappear', "");

            if (isWeaponScrollerOpen) {
                shopWeaponsList.removeAttribute('appear');
                shopWeaponsList.setAttribute('disappear', "");
            }
            if (isArmorScrollerOpen) {
                shopArmorsList.removeAttribute('appear');
                shopArmorsList.setAttribute('disappear', "");
            }

            let animationEndHandler = () => {
                shopMenu.removeAttribute('close');
                backgroundBlur.removeAttribute('close');
                categoryChoice.removeAttribute('disappear');
                backgroundBlur.style.display = 'none';
                shopMenu.style.display = 'none';
                categoryChoice.style.display = 'none';
                shopMenu.classList.remove('closableMenu');
                shopMenu.removeEventListener('animationend', animationEndHandler);
                body.style.overflow = '';

                if (isWeaponScrollerOpen) {
                    shopWeaponsList.removeAttribute('disappear');
                    shopWeaponsList.style.display = 'none';
                    isWeaponScrollerOpen = false;
                }
                if (isArmorScrollerOpen) {
                    shopArmorsList.removeAttribute('disappear');
                    shopArmorsList.style.display = 'none';
                    isArmorScrollerOpen = false;
                }
            };

            shopMenu.addEventListener('animationend', animationEndHandler);
            window.removeEventListener('click', windowClickHandler);
        };
    };

    window.addEventListener('click', windowClickHandler);
});

const weapons = {
    bronzeSword: {
        name: 'Bronzový Meč',
        minDmg: 3,
        maxDmg: 10,
        tier: 1,
        price: 100,
        img: './Image-Library/bronze.png'
    },
    goldSword: {
        name: 'Zlatý Meč',
        minDmg: 5,
        maxDmg: 15,
        tier: 2,
        price: 250,
        img: './Image-Library/golden.png'
    },
    ironSword: {
        name: 'Železný Meč',
        minDmg: 6,
        maxDmg: 20,
        tier: 3,
        price: 750,
        img: './Image-Library/ironed.png'
    },
    steelSword: {
        name: 'Ocelový Meč',
        minDmg: 9,
        maxDmg: 25,
        tier: 4,
        price: 2000,
        img: './Image-Library/steelsword.png'
    },
    diamondSword: {
        name: 'Diamantový Meč',
        minDmg: 10,
        maxDmg: 30,
        tier: 5,
        price: 5000,
        img: './Image-Library/diamoned.png'
    },
    stormyxSword: {
        name: 'Stormyxový Meč',
        minDmg: 15,
        maxDmg: 40,
        tier: 6,
        price: 10000,
        img: './Image-Library/stormyxSword.png'
    },
    mythrilSword: {
        name: 'Mythrilový Meč',
        minDmg: 20,
        maxDmg: 50,
        tier: 7,
        price: 25000,
        img: './Image-Library/mythrilSword.png'
    },
    adamantiteSword: {
        name: 'Adamantiový Meč',
        minDmg: 25,
        maxDmg: 75,
        tier: 8,
        price: 50000,
        img: './Image-Library/adamantiteSword.png'
    },
    orichalcumSword: {
        name: 'Orichalcový Meč',
        minDmg: 45,
        maxDmg: 90,
        tier: 9,
        price: 80000,
        img: './Image-Library/orichalcumSword.png'
    },
    celestialSword: {
        name: 'Nebeský Meč',
        minDmg: 60,
        maxDmg: 100,
        tier: 10,
        price: 125000,
        img: './Image-Library/celestialSword.png'
    }
}
  
const armors = {
    leatherArmor: {
        name: 'Kožené Brnění',
        health: 50,
        tier: 1,
        price: 50,
        img: './Image-Library/leather.png'
    },
    chainArmor: {
        name: 'Řetězové Brnění',
        health: 100,
        tier: 2,
        price: 100,
        img: './Image-Library/chainmail.png'
    },
    ironArmor: {
        name: 'Železné Brnění',
        health: 175,
        tier: 3,
        price: 250,
        img: './Image-Library/ironArmor.png'
    },
    steelArmor: {
        name: 'Ocelové Brnění',
        health: 250,
        tier: 4,
        price: 1500,
        img: './Image-Library/steelArmor.png'
    },
    diamondArmor: {
        name: 'Diamantové Brnění',
        health: 325,
        tier: 5,
        price: 5000,
        img: './Image-Library/diamond.png'
    },
    stormyxArmor: {
        name: 'Stormyxové Brnění',
        health: 450,
        tier: 6,
        price: 15000,
        img: './Image-Library/stormyxarmor.png'
    },
    mythrilArmor: {
        name: 'Mythrilové Brnění',
        health: 600,
        tier: 7,
        price: 40000,
        img: './Image-Library/mythrilArmor.png'
    },
    adamantiteArmor: {
        name: 'Adamantiové Brnění',
        health: 700,
        tier: 8,
        price: 100000,
        img: './Image-Library/adamantiteArmor.png'
    },
    orichalcumArmor: {
        name: 'Orichalcové Brnění',
        health: 800,
        tier: 9,
        price: 150000,
        img: './Image-Library/orichalcumArmor.png'
    },
    celestialArmor: {
        name: 'Nebeské Brnění',
        health: 1000,
        tier: 10,
        price: 200000,
        img: './Image-Library/celestialArmor.png'
    }
}

let keysWeapon = Object.keys(weapons);
let keysArmor = Object.keys(armors);

let descripHeading = document.getElementById('descripHeading');
let descripBonusProperty = document.querySelector('.descripBonusProperty');
let descripTier = document.querySelector('.descripTier');
let descripCurrentBonusProperty = document.querySelector('.descripCurrentBonusProperty');
let descripCurrentTier = document.querySelector('.descripCurrentTier');
let descripPrice = document.querySelector('.descripPrice');

let currentPrice = '';
let currentProductId = '';

function getWeaponStats (elementID) {
    let indexOfID = keysWeapon.indexOf(elementID);
    currentProductId = elementID;

    descripHeading.innerHTML = weapons[keysWeapon[indexOfID]].name;
    descripBonusProperty.innerHTML = `Útočná síla: ${weapons[keysWeapon[indexOfID]].minDmg}-${weapons[keysWeapon[indexOfID]].maxDmg}`;
    descripTier.innerHTML = `Úroveň zbraně: ${weapons[keysWeapon[indexOfID]].tier}`;

    descripCurrentBonusProperty.innerHTML = `Tvoje útočná síla: ${userMinDmg}-${userMaxDmg}`
    descripCurrentTier.innerHTML = `Tvoje úroveň zbraně: ${userWeaponTier}`

    descripPrice.innerHTML = `Cena: ${weapons[keysWeapon[indexOfID]].price}`;
    currentPrice = weapons[keysWeapon[indexOfID]].price;
}

function getArmorStats (elementID) {
    let indexOfID = keysArmor.indexOf(elementID);
    currentProductId = elementID;

    descripHeading.innerHTML = armors[keysArmor[indexOfID]].name;
    descripBonusProperty.innerHTML = `Bonusové životy: ${armors[keysArmor[indexOfID]].health}`;
    descripTier.innerHTML = `Úroveň brnění: ${armors[keysArmor[indexOfID]].tier}`;

    descripCurrentBonusProperty.innerHTML = `Tvoje bonusové životy: ${userArmorBonus}`
    descripCurrentTier.innerHTML = `Tvoje úroveň brnění: ${userArmorTier}`

    descripPrice.innerHTML = `Cena: ${armors[keysArmor[indexOfID]].price}`;
    currentPrice = armors[keysArmor[indexOfID]].price;
}

function openBuyingMenu () {
    let isMenuOpening = false;
    let currentProduct = document.getElementById(currentProductId);

    isMenuOpening = true;
    isBuyingMenuOpen = true;
    itemDescription.setAttribute('open', "");
    backgroundBlur2.style.display = 'block';
    backgroundBlur2.setAttribute('open', "");
    itemDescription.style.display = 'block';
    itemDescription.classList.add('closableMenu');
    body.style.overflow = 'hidden';

    if (currentProduct.classList.contains('purchased')) {
        shopBuyingBtn.style.display = 'none';
        shopBtnBackground.style.display = 'none';
    } else {
        shopBuyingBtn.style.display = 'flex';
        shopBtnBackground.style.display = 'block';
    };

    itemDescription.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                descripTextCon.style.display = 'flex';
                descripTextCon.setAttribute('appear', "");
                descripHeadingCon.style.display = 'flex';
                descripHeadingCon.setAttribute('appear', "");
            }, 250);
        };
    });

    function shopBuyingBtnHandler(event) {
        event.stopPropagation();

        console.log(currentPrice);
        if (currentPrice <= userGold) {
            windowClickHandlerShop();
            buyingItem();
            console.log('kupil si šuhaji, gratulujem');
        } else {
            console.log('No money? L')
        };
    };
    shopBuyingBtn.addEventListener('click', shopBuyingBtnHandler);

    function windowClickHandlerShop() {    // CLOSING DOWN
        if (itemDescription.classList.contains('closableMenu')) {
            isMenuOpening = false;
            itemDescription.removeAttribute('open');
            backgroundBlur2.removeAttribute('open');
            itemDescription.setAttribute('close', "");
            backgroundBlur2.setAttribute('close', "");

            descripTextCon.removeAttribute('appear');
            descripHeadingCon.removeAttribute('appear');
            descripTextCon.setAttribute('disappear', "");
            descripHeadingCon.setAttribute('disappear', "");

            let animationEndHandler = () => {
                itemDescription.removeAttribute('close');
                backgroundBlur2.removeAttribute('close');
                backgroundBlur2.style.display = 'none';
                itemDescription.style.display = 'none';

                descripTextCon.removeAttribute('disappear');
                descripHeadingCon.removeAttribute('disappear');
                descripTextCon.style.display = 'none';
                descripHeadingCon.style.display = 'none';

                itemDescription.classList.remove('closableMenu');
                itemDescription.removeEventListener('animationend', animationEndHandler);
                body.style.overflow = '';
                isBuyingMenuOpen = false;
                shopBuyingBtn.removeEventListener('click', shopBuyingBtnHandler);
            };

            itemDescription.addEventListener('animationend', animationEndHandler);
            window.removeEventListener('click', windowClickHandlerShop);
        };
    };
    window.addEventListener('click', windowClickHandlerShop);
};


const itemDescription = document.getElementById('itemDescription');
const descripTextCon = document.querySelector('.descripTextCon');
const descripHeadingCon = document.querySelector('.descripHeadingCon');
const shopBuyingBtn = document.getElementById('shopBuyingBtn');
const shopBtnBackground = document.getElementById('shopBtnBackground');
const backgroundBlur2 = document.getElementById('backgroundBlur2');

const shopWeaponBtns = document.querySelectorAll('.swordForSaleBtn');
shopWeaponBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const parentElement = event.target.parentNode;
        getWeaponStats(parentElement.id);
        openBuyingMenu();
    });
});
const shopArmorBtns = document.querySelectorAll('.armorForSaleBtn');
shopArmorBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const parentElement = event.target.parentNode;
        getArmorStats(parentElement.id);
        openBuyingMenu();
    });
});

function unlockingItem (element) {
    if (element && element.classList) {
        deutschChecker = true;
        element.classList.add('unlocked');
        lockId = document.getElementById(element.id + 'Lock');
        if (lockId) {
            lockId.addEventListener('animationend', () => {
                setTimeout(() => {
                    lockId.setAttribute('disappear', "");
                    lockId.addEventListener('animationend', () => {
                        lockId.removeAttribute('disappear')
                        lockId.setAttribute('unlocked', "");
                        deutschChecker = false;
                    }, {once: true});
                }, 100);
            }, {once: true});
        }
    }
};



// --------------------
//  GATE TELEPORTATION
// --------------------

let animationQueue = [];

function unlockingZone(element) {
    animationQueue.push(element);

    if (animationQueue.length === 1) {
        startAnimation(element);
    }
};

function startAnimation(element) {
    if (element.classList.contains('unlocked')) {
        animationQueue.shift();
        if (animationQueue.length > 0) {
            startAnimation(animationQueue[0]);
        }
        return;
    }

    deutschChecker = true;
    element.classList.add('unlocked');
    lockId = document.getElementById(element.id + 'Lock');
    lockId.addEventListener('animationend', () => {
        setTimeout(() => {
            lockId.setAttribute('disappear', "");
            lockId.addEventListener('animationend', () => {
                lockId.removeAttribute('disappear')
                lockId.setAttribute('unlocked', "");
                deutschChecker = false;

                animationQueue.shift();

                if (animationQueue.length > 0) {
                    startAnimation(animationQueue[0]);
                }
            }, {once: true});
        }, 100);
    }, {once: true});
}

const statusGold = document.getElementById('statusGold');
const statusHealth = document.getElementById('statusHp');
const swordGear = document.getElementById('swordGear');
const armorGear = document.getElementById('armorGear');

function buyingItem() {
    userGold = userGold - currentPrice;
    statusGold.innerHTML = `ZLATO: ${userGold}`;
    console.log('odečteno')

    let checkmark = document.getElementById(currentProductId + 'Check');
    console.log(currentProductId)
    itemDescription.addEventListener('animationend', () => {
        setTimeout(() => {
            // CHECKMARK
            checkmark.style.display = 'block';
            checkmark.setAttribute('appear', "");
            checkmark.addEventListener('animationend', () => {
                checkmark.removeAttribute('appear')
                document.getElementById(currentProductId).classList.add('purchased');
            }, {once: true});

            // LOCK + VALUES
            let indexOfID = keysWeapon.indexOf(currentProductId);
            let currentLock = '';
            if (indexOfID === -1) {
                indexOfID = keysArmor.indexOf(currentProductId);
                let nextIndex = indexOfID + 1;
                currentLock = document.getElementById(keysArmor[nextIndex]);
                console.log(indexOfID)

                userArmor = armors[keysArmor[indexOfID]].name;
                userHP = 100 + armors[keysArmor[indexOfID]].health;
                userMaxHP = 100 + armors[keysArmor[indexOfID]].health;
                userArmorBonus = armors[keysArmor[indexOfID]].health;
                userArmorTier = armors[keysArmor[indexOfID]].tier;

                armorGear.src = armors[keysArmor[indexOfID]].img;
                statusHealth.innerHTML = `HP: ${userMaxHP}`;
            } else {
                let nextIndex = indexOfID + 1;
                currentLock = document.getElementById(keysWeapon[nextIndex]);

                userWeapon = weapons[keysWeapon[indexOfID]].name;
                userMinDmg = weapons[keysWeapon[indexOfID]].minDmg;
                userMaxDmg = weapons[keysWeapon[indexOfID]].maxDmg;
                userWeaponTier = weapons[keysWeapon[indexOfID]].tier;

                swordGear.src = weapons[keysWeapon[indexOfID]].img;
            };
            unlockingItem(currentLock);
        }, 250);
    }, {once: true});
};


const worldMapBase = document.getElementById('worldMapBase');
const worldMap = document.getElementById('worldMap');

spawnEventBtn.addEventListener('click', () => {
    event.stopPropagation();

    isMenuOpening = true;
    worldMapBase.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    worldMapBase.style.display = 'block';
    worldMapBase.classList.add('closableMenu');
    body.style.overflow = 'hidden';

    worldMapBase.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                worldMap.style.display = 'block';
                worldMap.setAttribute('appear', "");
            }, 250);
        };
    });
    
    let windowClickHandler = () => {
        if (worldMapBase.classList.contains('closableMenu')) {
            isMenuOpening = false;
            worldMapBase.removeAttribute('open')
            backgroundBlur.removeAttribute('open')
            worldMap.removeAttribute('appear')
            worldMapBase.setAttribute('close', "")
            backgroundBlur.setAttribute('close', "")
            worldMap.setAttribute('disappear', "")
    
            let animationEndHandler = () => {
                worldMapBase.removeAttribute('close')
                backgroundBlur.removeAttribute('close')
                worldMap.style.display = 'none';
                worldMap.removeAttribute('disappear')
                backgroundBlur.style.display = 'none';
                worldMapBase.style.display = 'none';
                worldMapBase.classList.remove('closableMenu')
                worldMapBase.removeEventListener('animationend', animationEndHandler)
                body.style.overflow = '';
            }
    
            worldMapBase.addEventListener('animationend', animationEndHandler)
            window.removeEventListener('click', windowClickHandler)
        }
    }
    window.addEventListener('click', windowClickHandler)
});


const teleportMenuBase = document.getElementById('teleportMenuBase');
const zoneScroller = document.querySelector('.zoneScroller');

gateEventBtn.addEventListener('click', () => {
    event.stopPropagation();

    isMenuOpening = true;
    teleportMenuBase.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    teleportMenuBase.style.display = 'block';
    teleportMenuBase.classList.add('closableMenu');
    body.style.overflow = 'hidden';

    teleportMenuBase.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                zoneScroller.style.display = 'grid';
                zoneScroller.setAttribute('appear', "");

                function zoneVisitCheck(zone, zoneVisitVar) {
                    if (!zone.classList.contains('unlocked') && zoneVisitVar) {
                        setTimeout(() => {
                            unlockingZone(zone);
                        }, 400);
                    };
                };

                zoneVisitCheck(document.getElementById('gate'), visitedGate);
                zoneVisitCheck(document.getElementById('plains'), visitedPlains);
                zoneVisitCheck(document.getElementById('desert'), visitedDesert);
                zoneVisitCheck(document.getElementById('iceLands'), visitediceLands, );
                zoneVisitCheck(document.getElementById('skeletonCastle'), visitedSkeletonCastle);
                zoneVisitCheck(document.getElementById('magmaLands'), visitedMagmaLands);
                zoneVisitCheck(document.getElementById('swamp'), visitedSwamp);
                zoneVisitCheck(document.getElementById('orcCastle'), visitedOrcCastle);
                zoneVisitCheck(document.getElementById('clouds'), visitedClouds);
                zoneVisitCheck(document.getElementById('vampireForest'), visitedVampireForest);
                zoneVisitCheck(document.getElementById('corruptionZone'), visitedCorruptionZone);
            }, 250);
        };
    });

    const zoneElements = document.querySelectorAll('.zoneElement');
    zoneElements.forEach(zone => {
        zone.addEventListener('click', () => {
            event.stopPropagation();
            let zoneId = zone.id;
            let indexOfLoc = zoneKeys.indexOf(loc);
            let indexOfZoneId = zoneKeys.indexOf(zoneId);
            zoneChange(indexOfZoneId - indexOfLoc);
            setTimeout(() => {
                windowClickHandlerZones();
            }, 100);
        });
    });
    
    function windowClickHandlerZones() {
        if (teleportMenuBase.classList.contains('closableMenu') && !deutschChecker) {
            isMenuOpening = false;
            teleportMenuBase.removeAttribute('open');
            backgroundBlur.removeAttribute('open');
            zoneScroller.removeAttribute('appear');
            teleportMenuBase.setAttribute('close', "");
            backgroundBlur.setAttribute('close', "");
            zoneScroller.setAttribute('disappear', "");
    
            let animationEndHandler = () => {
                teleportMenuBase.removeAttribute('close');
                backgroundBlur.removeAttribute('close');
                zoneScroller.style.display = 'none';
                zoneScroller.removeAttribute('disappear');
                backgroundBlur.style.display = 'none';
                teleportMenuBase.style.display = 'none';
                teleportMenuBase.classList.remove('closableMenu');
                teleportMenuBase.removeEventListener('animationend', animationEndHandler);
                body.style.overflow = '';
            };
    
            teleportMenuBase.addEventListener('animationend', animationEndHandler);
            window.removeEventListener('click', windowClickHandlerZones);
        };
    };
    window.addEventListener('click', windowClickHandlerZones);
});



// ----------
//  FIGHTING
// ----------

let isUserStillAlive = true;
let repeatIndex = 0;
let decrease = false;
let monsterIndex = 0;
let bossMonsterIndex = 0;
let didBossSpawn = false;

const monsterImg = document.getElementById('monsterImg');
const maxwellCon = document.querySelector('.maxwellCon');

function fight(monster, bossMonster) {
    blockBtns();

    monsterIndex = monsterKeys.indexOf(monster);
    bossMonsterIndex = monsterKeys.indexOf(bossMonster);

    normalMonster = monsters[monsterKeys[monsterIndex]];
    bossMonster = monsters[monsterKeys[bossMonsterIndex]];

    droppedWeapon = weapons[keysWeapon[bossMonster.tier]];

    maxwellCon.classList.add('fighting');
    monsterImg.style.display = 'block';

    let normalOrBoss = randint(1, 4);
    if (normalOrBoss === 1) {
        didBossSpawn = true;
        let text = {
            text1: 'Pozor! Objevilo se Boss monstrum.',
            text2: `${bossMonster.name} se rychle blíží!`,
            text3: `Útočís na ${bossMonster.name} za ${userDmg} dmg. Zbývá mu ${monsterHP} životů.`,
            text4: `${bossMonster.name} na tebe útočí za ${monsterDmg} dmg. Zbývá ti ${userHP} životů.`,
            text5: `Po drsném boji jsi porazil ${bossMonster.name}! Získáváš ${bossMonster.gold} zlata.`,
            text6: `Všechna tvá síla tě opouští. Umíráš...`,
            text7: `Kromě ${bossMonster.gold} zlata... Se ti podařilo získat novou zbraň! ${droppedWeapon.name}, s útočnou silou o ${droppedWeapon.minDmg}-${droppedWeapon.maxDmg}.`,
            text8: `Kromě ${bossMonster.gold} zlata... Jsi získal něco, co vypadá jako jádro Lorda Korupce. Cítíš z něho velmi nepříjemnou energii.`
        };

        monsterImg.src = bossMonster.image;
        monsterImg.setAttribute(monsterKeys[bossMonsterIndex], "");
        monsterImg.classList.add('appears');

        console.log('bossMonster')
        repeatIndex = 3;
        stopAniText();
        aniTextLoop(text, repeatIndex);
    } else {
        didBossSpawn = false;
        let text = {
            text1: `Připravuješ se k boji. Spatříš ${normalMonster.name}.`,
            text2: `Útočís na ${normalMonster.name} za ${userDmg} dmg. Zbývá mu ${monsterHP} životů.`,
            text3: `${normalMonster.name} na tebe útočí za ${monsterDmg} dmg. Zbývá ti ${userHP} životů.`,
            text4: `Porazil jsi ${normalMonster.name}. Získáváš ${normalMonster.gold} zlata.`,
            text5: `Všechna tvá síla tě opouští. Umíráš...`
        };

        monsterImg.src = normalMonster.image;
        monsterImg.setAttribute(monsterKeys[monsterIndex], "");
        monsterImg.classList.add('appears');

        console.log('monster')
        repeatIndex = 2;
        stopAniText();
        aniTextLoop(text, repeatIndex);
    };
};

let firstEncounter = true;
function aniTextLoop(textArray, repeatIndex) {

    if (lastZone !== background.id) {
        lastZone = background.id;
        return;
    }

    const keys = Object.keys(textArray);
    firstEncounter = true;

    if(keys.length > 0) {
        timeoutId = setTimeout(() => {
            console.log('F TO PAY RESPECT BITCH')
            testIdkBro = true
            aniText2Fight(textArray[keys[index]]);
            index++
        }, 200);
    }

    currentTextArray = textArray;
    currentKeys = keys;

    textDiv.removeEventListener('click', handleClickFighting);
}

let specialZwei = false;
let specialDrei = false;
let specialVier = false;
let specialFunf = false
let monsterDead = false;
let userDead = false;
let moneyGlitchCheck = true;

const eventBtnShadow1 = document.getElementById('eventBtnShadow1');
const eventBtnShadow2 = document.getElementById('eventBtnShadow2');
const arrowBtnShadow1 = document.getElementById('arrowBtnShadow1');
const arrowBtnShadow2 = document.getElementById('arrowBtnShadow2');

function blockBtns() {
    eventBtnShadow1.style.display = 'block';
    eventBtnShadow2.style.display = 'block';
    arrowBtnShadow1.style.display = 'block';
    arrowBtnShadow2.style.display = 'block';
    eventBtnShadow1.setAttribute('blocking', "");
    eventBtnShadow2.setAttribute('blocking', "");
    arrowBtnShadow1.setAttribute('blocking', "");
    arrowBtnShadow2.setAttribute('blocking', "");
}
function unblockBtns() {
    eventBtnShadow1.setAttribute('unblocking', "");
    eventBtnShadow2.setAttribute('unblocking', "");
    arrowBtnShadow1.setAttribute('unblocking', "");
    arrowBtnShadow2.setAttribute('unblocking', "");
    eventBtnShadow1.removeAttribute('blocking');
    eventBtnShadow2.removeAttribute('blocking');
    arrowBtnShadow1.removeAttribute('blocking');
    arrowBtnShadow2.removeAttribute('blocking');
    eventBtnShadow1.addEventListener('animationend', () => {
        arrowBtnShadow1.style.display = 'none';
        arrowBtnShadow2.style.display = 'none';
        eventBtnShadow1.style.display = 'none';
        eventBtnShadow2.style.display = 'none';
        eventBtnShadow1.removeAttribute('unblocking');
        eventBtnShadow2.removeAttribute('unblocking');
        arrowBtnShadow1.removeAttribute('unblocking');
        arrowBtnShadow2.removeAttribute('unblocking');
    }, {once: true});
}

function handleClickFighting() {
    if (isWriting === false) {
        isWriting = true;
        textDiv.style.cursor = 'default';

        opacityRemover();

        console.log('BOJUJEŠ NA ŽIVOT A NA SMRT CHUJ');

        normalMonster = monsters[monsterKeys[monsterIndex]];
        bossMonster = monsters[monsterKeys[bossMonsterIndex]];

        droppedWeapon = weapons[keysWeapon[bossMonster.tier]];

        if (specialDrei) {
            specialVier = true;
        }
        if (specialFunf) {
            if (didBossSpawn) {
                document.getElementById('gameOverMenuText').innerHTML = `Zabil tě ${bossMonster.name}. Zbylo mu ${monsterHP - 9999999999} životů.`
            } else {
                document.getElementById('gameOverMenuText').innerHTML = `Zabil tě ${normalMonster.name}. Zbylo mu ${monsterHP - 9999999999} životů.`
            }
            gameOverMenuScreen();
            unblockBtns();
        }

        // SETTING MONSTER HEALTH
        if (firstEncounter) {
            if (didBossSpawn) {
                monsterHP = bossMonster.health;
            } else {
                monsterHP = normalMonster.health;
            }
            firstEncounter = !firstEncounter
        }

        // GENERATING DMG
        function generateDmg(minDmg, maxDmg) {
            return randint(minDmg, maxDmg);
        }
        userDmg = generateDmg(userMinDmg, userMaxDmg);
        if (didBossSpawn) {
            monsterDmg = generateDmg(bossMonster.minDmg, bossMonster.maxDmg);
        } else {
            monsterDmg = generateDmg(normalMonster.minDmg, normalMonster.maxDmg);
        }

        let special = false;
        let specialInt = 0;

        // GIVING LOOT
        if (monsterDead) {
            if (moneyGlitchCheck) {
                unblockBtns();
                monsterImg.classList.add('dies');
                monsterImg.addEventListener('animationend', () => {
                    monsterImg.classList.remove('appears');
                    monsterImg.classList.remove('dies');
                    maxwellCon.classList.remove('fighting');
                }, {once: true});
                isUserFighting = false;
                if (didBossSpawn) {
                    setTimeout(() => {
                        monsterImg.removeAttribute(monsterKeys[bossMonsterIndex]);
                    }, 200);
                    userGold = userGold + bossMonster.gold;
                    if (bossMonster.name === 'Lord Korupce' && !corruptionCore) {
                        index = 7;
                        corruptionCore = true;
                        console.log('Hezky pěkně soudruhu')
                    } else {
                        let dostanesZbran = randint(1,2);
                        switch (dostanesZbran) {
                            case 1:
                                if (userWeaponTier < bossMonster.tier+1) {
                                    index = 6;
                                    console.log('Zbraň pro tebe:)')
                                    userWeapon = droppedWeapon.name;
                                    userMinDmg = droppedWeapon.minDmg;
                                    userMaxDmg = droppedWeapon.maxDmg;
                                    userWeaponTier = droppedWeapon.tier;
                    
                                    swordGear.src = droppedWeapon.img;
                                }
                                break
                            case 2:
                                console.log('Nedostaneš nic, protože jsi zlobil!')
                                break
                        }
                    }

                } else {
                    setTimeout(() => {
                        monsterImg.removeAttribute(monsterKeys[monsterIndex]);
                    }, 200);
                    userGold = userGold + normalMonster.gold;
                }
                statusGold.innerHTML = `ZLATO: ${userGold}`;
            }
            moneyGlitchCheck = false;
        }

        // PLAYER ATTACKING
        if (index != repeatIndex) {
            monsterHP = monsterHP - userDmg;
            monsterHP = monsterHP < 0 ? 0 : monsterHP
            if (monsterHP <= 0) {
                console.log('Monster Chciplo')
                monsterDead = true;
                special = true;
                if (didBossSpawn) {
                    specialInt = 4;
                } else {
                    specialInt = 3;
                }
            }

        // MONSTER ATTACKING
        } else {
            userHP = userHP - monsterDmg
            userHP = userHP < 0 ? 0 : userHP
            statusHealth.innerHTML = `HP: ${userHP}`;
            if (userHP <= 0) {
                console.log('Chcipl si noob L ez')
                userDead = true;
                special = true;
                monsterHP = monsterHP + 9999999999;
                if (didBossSpawn) {
                    specialInt = 5;
                } else {
                    specialInt = 4;
                }
            }
        }

        // UPDATING TEXT ARRAY
        if (didBossSpawn) {
            currentTextArray = text = {
                text1: 'Pozor! Objevilo se Boss monstrum.',
                text2: `${bossMonster.name} se rychle blíží!`,
                text3: `Útočís na ${bossMonster.name} za ${userDmg} dmg. Zbývá mu ${monsterHP} životů.`,
                text4: `${bossMonster.name} na tebe útočí za ${monsterDmg} dmg. Zbývá ti ${userHP} životů.`,
                text5: `Po drsném boji jsi porazil ${bossMonster.name}! Získáváš ${bossMonster.gold} zlata.`,
                text6: `Všechna tvá síla tě opouští. Umíráš...`,
                text7: `Kromě ${bossMonster.gold} zlata... Se ti podařilo získat novou zbraň! ${droppedWeapon.name}, s útočnou silou o ${droppedWeapon.minDmg}-${droppedWeapon.maxDmg}.`,
                text8: `Kromě ${bossMonster.gold} zlata... Jsi získal něco, co vypadá jako jádro Lorda Korupce. Cítíš z něho velmi nepříjemnou energii.`
            };
        } else {
            currentTextArray = text = {
                text1: `Připravuješ se k boji. Spatříš ${normalMonster.name}.`,
                text2: `Útočís na ${normalMonster.name} za ${userDmg} dmg. Zbývá mu ${monsterHP} životů.`,
                text3: `${normalMonster.name} na tebe útočí za ${monsterDmg} dmg. Zbývá ti ${userHP} životů.`,
                text4: `Porazil jsi ${normalMonster.name}. Získáváš ${normalMonster.gold} zlata.`,
                text5: `Všechna tvá síla tě opouští. Umíráš...`
            };    
        }

        hlUp.removeAttribute('glow');
        hlDown.removeAttribute('glow');
        hlRight.removeAttribute('glow');
        hlLeft.removeAttribute('glow');

        aniText2Fight(currentTextArray[currentKeys[index]]);

        // INDEX SHENANIGENS
        if (specialZwei) {
            specialZwei = false;
            console.log('konečná šuhaj');
            index = -1;
            textDiv.addEventListener('click', gameOverNoob());
        } else if (special) {
            index = specialInt;
            specialZwei = true;
        } else {
            if (index === repeatIndex) {
                decrease = !decrease;
            }
            if (decrease) {
                index--;
                decrease = !decrease;
            } else {
                index++;
            }
        }
    }
}


function aniText2Fight(text, i = 0) {
    if (i === 0) {
        textDiv.textContent = '';
    }
    textDiv.textContent += text[i];
    if (i < text.length - 1 && testIdkBro) {
        setTimeout(() => aniText2Fight(text, i + 1), 7.5);
    } else if (!testIdkBro) {
        return
    } else {
        isWriting = false;
        hlUp.setAttribute('glow', "");
        hlDown.setAttribute('glow', "");
        hlRight.setAttribute('glow', "");
        hlLeft.setAttribute('glow', "");
        setTimeout(() => {
            textDiv.style.cursor = 'pointer';
            textDiv.addEventListener('click', handleClickFighting);
            if (userDead) {
                specialDrei = true;
            }
            if (specialVier) {
                specialFunf = true;
            }
        }, 50);
    };
};


const fightBtn = document.getElementById('fightBtn');
fightBtn.addEventListener('click', () => {fight(currentMonster, currentBossMonster)});
// fightBtn.addEventListener('click', () => {gameOverMenuScreen()});


const gameOverMenuBase = document.getElementById('noobMenuBase');
const gameOverMenuContent = document.querySelector('.jaFaktNevimBoze');

function getGamemode() {
    return localStorage.getItem('gamemode');
}
const mode = getGamemode();

function gameOverMenuScreen() {
    event.stopPropagation();

    userDeaths++;
    monsterImg.classList.remove('appears');
    if (didBossSpawn) {
        monsterImg.removeAttribute(monsterKeys[bossMonsterIndex]);
    } else {
        monsterImg.removeAttribute(monsterKeys[monsterIndex]);
    }
    maxwellCon.classList.remove('fighting');

    deutschChecker = true;
    isMenuOpening = true;
    gameOverMenuBase.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    gameOverMenuBase.style.display = 'block';
    gameOverMenuBase.classList.add('closableMenu');
    body.style.overflow = 'hidden';

    gameOverMenuBase.addEventListener('animationend', () => {
        if (isMenuOpening) {
            setTimeout(() => {
                gameOverMenuContent.style.display = 'flex';
                gameOverMenuContent.setAttribute('appear', "");
                switch (mode) {
                    case 'normal':
                        console.log('normal');
                        hardModeDeathBtn.style.display = 'none';
                        document.getElementById('gameOverMenuText2').style.display = 'none';
                        break
                    case 'hard':
                        console.log('hard');
                        normalModeDeathBtn.style.display = 'none';
                        break
                };
            }, 250);
        };
    });

    const normalModeDeathBtn = document.getElementById('normalModeBtn');
    const hardModeDeathBtn = document.getElementById('hardModeBtn');

    normalModeDeathBtn.addEventListener('click', () => {
        event.stopPropagation();
        deutschChecker = false;
        let indexOfLoc = zoneKeys.indexOf(loc);
        zoneChange(1 - indexOfLoc);
        userHP = userMaxHP;
        statusHealth.innerHTML = `HP: ${userHP}`;
        setTimeout(() => {
            windowClickHandlerZones();
        }, 100);
    });
    hardModeDeathBtn.addEventListener('click', () => {
        event.stopPropagation();
        location.reload();
    });
    
    function windowClickHandlerZones() {
        if (gameOverMenuBase.classList.contains('closableMenu') && !deutschChecker) {
            isMenuOpening = false;
            gameOverMenuBase.removeAttribute('open');
            backgroundBlur.removeAttribute('open');
            gameOverMenuContent.removeAttribute('appear');
            gameOverMenuBase.setAttribute('close', "");
            backgroundBlur.setAttribute('close', "");
            gameOverMenuContent.setAttribute('disappear', "");
    
            let animationEndHandler = () => {
                gameOverMenuBase.removeAttribute('close');
                backgroundBlur.removeAttribute('close');
                gameOverMenuContent.style.display = 'none';
                gameOverMenuContent.removeAttribute('disappear');
                backgroundBlur.style.display = 'none';
                gameOverMenuBase.style.display = 'none';
                gameOverMenuBase.classList.remove('closableMenu');
                gameOverMenuBase.removeEventListener('animationend', animationEndHandler);
                body.style.overflow = '';
            };
    
            gameOverMenuBase.addEventListener('animationend', animationEndHandler);
            window.removeEventListener('click', windowClickHandlerZones);
        };
    };
    window.addEventListener('click', windowClickHandlerZones);
};



// --------
//  ENDING
// --------

altarEventBtn.addEventListener('click', () => {
    if (corruptionCore) {
        blockBtns();
        eventBtnShadow2.style.display = 'none';
        text = {
            text1: 'Prohlédneš v rychlosti svoje věci, jestli nemáš něco, co by pasovalo do kulatého otvoru v oltáři.',
            text2: 'Vzpomeneš si, na ten divný kulatý předmět. Který si získal posledně, jen o zónu vedle.',
            text3: 'Vložíš ho do otvoru. Zem se začne třást. Oltář začne absorbovat, energii z jádra. Po pár sekundách, se z temně fialového jádra, obklopeného temnou energíí, stane čirá a nádherně průhledná koule.',
            text4: 'Na konci místnosti zahlédneš bíle zářící dveře. Cítíš z nich energii bohů. Rozhodneš se vstoupit.',
            text5: `Zdravím, ${name}. Vítám tě v doméně bohů. Já jsem bohyně světla. Layila.`,
            text6: 'Určitě musíš mít hodně otázek, nemusíš se obávat. Všechno se dozvíš, až přijde ten správný čas.',
            text7: 'Prvně ti chci za všechny bohy poděkovat, že si vyřešil naší přetrvávající chybu. Lord Korupce.',
            text8: 'I když jsme bohové, stále máme nějaká pravidla. To hlavní nám zabraňuje zasahovat do vašeho světa. Lord Korupce tohle věděl. Když jeho armáda byla na pokraji zničení, uprchl z této domény, dolů do vaší.',
            text9: 'Naštěstí už netušil, že se to pravidlo vztahuje hlavně na vás, smrtelníky. Podařilo se nám ho tedy uvěznit a oslabit. Nedokázali jsme ovšem už, dílo dokonat.',
            text10: 'Proto jsme vybudovali skupinu pod dimenzí, která vás udělá silnější a připraví vás, s doufáním, že se jednoho dne objeví někdo, kdo bude schopen za nás dílo dokončit.',
            text11: `Ještě jednou, ti z celého srdce děkuji. Za tvůj statečný skutek. Jako odměnu, ti mohu splnit jakékoli přání. Je tu něco, co by sis přál? ${name}.`
        }
        stopAniText();
        endingAniText(text);
    } else {
        text = {
            text1: 'Prohlédneš v rychlosti svoje věci, jestli nemáš něco, co by pasovalo do kulatého otvoru v oltáři.',
            text2: 'I když vyzkoušíš spoustu kulatých předmětů co máš po ruce, žádná reakce.'
        }
        stopAniText();
        aniText(text);
    }
});


let special = false;
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const eventBtnBase = document.getElementById('eventBtnBase');
const theEndText = document.querySelector('.theEndText');
const deathCounter = document.getElementById('deathCounter');

function endingAniText(textArray) {
    const keys = Object.keys(textArray);
    console.log(index)

    if(keys.length > 0) {
        timeoutId = setTimeout(() => {
            console.log('F TO PAY RESPECT BITCH')
            testIdkBro = true
            aniText2End(textArray[keys[index]]);
            index++
        }, 200);
    }

    currentTextArray = textArray;
    currentKeys = keys;

    textDiv.removeEventListener('click', handleClick);
}

function handleClickEnd() {
    if (isWriting === false) {
        console.log(loc);

        isWriting = true;
        textDiv.style.cursor = 'default';

        opacityRemover();

        hlUp.removeAttribute('glow');
        hlDown.removeAttribute('glow');
        hlRight.removeAttribute('glow');
        hlLeft.removeAttribute('glow');

        // IDK MAN SMT WITH TEXT
        if (special) {
            textDiv.textContent = '';
            setTimeout(() => {
                background.style.backgroundImage = "url('./Image-Library/theEnd.jpg')"
            }, 750);
            setTimeout(() => {
                leftBtn.setAttribute('disappear', "");
                rightBtn.setAttribute('disappear', "");
                arrowBtnShadow1.setAttribute('disappearEnd', "");
                arrowBtnShadow2.setAttribute('disappearEnd', "");
                eventBtnShadow1.setAttribute('disappearEnd', "");
                eventBtnBase.setAttribute('disappear', "");
                currentEventBtn.setAttribute('disappear', "");

                leftBtn.addEventListener('animationend', () => {
                    currentEventBtn.style.display = 'none';
                    eventBtnBase.style.display = 'none';
                    leftBtn.style.display = 'none';
                    rightBtn.style.display = 'none';
                    arrowBtnShadow1.style.display = 'none';
                    arrowBtnShadow2.style.display = 'none';
                    eventBtnShadow1.style.display = 'none';
                });
            }, 1500);
            setTimeout(() => {
                special = false;
                aniText2End(currentTextArray[currentKeys[index]]);
                index++;
            }, 2250);

        } else if (specialZwei) {
            console.log('specialZwei')
            backgroundBlur.style.display = 'block';
            backgroundBlur.setAttribute('appearEnd', "");
            backgroundBlur.addEventListener('animationend', () => {
                setTimeout(() => {
                    deathCounter.innerText = `Hru si dokončil s ${userDeaths} smrtí.`;
                    theEndText.style.display = 'flex';
                    theEndText.setAttribute('appear', "");
                }, 100);
            });
        } else {
            aniText2End(currentTextArray[currentKeys[index]]);

            // INDEX SHENANIGANS
            if (index === 3) {
                special = true;
            }
            if (index === 10) {
                specialZwei = true;
            }
            index++;
        }
    }
}

function aniText2End(text, i = 0) {
    if (i === 0) {
        textDiv.textContent = '';
    }
    textDiv.textContent += text[i];
    if (i < text.length - 1 && testIdkBro) {
        setTimeout(() => aniText2End(text, i + 1), 15);
    } else if (!testIdkBro) {
        return
    } else {
        isWriting = false;
        hlUp.setAttribute('glow', "");
        hlDown.setAttribute('glow', "");
        hlRight.setAttribute('glow', "");
        hlLeft.setAttribute('glow', "");
        setTimeout(() => {
            textDiv.style.cursor = 'pointer';
            textDiv.addEventListener('click', handleClickEnd);
        }, 50);
    };
};