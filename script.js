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

function zoneChange(index) {
    console.log("Změněno");
    let background = document.querySelector('.backgroundMenu');
    background.style.backgroundImage = imageList[keys[index]];
    background.id = keys[index];
}

const testBtn = document.getElementById('hola');
testBtn.addEventListener('click', () => {
    zoneChange(11);
})

// TEXT UI
const textDiv = document.getElementById('textUI');
let isWriting = false;

function aniText(textArray) {
    const keys = Object.keys(textArray);
    let index = 0;

    textDiv.addEventListener('click', () => {
        if (isWriting === false) {
            isWriting = true;
            aniText2(textArray[keys[index]]);
            index = (index + 1) % keys.length;
        }
    });
};

function aniText2(text, i = 0) {
    if (i === 0) {
        textDiv.textContent = '';
    }
    textDiv.textContent += text[i];
    if (i < text.length - 1) {
        setTimeout(() => aniText2(text, i + 1), 15);
    } else {
        isWriting = false;
    }
};

aniText(spawnText);