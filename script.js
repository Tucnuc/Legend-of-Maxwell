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

const statusButton = document.getElementById('statusButton');

statusButton.addEventListener('click', () => {
    event.stopPropagation();

    openableMenu.setAttribute('open', "");
    backgroundBlur.style.display = 'block';
    backgroundBlur.setAttribute('open', "");
    openableMenu.style.display = 'block';
    openableMenu.classList.add('closableMenu')
    body.style.overflow = 'hidden';
    
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
})
