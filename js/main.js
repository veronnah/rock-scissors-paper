window.addEventListener('load', function(){
    let countUser = document.querySelector('.count-user');
    let countComp = document.querySelector('.count-comp');
    let userField = document.querySelector('.user-field');
    let compField = document.querySelector('.comp-field');
    let sound = document.querySelector('.sound');
    let play = document.querySelector('.play');
    let fields = document.querySelectorAll('.field');
    let userStep, compStep; 
    let countU = 0, countC = 0; 
    let blocked = false; 
    let res = document.querySelector('.result'); 


    function usersChoice(e){
        if(blocked) return; 
        let target = e.target; 
        if(target.classList.contains('field')){
            userStep = target.dataset.field; 
            fields.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active'); 
            compChoice(); 
        }
    }

    function compChoice(){
        blocked = true;
        let rand = Math.floor(Math.random() * 3);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');

        setTimeout(()=>{
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        }, 3000);
        
    }

    function winner(){
        blocked = false;
        let comb = compStep + userStep; 

        switch(comb){
            case 'rr':
            case 'ss':
            case 'pp':
                res.innerText = 'Draw!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play(); 
                break; 
            case 'rs': 
            case 'sp': 
            case 'pr':
                res.innerText = 'You win!'; 
                sound.setAttribute('src', 'audio/win.mp3'); 
                sound.play(); 
                countU++; 
                countUser.innerText = countU; 
                compField.querySelector('[data-field = '+compStep+']').classList.add('error');
                break; 
            case 'sr': 
            case 'ps': 
            case 'rp': 
            res.innerText = 'You lose!'; 
            sound.setAttribute('src', 'audio/loss.mp3'); 
            sound.play(); 
            countC++; 
                countComp.innerText = countC; 
                usersField.querySelector('[data-field = '+userStep  +']').classList.add('error');
            break;
        }
    }

    function playGame(){
        countU = countC = 0; 
        res.innerText = 'Make a choice';
        countUser.innerText = '0'; 
        countComp.innerText = '0'; 
        fields.forEach(item => item.classList.remove('active', 'error'));

    }
    play.addEventListener('click', playGame); 
    userField.addEventListener('click', usersChoice);
});