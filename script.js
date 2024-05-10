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
let userGold = 999999999999999;

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

    textDiv.style.cursor = 'default';
    removeClickListener();
};


function removeClickListener() {
    console.log('Removing click listener');
    textDiv.removeEventListener('click', handleClick);
}

let currentTextArray = {};
let currentKeys = [];
let lastZone = 'spawn';

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
            aniText2(textArray[keys[index]]);
            index++
        }, 1000);
    }

    currentTextArray = textArray;
    currentKeys = keys;

    textDiv.removeEventListener('click', handleClick);
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
            text2: 'Nacházíš se u oltáře. Vypadá, že tohle místo blokuje nechtěnou energii z předchozí zóny.',
            text3: 'Po chvíli co se koukáš po okolí, si všimneš v oltáři kulatého otvoru. Vypadá důležitě..'
        },
        background: "url('./Image-Library/altar.jpg')",
        music: "./Music-Library/zonesTheme.mp3"
    },
}
const zoneKeys =  Object.keys(zones);

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

let currentEventBtn = spawnEventBtn;

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
                break
            case 'plains':
                visitedPlains = true;
                break
            case 'desert':
                visitedDesert = true;
                break
            case 'iceLands':
                visitediceLands = true;
                break
            case 'skeletonCastle':
                visitedSkeletonCastle = true;
                break
            case 'magmaLands':
                visitedMagmaLands = true;
                break
            case 'swamp':
                visitedSwamp = true;
                break
            case 'orcCastle':
                visitedOrcCastle = true;
                break
            case 'clouds':
                visitedClouds = true;
                break
            case 'vampireForest':
                visitedVampireForest = true;
                break
            case 'corruptionZone':
                visitedCorruptionZone = true;
                break
        };

    } else {
        console.log("Konec světa. Bariéra chuj.");
    }
};

spawnEventBtn.addEventListener('click', () => {
    console.log('SPAWN CHUJ');
});
shopEventBtn.addEventListener('click', () => {
    console.log('SHOP CHUJ');
});
fountainEventBtn.addEventListener('click', () => {
    console.log('FONTAN CHUJ');
});
gateEventBtn.addEventListener('click', () => {
    console.log('GATE CHUJ');
});


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
    this.scrollLeft += e.deltaY*5;
    e.preventDefault();
}, { passive: false });
let scrollHorizontal2 = document.querySelector('.shopScrollerArmors');
scrollHorizontal2.addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY*5;
    e.preventDefault();
}, { passive: false });
let scrollHorizontal3 = document.querySelector('.zoneScroller');
scrollHorizontal3.addEventListener('wheel', function(e) {
    this.scrollLeft += e.deltaY*5;
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

const shopBtn = document.getElementById('shopEventBtn');
shopBtn.addEventListener('click', () => {
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
        }, 250);
    };
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
        }, 250);
    };

    choiceElement1.addEventListener('click', event => {     // WEAPONS
        event.stopPropagation();
    
        if (isWeaponScrollerOpen === false) {
            isWeaponScrollerOpen = true;
            categoryChoice.setAttribute('disappear', "");
            categoryChoice.addEventListener('animationend', handleAnimationEndWeapons, { once: true });
        };
    });
    choiceElement2.addEventListener('click', event => {     // ARMORS
        event.stopPropagation();

        if (isArmorScrollerOpen === false) {
            isArmorScrollerOpen = true;
            categoryChoice.setAttribute('disappear', "");
            categoryChoice.addEventListener('animationend', handleAnimationEndArmors, { once: true });
        }
    });

    shopWeaponsList.addEventListener('click', () => {
        event.stopPropagation();
    });
    shopArmorsList.addEventListener('click', () => {
        event.stopPropagation();
    });

    let windowClickHandler = () => {    // CLOSING DOWN
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
        price: 100
    },
    goldSword: {
        name: 'Zlatý Meč',
        minDmg: 5,
        maxDmg: 15,
        tier: 2,
        price: 250
    },
    ironSword: {
        name: 'Železný Meč',
        minDmg: 6,
        maxDmg: 20,
        tier: 3,
        price: 750
    },
    steelSword: {
        name: 'Ocelový Meč',
        minDmg: 9,
        maxDmg: 25,
        tier: 4,
        price: 2000
    },
    diamondSword: {
        name: 'Diamantový Meč',
        minDmg: 10,
        maxDmg: 30,
        tier: 5,
        price: 5000
    },
    stormyxSword: {
        name: 'Stormyxový Meč',
        minDmg: 15,
        maxDmg: 40,
        tier: 6,
        price: 10000
    },
    mythrilSword: {
        name: 'Mythrilový Meč',
        minDmg: 20,
        maxDmg: 50,
        tier: 7,
        price: 25000
    },
    adamantiteSword: {
        name: 'Adamantiový Meč',
        minDmg: 25,
        maxDmg: 75,
        tier: 8,
        price: 50000
    },
    orichalcumSword: {
        name: 'Orichalcový Meč',
        minDmg: 45,
        maxDmg: 90,
        tier: 9,
        price: 80000
    },
    celestialSword: {
        name: 'Nebeský Meč',
        minDmg: 60,
        maxDmg: 100,
        tier: 10,
        price: 125000
    }
  }
  
const armors = {
leatherArmor: {
    name: 'Kožené Brnění',
    health: 50,
    tier: 1,
    price: 50
},
chainArmor: {
    name: 'Řetězové Brnění',
    health: 100,
    tier: 2,
    price: 100
},
ironArmor: {
    name: 'Železné Brnění',
    health: 175,
    tier: 3,
    price: 250
},
steelArmor: {
    name: 'Ocelové Brnění',
    health: 250,
    tier: 4,
    price: 1500
},
diamondArmor: {
    name: 'Diamantové Brnění',
    health: 325,
    tier: 5,
    price: 5000
},
stormyxArmor: {
    name: 'Stormyxové Brnění',
    health: 450,
    tier: 6,
    price: 15000
},
mythrilArmor: {
    name: 'Mythrilové Brnění',
    health: 600,
    tier: 7,
    price: 40000
},
adamantiteArmor: {
    name: 'Adamantiové Brnění',
    health: 700,
    tier: 8,
    price: 100000
},
orichalcumArmor: {
    name: 'Orichalcové Brnění',
    health: 800,
    tier: 9,
    price: 150000
},
celestialArmor: {
    name: 'Nebeské Brnění',
    health: 1000,
    tier: 10,
    price: 200000
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
            }, {once: true});
        }, 100);
    }, {once: true});
};


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

                statusHealth.innerHTML = `HP: ${userMaxHP}`;
            } else {
                let nextIndex = indexOfID + 1;
                currentLock = document.getElementById(keysWeapon[nextIndex]);

                userWeapon = weapons[keysWeapon[indexOfID]].name;
                userMinDmg = weapons[keysWeapon[indexOfID]].minDmg;
                userMaxDmg = weapons[keysWeapon[indexOfID]].maxDmg;
                userWeaponTier = weapons[keysWeapon[indexOfID]].tier;
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