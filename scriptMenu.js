// POP UP MENU STUFF
const playBtn = document.getElementById('selection1');
const infoBtn = document.getElementById('selection2');
const creditsBtn = document.getElementById('selection3');
const modBtn = document.getElementById('selection4');

const openableMenu = document.getElementById('openMenu');
const backgroundBlur = document.getElementById('backgroundBlur');
const body = document.body;

const special1 = document.getElementById('skupina1');
const special2 = document.getElementById('skupina2');
const special3 = document.getElementById('BACKGROUND');

const heading = document.getElementById('opmHeading')
const textCon = document.querySelector('.textContainer')
const text1 = document.getElementById('opmText1')
const text2 = document.getElementById('opmText2')
const text3 = document.getElementById('opmText3')
const text4 = document.getElementById('opmText4')
const text5 = document.getElementById('opmText5')
const onOff = document.getElementById('onOff');

let isMenuOpening = false;

function openMenu() {
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
                heading.setAttribute('appear', "");
                textCon.setAttribute('appear', "");
            }, 250)
        }
    })

    special1.style.display = 'none';
    special2.style.display = 'none';
    special3.style.display = 'none';

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
                onOff.style.display = 'none';
            }

            openableMenu.addEventListener('animationend', animationEndHandler)
            window.removeEventListener('click', windowClickHandler)
        }
    }
    window.addEventListener('click', windowClickHandler)
}

function setMode(mode) {
    localStorage.setItem('gamemode', mode);
}
window.onload = function() {
    localStorage.setItem('gamemode', 'normal');
};

function openMenu2() {
    const offBtn = document.getElementById('OFF');
    const onBtn = document.getElementById('ON');
    const offBtn2 = document.getElementById('OFF2');

    textCon.style.height = '255.350px';
    textCon.style.marginTop = '175px';

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
                onOff.style.display = 'block';
                heading.setAttribute('appear', "");
                textCon.setAttribute('appear', "");
                onOff.setAttribute('appear', "")
            }, 250)
        }
    })

    special1.style.display = 'block';
    special2.style.display = 'block';
    special3.style.display = 'block';

    offBtn.addEventListener('click', () => {
        offBtn.style.display = 'none';
        onBtn.style.display = 'block';
        buttonSound.volume = 0.3;
        buttonSound.play();
        onBtn.setAttribute('turningON', "");
        setMode('hard')
    })

    onBtn.addEventListener('click', () => {
        offBtn2.style.display = 'block';
        onBtn.style.display = 'none';
        buttonSound.volume = 0.3;
        buttonSound.play();
        onBtn.removeAttribute('turningON');
        offBtn2.setAttribute('turningOFF', "");
        offBtn2.addEventListener('animationend', () => {
            offBtn.style.display = 'block';
            offBtn2.style.display = 'none';
            offBtn2.removeAttribute('turningOFF');
        })
        setMode('normal')
    })

    special1.addEventListener('click', event => event.stopPropagation());
    special2.addEventListener('click', event => event.stopPropagation());
    special3.addEventListener('click', event => event.stopPropagation());

    let windowClickHandler = (event) => {
        if (openableMenu.classList.contains('closableMenu')) {
            isMenuOpening = false;
            openableMenu.removeAttribute('open')
            backgroundBlur.removeAttribute('open')
            heading.removeAttribute('appear')
            textCon.removeAttribute('appear')
            onOff.removeAttribute('appear')
            openableMenu.setAttribute('close', "")
            backgroundBlur.setAttribute('close', "")
            heading.setAttribute('disappear', "")
            textCon.setAttribute('disappear', "")
            onOff.setAttribute('disappear', "")

            let animationEndHandler = () => {
                openableMenu.removeAttribute('close')
                backgroundBlur.removeAttribute('close')
                backgroundBlur.style.display = 'none';
                openableMenu.style.display = 'none';
                heading.style.display = 'none';
                textCon.style.display = 'none';
                onOff.style.display = 'none';
                heading.removeAttribute('disappear')
                textCon.removeAttribute('disappear')
                onOff.removeAttribute('disappear')
                openableMenu.classList.remove('closableMenu')
                openableMenu.removeEventListener('animationend', animationEndHandler)
                body.style.overflow = '';
                textCon.style.height = '655.350px';
                textCon.style.marginTop = '';
                document.getElementById('onOff').innerHTML = "";
            }

            openableMenu.addEventListener('animationend', animationEndHandler)
            window.removeEventListener('click', windowClickHandler)
        }
    }
    window.addEventListener('click', windowClickHandler)
}

playBtn.addEventListener('click', () => {
    console.log('Představ is hru')
})
infoBtn.addEventListener('click', () => {
    heading.innerHTML = "INFORMACE";
    text1.innerHTML = "Ve hře je 10 zón, kterými hráč musí projít aby dokončil hru.";
    text2.innerHTML = "Hráč může procházet mezi zónami jak chce.";
    text3.innerHTML = "Nedoporučuje se ale chodit do vyšších zón se špatným vybavením.";
    text4.innerHTML = "V každé zóně je také Boss monstrum. Má 25% šanci, že zaútočí.";
    text5.innerHTML = "Poté je 50% šance, že hráč dostane zbraň příslušné úrovně.";
    
    event.stopPropagation();
    openMenu();
})
creditsBtn.addEventListener('click', () => {
    heading.innerHTML = "CREDITS";
    text1.innerHTML = "Adam: Podstatě všechno";
    text2.innerHTML = "Matěj: Jméno brány + random randint funkce";
    text3.innerHTML = "";
    text4.innerHTML = "";
    text5.innerHTML = "";

    event.stopPropagation();
    openMenu();
})
modBtn.addEventListener('click', () => {
    heading.innerHTML = "MÓD";
    text1.innerHTML = "Je na výběr normální a těžký mód.";
    text2.innerHTML = "Při normálním módu se hráč po smrti vždy oživí.";
    text3.innerHTML = "V těžkém módu ale, se po smrti hra ukončí.";
    text4.innerHTML = "";
    text5.innerHTML = "";

    document.getElementById('onOff').innerHTML = "Normální / Těžký";

    event.stopPropagation();
    openMenu2();
})


// BACKGROUND MUSIC
const audio = document.getElementById('music');
audio.volume = 0.2;
window.addEventListener('click', () => {
    audio.play();
})


// BACKGROUND IMAGE CHANGING
const imageList = {
plains: "url('./Image-Library/plains.jpg')",
desert: "url('./Image-Library/desert.jpg')",
iceLands: "url('./Image-Library/icelands.jpg')",
skeletonCastle: "url('./Image-Library/skeletoncastle.jpg')",
magmaLands: "url('./Image-Library/magmalands.jpg')",
swamp: "url('./Image-Library/swamp.jpg')",
orcCastle: "url('./Image-Library/orccastle.jpg')",
clouds: "url('./Image-Library/clouds.jpg')",
vampireForest: "url('./Image-Library/vampireforest.jpg')",
corruption: "url('./Image-Library/corruption.jpg')"
} 

const keys = Object.keys(imageList);

setInterval(function() {
    console.log('Změněno');
    let background = document.querySelector('.backgroundMenu');
    let index = keys.indexOf(background.id);
    console.log(index);
    let nextIndex = (index + 1) % keys.length;
    background.style.backgroundImage = imageList[keys[nextIndex]];
    background.id = keys[nextIndex];
}, 10000)


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