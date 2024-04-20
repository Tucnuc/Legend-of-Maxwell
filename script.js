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
