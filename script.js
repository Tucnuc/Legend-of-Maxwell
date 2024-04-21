// BUTTONS SOUND EFFECTS
let buttonSound = new Audio('./Music-Library/button.wav');
const buttons = document.querySelectorAll('.button')
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        let buttonHover = new Audio('./Music-Library/buttonHover.wav');
        buttonHover.volume = 0.4;
        buttonHover.play()
    });
    button.addEventListener('click', () => {
        buttonSound.volume = 0.3;
        buttonSound.play();
    });
});


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


// setInterval(function() {
//     console.log('Změněno');
//     let background = document.querySelector('.backgroundMenu');
//     let index = keys.indexOf(background.id);
//     console.log(index);
//     let nextIndex = (index + 1) % keys.length;
//     background.style.backgroundImage = imageList[keys[nextIndex]];
//     background.id = keys[nextIndex];
// }, 2000)