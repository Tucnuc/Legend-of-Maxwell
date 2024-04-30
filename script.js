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

let userWeapon = "Dřevěný Meč";
let userWeaponTier = 0;
let userMinDmg = 2;
let userMaxDmg = 5;

let userArmor = "Žádné";
let userArmorBonus = 0;
let userArmorTier = 0;

// SHOP VARIABLES
let shopBan = false;

// TEXT OBJECTS
const spawnText = {
    text1: 'Nacházíš se na spawnu. Rozhlédneš se kolem sebe.',
    text2: 'Na levo vidíš obchod. Můžeš jít nakupovat k obchodníkovi Konstantinovi. Prodává zboží z celé říše!',
    text3: 'Před sebou také vidíš magickou fontánu se zářící vodou. Zdejší léčící fontána z legend. Vyléčí vše.',
    text4: 'Za fontánou zahlédneš obří bránu. Je to ta brána o které si četl ve všech těch knížkách.',
    text5: 'Porta Magnifica! Magická brána, která tě může udělat silnějším. Drží v sobě nepředstavitelné bohatství. Ale také spoustu nebezpečí...'
}

const shopText = {
    text1: 'Zdravím tě, zákazníku. Konstantin jméno mé. Lepší zboží nenajdeš široko daleko!',
    text2: 'Mohu ti nabídnout zbraně a brnění všeho druhu. V nejlepší kvalitě samozřejmě a za nejlepší cenu!'
}

const weaponText = {
    text1: 'Potřebujete nějakou zbraň? Drahý zákazníku, hned vám něco dobrého nabídnu...'
}





// -------------
//  OTHER STUFF
// -------------

// BUTTONS SOUND EFFECTS
let buttonSound = new Audio('./Music-Library/button.wav');
const buttons = document.querySelectorAll('.button')
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (event.target === button) {
            let buttonHover = new Audio('./Music-Library/buttonHover.wav');
            buttonHover.volume = 0.4;
            buttonHover.play()
        }
    });
    button.addEventListener('click', () => {
        buttonSound.volume = 0.3;
        buttonSound.play();
    });
});


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

const testBtn = document.getElementById('hola');
// testBtn.addEventListener('click', () => {
//     zoneChange(11);
// })

// TEXT UI
const textDiv = document.getElementById('textUI');
let isWriting = false;

const hlUp = document.getElementById('hlUp');
const hlDown = document.getElementById('hlDown');
const hlRight = document.getElementById('hlRight');
const hlLeft = document.getElementById('hlLeft');

let index = 0;

function resetAniText() {
    index = 0;
}

function removeClickListener() {
    textDiv.removeEventListener('click', handleClick);
}

let currentTextArray = {};
let currentKeys = [];

function aniText(textArray) {
    const keys = Object.keys(textArray);
    console.log(index)

    if (keys.length > 0) {
        setTimeout(() => {
            console.log('F TO PAY RESPECT BITCH')
            aniText2(textArray[keys[index]]);
            index++
        }, 1000);
    }

    currentTextArray = textArray;
    currentKeys = keys;

    textDiv.removeEventListener('click', handleClick);
    textDiv.addEventListener('click', handleClick);
}

function opacityRemover() {
    const opaCheck = window.getComputedStyle(hlUp);
    if (opaCheck.opacity != 0) {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes unglow {
                0% { opacity: ${opaCheck.opacity}; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        hlUp.style.animation = 'unglow 500ms';
        hlDown.style.animation = 'unglow 500ms';
        hlRight.style.animation = 'unglow 500ms';
        hlLeft.style.animation = 'unglow 500ms';

        hlUp.addEventListener('animationend', () => {
            hlUp.style.animation = '';
            hlDown.style.animation = '';
            hlRight.style.animation = '';
            hlLeft.style.animation = '';
            document.head.removeChild(style);
        });
    };
};

function handleClick() {
    if (isWriting === false) {
        console.log(loc);

        isWriting = true;
        textDiv.style.cursor = 'default';

        opacityRemover()

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
    if (i < text.length - 1) {
        setTimeout(() => aniText2(text, i + 1), 15);
    } else {
        isWriting = false;
        hlUp.setAttribute('glow', "");
        hlDown.setAttribute('glow', "");
        hlRight.setAttribute('glow', "");
        hlLeft.setAttribute('glow', "");
        setTimeout(() => {
            textDiv.style.cursor = 'pointer';
        }, 50);
    };
};


// BACKGROUND MUSIC
const audio = document.getElementById('music');
audio.volume = 1;
window.addEventListener('click', () => {
    audio.play();
})


// ZONE CHANGE FUNCTION
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
            text2: 'Je s ní vázaných několik příběhu a teoriích o jejím vzniku. Jedna říká, že byla vystavěna velmi vyspělou civilizací. Nyní už zapomenutou v čase.',
            text3: 'Jiná říká, že ji stvořili bohové. A že našim úkolem je ji prozkoumávat. Abychom získali sílu a mohli zachránit náš svět. Kdyby přišla kalamita.',
            text4: 'Všechno jsou to ovšem jen spekulace, o kterých se mluví už po staletí. Možná se ale dozvíš pravdu na konci své cesty.'
        },
        background: "url('./Image-Library/gate.jpeg')",
        music: "./Music-Library/gateTheme.mp3"
    },
    plains: {
        text: {
            text1: 'Rozhlédneš se kolem sebe, kam tě brána transportovala.',
            text2: 'Ocitáš se na pláni. O podál zahlédneš skupinku Goblinů.'
        },
        background: "url('./Image-Library/plains.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
}

function zoneChange(direction) {
    const keys = Object.keys(zones);
    let index = keys.indexOf(loc);
    let nextIndex = index + direction
    console.log('pouští se')

    if (nextIndex >= 0 && nextIndex < keys.length) {
        console.log('změněno?')
        loc = keys[nextIndex];
        console.log(loc);

        opacityRemover()

        hlUp.removeAttribute('glow');
        hlDown.removeAttribute('glow');
        hlRight.removeAttribute('glow');
        hlLeft.removeAttribute('glow');

        background.style.backgroundImage = zones[loc].background;
        if (audio.src.split('/').pop() !== zones[loc].music.split('/').pop()) {
            audio.src = zones[loc].music;
        }

        resetAniText();
        aniText(zones[loc].text);
    } else {
        console.log("Konec světa. Bariéra chuj.");
    }
};

nameMenu.addEventListener('animationend', () => {
    aniText(zones[loc].text);
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