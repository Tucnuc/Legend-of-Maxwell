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

let buttonSound = new Audio('./Music-Library/button.wav');

function openMenu() {
    openableMenu.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    openableMenu.style.display = 'block';
    openableMenu.classList.add('closableMenu')
    body.style.overflow = 'hidden';

    special1.style.display = 'none';
    special2.style.display = 'none';
    special3.style.display = 'none';

    let windowClickHandler = () => {
        if (openableMenu.classList.contains('closableMenu')) {
            openableMenu.removeAttribute('open')
            backgroundBlur.removeAttribute('open')
            openableMenu.setAttribute('close', "")
            backgroundBlur.setAttribute('close', "")

            let animationEndHandler = () => {
                openableMenu.removeAttribute('close')
                backgroundBlur.removeAttribute('close')
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
}
function openMenu2() {
    const offBtn = document.getElementById('OFF');
    const onBtn = document.getElementById('ON');
    const offBtn2 = document.getElementById('OFF2');

    openableMenu.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    openableMenu.style.display = 'block';
    openableMenu.classList.add('closableMenu')
    body.style.overflow = 'hidden';

    special1.style.display = 'block';
    special2.style.display = 'block';
    special3.style.display = 'block';

    offBtn.addEventListener('click', () => {
        offBtn.style.display = 'none';
        onBtn.style.display = 'block';
        buttonSound.volume = 0.3;
        buttonSound.play();
        onBtn.setAttribute('turningON', "");
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
    })

    special1.addEventListener('click', event => event.stopPropagation());
    special2.addEventListener('click', event => event.stopPropagation());
    special3.addEventListener('click', event => event.stopPropagation());

    let windowClickHandler = (event) => {
        if (openableMenu.classList.contains('closableMenu')) {
            openableMenu.removeAttribute('open')
            backgroundBlur.removeAttribute('open')
            openableMenu.setAttribute('close', "")
            backgroundBlur.setAttribute('close', "")

            let animationEndHandler = () => {
                openableMenu.removeAttribute('close')
                backgroundBlur.removeAttribute('close')
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
}

playBtn.addEventListener('click', () => {
    console.log('Představ is hru')
})
infoBtn.addEventListener('click', () => {
    event.stopPropagation();
    openMenu();
})
creditsBtn.addEventListener('click', () => {
    event.stopPropagation();
    openMenu();
})
modBtn.addEventListener('click', () => {
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