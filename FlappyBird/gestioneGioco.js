const datiGioco  = {
    bestScoreEasy: 0,
    bestScoreNormal: 0,
    bestScoreHard: 0,
    effectVolume: 0.2,
    musicVolume: 0.2
}

// Definisce le variabili per la dimensione della schermata di gioco
let board;
let boardWidth = 900; // Larghezza della schermata
let boardHeight = 1000; // Altezza della schermata
let context; // Contesto del canvas per disegnare gli elementi di gioco
// Fine variabili per schermata

// Inizio variabili per il terreno
let ground = new Image();
let groundWidth = 60; // Larghezza di un pezzo di terreno
let groundHeight = 120; // Altezza del terreno
let groundArray = []; // Array che conterrÃ  i segmenti del terreno
// Fine variabili per il terreno

// Inizio variabili per l'uccello
let birdWidth = 70; // Larghezza dell'uccello
let birdHeight = 50; // Altezza dell'uccello
let birdX = boardWidth / 24; // Posizione X iniziale (a sinistra della schermata)
let birdY = boardHeight / 2; // Posizione Y iniziale (al centro della schermata)
let frameTimer = 0;
const frameInterval = 100;


// Oggetto che rappresenta l'uccello
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
};

let nFrame = 0; // Variabile per rallentare il cambio di frame dell'animazione dell'uccello

// Caricamento delle immagini dell'uccello per l'animazione
let birdImages = [
    new Image(),
    new Image(),
    new Image()
];

let currentFrame = 0; // Indice dell'immagine attuale per l'animazione
// Fine variabili per l'uccello

// Inizio variabili per i tubi
let pipeArray = []; // Array che conterrÃ  i tubi
let pipeWidth = 140; // Larghezza dei tubi
let pipeHeight = boardHeight - 100; // Altezza dei tubi
let pipeX = boardWidth; // Posizione iniziale X dei tubi
let pipeY = 0; // Posizione iniziale Y dei tubi
let pipeGapDefault = 200;
let pipeGap = pipeGapDefault; // Distanza tra i tubi superiore e inferiore
let pipeCondition = false;
// Caricamento delle immagini dei tubi
let topPipeImg = new Image();
let bottomPipeImg = new Image();
//variaile per impostarer intervallo generazione tubi
let pipeInterval;
// Fine variabili per i tubi

// Inizio fisica del gioco
let velocityXMultiplayerEasyMode=-300;
let velocityXMultiplayerNormalMode=-450;
let velocityXMultiplayerHardMode= -600;
let velocityXMultiplayerCustom=velocityXMultiplayerEasyMode;
let jump;
let velocityXMultiplayer=velocityXMultiplayerHardMode;
let velocityX; // VelocitÃ  di spostamento dei tubi (verso sinistra
let velocityY = 0; // VelocitÃ  di salto/caduta dell'uccello
let gravity = 1000; // GravitÃ  applicata 
let deadbird= new Image();

// all'uccello per farlo cadere
// Fine fisica del gioco

//varaibili per menu
let start=document.createElement("button");
start.id="start";
let bestScore=document.createElement("button");
bestScore.id="bestScore";
let modeButton=document.createElement("button");
modeButton.id="mode";
let easyButton=document.createElement("button");
easyButton.classList.add("menuButton");
easyButton.id="easyButton";
let normalButton=document.createElement("button");
normalButton.classList.add("menuButton");
normalButton.id="normalButton";
let hardButton=document.createElement("button");
hardButton.classList.add("menuButton");
hardButton.id="hardButton";
let personalizedButton=document.createElement("button");
personalizedButton.classList.add("menuButton");
personalizedButton.id="personalizedButton";
let backModeButton=document.createElement("button");
backModeButton.classList.add("backButton");
backModeButton.id="backModeButton";
backModeButton.textContent="back";
let homeButton = document.createElement("button");
homeButton.id="homeButton";
homeButton.classList.add("menuButton");
let retryButton = document.createElement("button");
retryButton.id="retryButton";
retryButton.classList.add("menuButton");

let rangeGap=document.createElement("INPUT");
let rangeJump=document.createElement("INPUT");
let rangeGravity=document.createElement("INPUT");
let rangeVelocity=document.createElement("INPUT");
let rangeSpawnRate=document.createElement("INPUT");
rangeGap.setAttribute("type", "range");
rangeJump.setAttribute("type", "range");
rangeGravity.setAttribute("type", "range");
rangeVelocity.setAttribute("type", "range");
rangeSpawnRate.setAttribute("type", "range");

rangeGap.id="rangeGap";
rangeJump.id="rangeJump";
rangeGravity.id="rangeGravity";
rangeVelocity.id="rangeVelocity";
rangeSpawnRate.id="rangeSpawnRate";

rangeGap.classList.add("customRange");
rangeJump.classList.add("customRange");
rangeGravity.classList.add("customRange");
rangeVelocity.classList.add("customRange");
rangeSpawnRate.classList.add("customRange");

let rangeGapLabel = document.createElement("label");
let rangeJumpLabel = document.createElement("label");
let rangeGravityLabel = document.createElement("label");
let rangeVelocityLabel = document.createElement("label");
let rangeSpawnRateLabel = document.createElement("label");
let confirmCustomButton=document.createElement("button");
let backCustomButton=document.createElement("button");

rangeGapLabel.id= "rangeGapLabel";
rangeJumpLabel.id= "rangeJumpLabel";
rangeGravityLabel.id= "rangeGravityLabel";
rangeVelocityLabel.id= "rangeVelocityLabel";
rangeSpawnRateLabel.id= "rangeSpawnRateLabel";

confirmCustomButton.id="confirmCustomButton";
backCustomButton.id="backCustomButton";
confirmCustomButton.textContent="confirm";  
backCustomButton.textContent="back";

rangeGapLabel.textContent = "Pipe gap (50-1000):";
rangeJumpLabel.textContent = "Jump force (100-1000):";
rangeGravityLabel.textContent = "Gravity (0-2000):";
rangeVelocityLabel.textContent = "Speed (100-1000):";
rangeSpawnRateLabel.textContent = "Pipe spawn (0-10000ms):";

let rangeGapNumber = document.createElement("label");
let rangeJumpNumber = document.createElement("label");
let rangeGravityNumber = document.createElement("label");
let rangeVelocityNumber = document.createElement("label");
let rangeSpawnRateNumber = document.createElement("label");

rangeGapNumber.id="rangeGapNumber";
rangeJumpNumber.id="rangeJumpNumber";
rangeGravityNumber.id="rangeGravityNumber";
rangeVelocityNumber.id="rangeVelocityNumber";
rangeSpawnRateNumber.id="rangeSpawnRateNumber";

rangeGapNumber.classList.add("labelNumber");
rangeJumpNumber.classList.add("labelNumber");
rangeGravityNumber.classList.add("labelNumber");
rangeVelocityNumber.classList.add("labelNumber");
rangeSpawnRateNumber.classList.add("labelNumber");

confirmCustomButton.classList.add("confirmButton");
backCustomButton.classList.add("backButton");

rangeGapLabel.classList.add("customLabel");
rangeJumpLabel.classList.add("customLabel");
rangeGravityLabel.classList.add("customLabel");
rangeVelocityLabel.classList.add("customLabel");
rangeSpawnRateLabel.classList.add("customLabel");

let delayPipeEasy= 2500;
let delayPipeNormal=1750;
let delayPipeHard= 1500;
let delayPipeCustom=delayPipeEasy;
let delayPipe=delayPipeEasy;
let jumpEasy=-400;
let jumpNormal=-450;
let jumpHard=-650;
let jumpCustom=jumpEasy;
let gravityEasy=1000;
let gravityNormal=1250;
let gravityHard=1950;
let gravityCustom=gravity;
let pipeGapCustom=pipeGap;

rangeGap.setAttribute("min", "50");
rangeGap.setAttribute("max", "1000");
rangeGap.setAttribute("value", pipeGap);

rangeJump.setAttribute("min", "100");
rangeJump.setAttribute("max", "1000");
rangeJump.setAttribute("value", jumpEasy*-1);

rangeGravity.setAttribute("min", "10");
rangeGravity.setAttribute("max", "2000")
rangeGravity.setAttribute("value", gravityEasy);

rangeVelocity.setAttribute("min", "100");
rangeVelocity.setAttribute("max", "1000");
rangeVelocity.setAttribute("value", velocityXMultiplayerEasyMode*-1);

rangeSpawnRate.setAttribute("min", "0");
rangeSpawnRate.setAttribute("max", "10000");
rangeSpawnRate.setAttribute("value", delayPipeEasy);

rangeGapNumber.textContent = rangeGap.value;
rangeJumpNumber.textContent =rangeJump.value;
rangeGravityNumber.textContent =rangeGravity.value;
rangeVelocityNumber.textContent =rangeVelocity.value;
rangeSpawnRateNumber.textContent =rangeSpawnRate.value;

//fine variabile per cambio modalita

//Variabili per gestire condizioni di gioco
let punti=0;
var menu=document.createElement("div"); 
var optionMenu=document.createElement("div");
optionMenu.id="optionMenu";
menu.id ="menu";
var gameOverMenu=new Image();
let gameOverMenuDiv=document.createElement("div");
gameOverMenu.src='immagini/gameOver/easyGameOver.png';
gameOverMenuDiv.id="gameOverMenuDiv";
gameOverMenu.id="gameOverMenu";
let animationID //variabile utilizzato per memorizzare l'ID dell'animazione
let gameRunning=false; //variabile usata per assicurarsi interruzione animazione nel caso
let lastLoop; //uso questa varaibile per salvarmi tempo ultima esecuzione per calcoalre poi fps
let thisLoop=  performance.now(); //in questa memoprizzo tempo attuale
let timeDifference=1; //memorizzo qua il delta in sec tra tempo ultima esecizoone er attuale
const TARGET_FPS = 60;
const FRAME_TIME = 1 / TARGET_FPS;
// Funzione principale di animazione (moviemnto uccello, tubi e terreno)

//Variabile gestione suoni
let gameSoundsVolume=0.2;
let gameMusicVolume=0.2;

let jumpSound = new Audio();
jumpSound.src= 'audio/jumpSound.mp3';
jumpSound.volume=gameSoundsVolume;

let deathSound = new Audio();
deathSound.src= 'audio/deathSound.mp3';
deathSound.volume=gameSoundsVolume;

let themeSong=new Audio();
themeSong.src='audio/themeSong.mp3';
themeSong.loop=true;
themeSong.volume=gameMusicVolume;

let rangeGameSounds=document.createElement("input");
rangeGameSounds.setAttribute("type", "range");
let rangeGameSoundsLabel=document.createElement("label");
rangeGameSoundsLabel.textContent="Game Effects";
let rangeGameSoundsNumber=document.createElement("label");

let rangeGameMusic=document.createElement("input");
rangeGameMusic.setAttribute("type", "range");
let rangeGameMusicLabel=document.createElement("label");
rangeGameMusicLabel.textContent="Game Music";
let rangeGameMusicNumber=document.createElement("label");


rangeGameSounds.setAttribute("min", "0");
rangeGameSounds.setAttribute("max", "1");
rangeGameSounds.setAttribute("step","0.01");

rangeGameMusic.setAttribute("min", "0");
rangeGameMusic.setAttribute("max", "1");
rangeGameMusic.setAttribute("step","0.01");

rangeGameSounds.value=gameSoundsVolume;
rangeGameMusic.value=gameMusicVolume;

rangeGameSounds.classList.add("customRange");
rangeGameMusic.classList.add("customRange");
rangeGameSounds.id="rangeGameSounds";
rangeGameMusic.id="rangeGameMusic";
rangeGameMusicLabel.classList.add("customLabel");
rangeGameMusicNumber.classList.add("labelNumber");
rangeGameMusicLabel.id="rangeGameMusicLabel";
rangeGameMusicNumber.id="rangeGameMusicNumber";
rangeGameSoundsLabel.classList.add("customLabel");
rangeGameSoundsNumber.classList.add("labelNumber");
rangeGameSoundsLabel.id="rangeGameSoundsLabel";
rangeGameSoundsNumber.id="rangeGameSoundsNumber";


//Fine variaile gestione suoni

//Inizio variaible per gestion menu in gioco
let gameState=0; //variabile che tiene conto dello stato del gioc procedente alla apertura del menu
// 0= era nel menu 1=era in gioco 2=era nella schermata di game over 3=era nel menu
let resumeButton=document.createElement("button");
resumeButton.id="resumeButton";
resumeButton.classList.add("menuButton");
let audioButton=document.createElement("button");
audioButton.id="audioButton";
audioButton.classList.add("menuButton");
let menuButton=document.createElement("button");
menuButton.id="menuButton";
menuButton.classList.add("menuButton");
//Fiune arabili pèer gestione menu in gioco

//Inizializzazione dificilota
deadbird.src='immagini/deadBird/deadEasy.png';
topPipeImg.src = "./immagini/easy/pipeTopEasy.png";
bottomPipeImg.src = "./immagini/easy/pipeBottomEasy.png";
birdImages[0].src = "./immagini/bird/easy/bird1Easy.png";
birdImages[1].src = "./immagini/bird/easy/bird2Easy.png";
birdImages[2].src = "./immagini/bird/easy/bird3Easy.png";
ground.src = "./immagini/easy/groundEasy.png"; // Carica l'immagine del terreno

//Inzio variabili stato;
let difficolta=1; //1 easy, 2 normal, 3 hard,4 custom

let bestEasyPoints=0;//carico dalle cache
let bestEasy=document.createElement("label");
bestEasy.id="bestEasy";
bestEasy.classList.add("bestLabel");
bestEasy.innerHTML=bestEasyPoints;

let bestNormalPoints=0;//carico dalle cache
let bestNormal=document.createElement("label");
bestNormal.id="bestNormal";
bestNormal.classList.add("bestLabel");
bestNormal.innerHTML=bestNormalPoints;

let bestHardPoints=0; //carico dalle cache
let bestHard=document.createElement("label");
bestHard.id="bestHard";
bestHard.classList.add("bestLabel");
bestHard.innerHTML=bestHardPoints;

let bestScoreMenu=document.createElement("div");
bestScoreMenu.id="bestScoreMenu";

let backButtonScore=document.createElement("button");
backButtonScore.id="backButtonScore";
backButtonScore.classList.add("backButton");
backButtonScore.textContent="back";

function animate() {
    if(!gameRunning) return;
    // Calcolo delta time con limitazione
    thisLoop = performance.now();
    timeDifference = (thisLoop - (lastLoop || thisLoop)) / 1000;
    timeDifference = Math.min(timeDifference, FRAME_TIME); // Limita il delta time massimo
    // Applica gravitÃ  con delta time regolato
    velocityY += gravity * timeDifference;
    frameTimer+=timeDifference*1000;
    // Mantieni la velocitÃ  dei tubi indipendente dagli FPS
    velocityX = velocityXMultiplayer * timeDifference;
    
     // Aggiorna posizione uccello
    bird.y = Math.min(Math.max(bird.y + velocityY * timeDifference, 0), boardHeight - bird.height - groundHeight);
        
    lastLoop = thisLoop;
    // Gestisce l'animazione dell'uccello cambiando immagine ogni 20 frame
    if (frameTimer >= frameInterval) { 
        frameTimer = 0;
        currentFrame = (currentFrame + 1) % birdImages.length;
    }
    context.clearRect(0, 0, board.width, board.height); // Pulisce la schermata
    context.drawImage(birdImages[currentFrame], bird.x, bird.y, bird.width, bird.height); // Disegna l'uccello
   
    // Gestisce i tubi, sposta di velocityX i tubi . Quetsa viene poi chiamata altre volte cosi da simulare il moviemnt odei tubi graduale
    for (let i = 0; i < pipeArray.length; i++) { 
        let pipe = pipeArray[i]; 
        pipe.x += velocityX; // Sposta i tubi verso sinistra
        if(pipe.x+pipe.width > 0 && pipe.x < board.width){
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }
        if (detectCollision(pipe, bird)) {
            context.clearRect(bird.x, bird.y, bird.width, bird.height); // Pulisce la schermata
            context.drawImage(deadbird, bird.x, bird.y, bird.width, bird.height); // Disegna l'uccello morto 
            gameOver();
        }
        if(!pipe.pipeCondition&&pointMade(pipe,bird)){
            pipe.pipeCondition=true;
            punti++;
        }
          
    } 
    
    // Rimuove i tubi fuori dalla schermata. 2 volte per il tubo in alto e in bass
    if (pipeArray.length > 0 && pipeArray[0].x + pipeWidth < 0) {
        pipeArray.shift(); 
        pipeArray.shift();
    }

    // Gestisce il terreno. Disegno uno alla votla per simularne il movimento con uccello
    for (let i = 0; i < groundArray.length; i++) {
        let terreno = groundArray[i];
        terreno.x += velocityX;
        context.drawImage(terreno.img, terreno.x, terreno.y, terreno.width, terreno.height);
        
        if (detectCollision(terreno, bird)) {
            context.clearRect(bird.x, bird.y, bird.width, bird.height); // Pulisce la schermata
            context.drawImage(deadbird, bird.x, bird.y, bird.width, bird.height); // Disegna l'uccello morto 
           gameOver();
        }
    }
    
    if (groundArray.length > 0 && groundArray[groundArray.length - 1].x <= boardWidth - groundWidth) { //se lunghezza terrenno >0 e cordinata x ultimo elemento tocca il bordo allora ne genero un altro
        groundPlace();
    }
    if (groundArray.length > 0 && groundArray[0].x + groundWidth < 0) {
        groundArray.shift(); // Rimuovi il pezzo di terreno fuori dallo schermo
    }
    
    document.getElementById("points").innerText = punti/2;
    
    animationID=requestAnimationFrame(animate); // Richiama la funzione per il prossimo frame
}

// Funzione per generare i tubi
function pipePlace() {  
    let altezza=(Math.floor(Math.random() * (boardHeight - 400)) + 300); 
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: -((pipeGap/2)+altezza), 
        width: pipeWidth,
        height: boardHeight,
        pipeCondition: false,
    };
 
    let bottomPipe =  {
        img: bottomPipeImg,
        x: pipeX,
        y: boardHeight - altezza + pipeGap/2,
        width: pipeWidth,
        height: boardHeight,
        pipeCondition: false,
    };

    pipeArray.push(topPipe, bottomPipe);//inserisco gli elementi nell'array delle pipes
}

// Funzione per generare il terreno
function groundPlace() {
    let terreno = {
        img: ground, // Immagine del terreno
        x: groundArray.length > 0 
            ? groundArray[groundArray.length - 1].x + groundWidth-2  // Se esiste giÃ  un pezzo di terreno, posiziona il nuovo subito dopo l'ultimo, leggertmenete sorpa per evitare buchi tra terra
            : 0,  // Se l'array Ã¨ vuoto (primo pezzo di terreno), posiziona il primo a x = 0
        y: boardHeight - groundHeight, // Posiziona il terreno in basso sullo schermo
        width: groundWidth, // Larghezza del terreno
        height: groundHeight, // Altezza del terreno
    };

    groundArray.push(terreno); // Inserisce il nuovo pezzo di terreno nell'array
}

// Funzione per gestire il salto dell'uccello
function jumpBird(key) {
    if (key.code == "Space" || key.code == "ArrowUp") {
        let jumpSoundClone= jumpSound.cloneNode(); //cosi se si salta piu volte i souni vengono sovrapposti e non si annullano fra loro
        jumpSoundClone.volume = jumpSound.volume;
        jumpSoundClone.play();
        velocityY = jump;
    }
}

// Funzione per rilevare collisioni
function detectCollision(a, b) {
    let birdMarginX = 15; // Riduci la larghezza effettiva per non contare troppo le ali

    return (a.x + birdMarginX < b.x + b.width &&
            a.x + a.width - birdMarginX > b.x &&
            a.y <= b.y + b.height &&
            a.y + a.height >= b.y);

}

//a = uccello b=tubo
function pointMade(a,b){
    return (a.x + b.width  < b.x );
}

function callMenu(){
    gameState=0;
    document.getElementById("gameScreen").appendChild(menu);
   // Posiziona 20 pezzi di terreno consecutivi per coprire la parte inferiore dello schermo
    start.classList.add("menuButton");
    bestScore.classList.add("menuButton");
    modeButton.classList.add("menuButton");

    menu.appendChild(start);
    menu.appendChild(bestScore);
    menu.appendChild(modeButton);

    modeButton.addEventListener("click",function(){
        event.stopPropagation();
        menu.innerHTML = ""; //Rimuove tutti i figli esistenti
        modeSelector();
    });
    bestScore.addEventListener("click",bestScoreMenuFun);
    start.addEventListener("click",function(){
        event.stopPropagation();
        menu.innerHTML = ""; //Rimuove tutti i figli esistenti
        if(document.getElementById("gameScreen").contains(menu)){
            document.getElementById("gameScreen").removeChild(menu);
        }
       startGame();
    });
   
}
function bestScoreMenuFun(){
    gameState=3;
    menu.innerHTML = ""; //Rimuove tutti i figli esistenti
    if(document.getElementById("gameScreen").contains(menu)){
        document.getElementById("gameScreen").removeChild(menu);
    }
    document.getElementById("gameScreen").appendChild(bestScoreMenu);
    bestScoreMenu.appendChild(backButtonScore);
    bestScoreMenu.appendChild(bestEasy);
    bestScoreMenu.appendChild(bestNormal);
    bestScoreMenu.appendChild(bestHard);
    backButtonScore.addEventListener("click",backButtonScoreFun);
}
function backButtonScoreFun(){
    bestScoreMenu.innerHTML="";
    if(document.getElementById("gameScreen").contains(bestScoreMenu)){
        document.getElementById("gameScreen").removeChild(bestScoreMenu);
    }
    backButtonScore.removeEventListener("click",backButtonScoreFun)
    callMenu();
}
function startGame(){
    document.addEventListener("keydown", jumpBird);
    document.addEventListener("click", clickBirdJump);
    gameState=1;
    themeSong.play();
    clearInterval(pipeInterval);
    pipeInterval = null;
    lastLoop=null;
    nFrame=0;

    pipeArray = [];
    groundArray = [];
    for (let i = 0; i < 20; i++) {
        groundPlace();
    }
    context.clearRect(0, 0, board.width, board.height);
    bird.x = boardWidth / 24;
    bird.y = boardHeight / 2;
    velocityY = 0;
    context.drawImage(birdImages[currentFrame], bird.x, bird.y, bird.width, bird.height);
    pipeInterval= setInterval(pipePlace, delayPipe);
    gameRunning=true;
    punti=0;
    animationID=animate();
}

function clickBirdJump(){
    velocityY = jump;
    let jumpSoundClone= jumpSound.cloneNode(); //cosi se si salta piu volte i souni vengono sovrapposti e non si annullano fra loro
    jumpSoundClone.volume=jumpSound.volume;
    jumpSoundClone.play(); 
}

function gameOver(){

    // Aggiorna i punteggi e l'oggetto globale datiGioco in base alla difficoltà
    if(difficolta === 1){
        if(punti/2 > bestEasyPoints){
            bestEasyPoints = punti/2; 
            bestEasy.innerHTML = bestEasyPoints;
            datiGioco.bestScoreEasy = bestEasyPoints; // Aggiorna l'oggetto datiGioco
        }
    } else if(difficolta === 2){
        if(punti/2 > bestNormalPoints){
            bestNormalPoints = punti/2;
            bestNormal.innerHTML = bestNormalPoints;
            datiGioco.bestScoreNormal = bestNormalPoints;
        }
    } else if(difficolta === 3){
        if(punti/2 > bestHardPoints){
            bestHardPoints = punti/2;
            bestHard.innerHTML = bestHardPoints;
            datiGioco.bestScoreHard = bestHardPoints;
        }
    }
    
    // Salva l'oggetto aggiornato in localStorage
    localStorage.setItem("datiGioco", JSON.stringify(datiGioco));
    
    // Procedi con il resto della logica di game over
    gameState = 2;
    let deathSoundClone = deathSound.cloneNode();
    deathSoundClone.volume = deathSound.volume;
    deathSoundClone.play();
    document.removeEventListener("keydown", jumpBird);
    document.removeEventListener("click", clickBirdJump);
    
    clearInterval(pipeInterval);
    cancelAnimationFrame(animationID);
    gameRunning = false;
    
    document.getElementById("gameScreen").appendChild(gameOverMenuDiv);
    gameOverMenuDiv.appendChild(gameOverMenu);
    gameOverMenuDiv.appendChild(retryButton);
    gameOverMenuDiv.appendChild(homeButton);
    
    // Gestione rientro o riavvio
    addEventListener("keydown", function(){
        if(event.code == "Space" || event.code == "ArrowUp"){
            if(document.getElementById("gameScreen").contains(gameOverMenuDiv)){
                document.getElementById("gameScreen").removeChild(gameOverMenuDiv);
                event.stopPropagation();
                startGame();
            }
        }
    });
    
    retryButton.addEventListener("click", function(){
        gameOverMenuDiv.innerHTML = "";
        if(document.getElementById("gameScreen").contains(gameOverMenuDiv)){
            document.getElementById("gameScreen").removeChild(gameOverMenuDiv);
            event.stopPropagation();
            startGame();
        }
    });
    
    homeButton.addEventListener("click", function(){
        gameOverMenuDiv.innerHTML = "";
        if(document.getElementById("gameScreen").contains(gameOverMenuDiv)){
            document.getElementById("gameScreen").removeChild(gameOverMenuDiv);
        }
        event.stopPropagation();
        callMenu();
    });
}

function backButtonCustom(){
    backModeButton.removeEventListener("click",backButtonCustom);
    removeModeButtons();
    callMenu();
}
function modeSelector(){
    menu.appendChild(easyButton);
    menu.appendChild(normalButton);
    menu.appendChild(hardButton);
    menu.appendChild(personalizedButton);
    menu.appendChild(backModeButton);
    backModeButton.addEventListener("click",backButtonCustom);
    easyButton.addEventListener("click",function() {
        difficolta=1;
        birdImages[0].src = "./immagini/bird/easy/bird1Easy.png";
        birdImages[1].src = "./immagini/bird/easy/bird2Easy.png";
        birdImages[2].src = "./immagini/bird/easy/bird3Easy.png";
        gameOverMenu.src='immagini/gameOver/easyGameOver.png';
        deadbird.src='immagini/deadBird/deadEasy.png';
        board.classList.value = "";
        document.body.classList.value = "";
        board.classList.add("boardEasy");
        document.body.classList.add("bodyEasy");
        topPipeImg.src = "./immagini/easy/pipeTopEasy.png";
        bottomPipeImg.src = "./immagini/easy/pipeBottomEasy.png";
        ground.src  = "./immagini/easy/groundEasy.png";
        velocityXMultiplayer=velocityXMultiplayerEasyMode;
        delayPipe=delayPipeEasy;
        gravity=gravityEasy;
        jump=jumpEasy;
        pipeGap=pipeGapDefault;
        removeModeButtons();
        startGame();
    });
    normalButton.addEventListener("click",function() {
        difficolta=2;
        birdImages[0].src = "./immagini/bird/normal/bird1Normal.png";
        birdImages[1].src = "./immagini/bird/normal/bird2Normal.png";
        birdImages[2].src = "./immagini/bird/normal/bird3Normal.png";
        gameOverMenu.src='immagini/gameOver/normalGameOver.png';
        deadbird.src='immagini/deadBird/deadNormal.png';
        board.classList.value = "";
        document.body.classList.value = "";
        board.classList.add("boardNormal");
        document.body.classList.add("bodyNormal");
        topPipeImg.src = "./immagini/normal/pipeTopNormal.png";
        bottomPipeImg.src = "./immagini/normal/pipeBottomNormal.png";
        ground.src  = "./immagini/normal/groundNormal.png";
        velocityXMultiplayer = velocityXMultiplayerNormalMode;
        gravity=gravityNormal;
        jump=jumpNormal;
        delayPipe=delayPipeNormal;
        pipeGap=pipeGapDefault;
        removeModeButtons();
        startGame();
    });
    hardButton.addEventListener("click", function() {
        difficolta=3;
        birdImages[0].src = "./immagini/bird/hard/bird1Hard.png";
        birdImages[1].src = "./immagini/bird/hard/bird2Hard.png";
        birdImages[2].src = "./immagini/bird/hard/bird3Hard.png";
        gameOverMenu.src='immagini/gameOver/hardGameOver.png';
        deadbird.src='immagini/deadBird/deadHard.png';
        board.classList.value = "";
        document.body.classList.value = "";
        board.classList.add("boardHard");
        document.body.classList.add("bodyHard");
        topPipeImg.src = "./immagini/hard/pipeTopHard.png";
        bottomPipeImg.src = "./immagini/hard/pipeBottomHard.png";
        ground.src  = "./immagini/hard/groundHard.png";
        velocityXMultiplayer=velocityXMultiplayerHardMode;
        gravity=gravityHard;
        jump=jumpHard;
        delayPipe=delayPipeHard;
        pipeGap=pipeGapDefault;
        removeModeButtons();
        startGame();
    });
    personalizedButton.addEventListener("click", function () {
        removeModeButtons();
        document.getElementById("gameScreen").appendChild(menu);
        
        //aggiugno le label con gli input al menu
        menu.appendChild(rangeGapLabel);
        menu.appendChild(rangeGap);
        menu.appendChild(rangeGapNumber);

        menu.appendChild(rangeGravityLabel);
        menu.appendChild(rangeGravity);
        menu.appendChild(rangeGravityNumber);

        menu.appendChild(rangeJumpLabel);
        menu.appendChild(rangeJump);
        menu.appendChild(rangeJumpNumber);

        menu.appendChild(rangeSpawnRateLabel);
        menu.appendChild(rangeSpawnRate);
        menu.appendChild(rangeSpawnRateNumber);

        menu.appendChild(rangeVelocityLabel);
        menu.appendChild(rangeVelocity);
        menu.appendChild(rangeVelocityNumber);
        
        menu.appendChild(confirmCustomButton);
        menu.appendChild(backCustomButton);
        
        rangeGap.addEventListener("change",function(){
            rangeGapNumber.innerText= rangeGap.value;
        });
        rangeGravity.addEventListener("change",function(){
            rangeGravityNumber.innerText= rangeGravity.value;
        });
        rangeJump.addEventListener("change",function(){
            rangeJumpNumber.innerText= rangeJump.value;
        });
        rangeSpawnRate.addEventListener("change",function(){
            rangeSpawnRateNumber.innerText= rangeSpawnRate.value;
        });
        rangeVelocity.addEventListener("change",function(){
            rangeVelocityNumber.innerText= rangeVelocity.value;
        });

        confirmCustomButton.addEventListener("click",confirmCustomMode);
        backCustomButton.addEventListener("click",backCustomMenu);
            
    });
    
}

function confirmCustomMode(){
    difficolta=4;
    confirmCustomButton.removeEventListener("click",confirmCustomMode);
    birdImages[0].src = "./immagini/bird/custom/bird1Custom.png";
    birdImages[1].src = "./immagini/bird/custom/bird2Custom.png";
    birdImages[2].src = "./immagini/bird/custom/bird3Custom.png";
    gameOverMenu.src='immagini/gameOver/customGaveOver.png';
    deadbird.src='immagini/deadBird/deadCustom.png';
    board.classList.value = "";
    document.body.classList.value = "";
    board.classList.add("boardCustom");
    document.body.classList.add("bodyCustom");
    topPipeImg.src = "./immagini/custom/pipeTopCustom.png";
    bottomPipeImg.src = "./immagini/custom/pipeBottomCustom.png";
    ground.src  = "./immagini/custom/groundCustom.png";
    velocityXMultiplayerCustom=parseInt(rangeVelocity.value*-1);
    gravityCustom=parseInt(rangeGravity.value);
    jumpCustom=parseInt(rangeJump.value*-1);
    delayPipeCustom=parseInt(rangeSpawnRate.value);
    pipeGapCustom=parseInt(rangeGap.value);

    velocityXMultiplayer=velocityXMultiplayerCustom ;
    gravity=gravityCustom;
    jump=jumpCustom;
    delayPipe=delayPipeCustom;
    pipeGap=pipeGapCustom;
    event.stopPropagation();
    closeCustomMenu();
    startGame();
}
function backCustomMenu(){
    backCustomButton.removeEventListener("click",backCustomMenu);
    rangeGap.value = pipeGapCustom;
    rangeJump.value = jumpCustom * -1;
    rangeGravity.value = gravityCustom;
    rangeVelocity.value = velocityXMultiplayerCustom*-1;
    rangeSpawnRate.value = delayPipeCustom;
    closeCustomMenu();
    callMenu();
}
function removeModeButtons(){
    event.stopPropagation();
    menu.innerHTML="";
    if(document.getElementById("gameScreen").contains(menu)){
        document.getElementById("gameScreen").removeChild(menu);
    }
}

function closeCustomMenu(){
    menu.innerHTML="";
    if(document.getElementById("gameScreen").contains(menu)){
        document.getElementById("gameScreen").removeChild(menu);
    }
}

//funzione per impostare audio e fermare il gioco
function callOptionMenu(){
    document.removeEventListener("keydown", jumpBird);
    document.removeEventListener("click", clickBirdJump);
    event.stopPropagation();
    if(gameState==0){
        //era nel menu
        menu.innerHTML="";
        if(document.getElementById("gameScreen").contains(menu)){
            document.getElementById("gameScreen").removeChild(menu);
            confirmCustomButton.removeEventListener("click",confirmCustomMode);
          backCustomButton.removeEventListener("click",backCustomMenu); //rimuovov eventuali event lsitenr per evtia problemi
        }
    }else if(gameState==1){
        //ero in gioco
        clearInterval(pipeInterval);
        cancelAnimationFrame(animationID);
        gameRunning=false;
    }else if(gameState==3){
        bestScoreMenu.innerHTML="";
        if(document.getElementById("gameScreen").contains(bestScoreMenu)){
            document.getElementById("gameScreen").removeChild(bestScoreMenu);
        }
    }else{
        //ero nel game over
        gameOverMenuDiv.innerHTML="";
        if(document.getElementById("gameScreen").contains(gameOverMenuDiv)){
            document.getElementById("gameScreen").removeChild(gameOverMenuDiv);
        }
    }
    document.addEventListener("keydown",closeResumebuttonFromKey);
    document.getElementById("gameScreen").appendChild(optionMenu);
    optionMenu.appendChild(audioButton);
    optionMenu.appendChild(menuButton);
    optionMenu.appendChild(resumeButton);
    audioButton.addEventListener("click", function(){
        document.getElementById("pauseButton").onclick = null; //cosi non chaima menu mentre sta a fa audio
        optionMenu.innerHTML="";
        if(document.getElementById("gameScreen").contains(optionMenu)){
            document.getElementById("gameScreen").removeChild(optionMenu);
        }
        document.getElementById("gameScreen").appendChild(optionMenu);
        rangeGameSoundsNumber.textContent=rangeGameSounds.value;
        rangeGameMusicNumber.textContent=rangeGameMusic.value;

        optionMenu.appendChild(confirmCustomButton);
        optionMenu.appendChild(backCustomButton);
        
        optionMenu.appendChild(rangeGameSounds);
        optionMenu.appendChild(rangeGameSoundsLabel);
        optionMenu.appendChild(rangeGameSoundsNumber);
        
        optionMenu.appendChild(rangeGameMusic);
        optionMenu.appendChild(rangeGameMusicLabel);
        optionMenu.appendChild(rangeGameMusicNumber);

        rangeGameSounds.addEventListener("change",function(){
            rangeGameSoundsNumber.innerHTML=rangeGameSounds.value;
        });
        rangeGameMusic.addEventListener("change",function(){
            rangeGameMusicNumber.innerHTML=rangeGameMusic.value;
        });
        confirmCustomButton.addEventListener("click",confirmAudioSettings);
        backCustomButton.addEventListener("click",backAudioSettings);
    });
    menuButton.addEventListener("click", function(){
        optionMenu.innerHTML="";
        if(document.getElementById("gameScreen").contains(optionMenu)){
            document.getElementById("gameScreen").removeChild(optionMenu);
        }
        callMenu();
    });
    resumeButton.addEventListener("click", resumeButtonFun);
}

function closeResumebuttonFromKey(event){
    if(event.code=="Escape"|| event.code=="Enter"){
        resumeButtonFun();
    }
}
function confirmAudioSettings(){
    document.getElementById("pauseButton").onclick = callOptionMenu; //rimetto onclcik che ho rimosso prima
    // Aggiorna l'oggetto datiGioco con i valori correnti dei range (converti in float se necessario)
    datiGioco.musicVolume = parseFloat(rangeGameMusic.value);
    datiGioco.effectVolume = parseFloat(rangeGameSounds.value);
    
    // Salva l'oggetto aggiornato in localStorage
    localStorage.setItem("datiGioco", JSON.stringify(datiGioco));

    // Applica i nuovi volumi agli oggetti audio
    themeSong.volume = datiGioco.musicVolume;
    jumpSound.volume = datiGioco.effectVolume;
    deathSound.volume = datiGioco.effectVolume;

    console.log("Volume aggiornato:", datiGioco);

    // Eventuali operazioni successive (es. chiusura del menu)...
    confirmCustomButton.addEventListener("click", confirmAudioSettings);
    backCustomButton.addEventListener("click", backAudioSettings);
    optionMenu.innerHTML = "";
    if(document.getElementById("gameScreen").contains(optionMenu)){
        document.getElementById("gameScreen").removeChild(optionMenu);
    }
    callOptionMenu();
}

function backAudioSettings(){
    document.getElementById("pauseButton").onclick = callOptionMenu; //rimetto onclcik che ho rimosso prima
    confirmCustomButton.addEventListener("click",confirmAudioSettings);
    backCustomButton.addEventListener("click",backAudioSettings);
    optionMenu.innerHTML="";
        if(document.getElementById("gameScreen").contains(optionMenu)){
            document.getElementById("gameScreen").removeChild(optionMenu);
        }
    callOptionMenu();
}
function resumeButtonFun(){
    confirmCustomButton.removeEventListener("click",confirmAudioSettings);
    backCustomButton.removeEventListener("click",backAudioSettings);
    document.removeEventListener("keydown",closeResumebuttonFromKey);
    gameRunning=true;
    event.stopPropagation();
    optionMenu.innerHTML="";
    if(document.getElementById("gameScreen").contains(optionMenu)){
         document.getElementById("gameScreen").removeChild(optionMenu);
    }
    if(!gameState || gameState==3){
        callMenu();
    }else if(gameState==1){
        document.addEventListener("keydown", jumpBird);
        document.addEventListener("click", clickBirdJump);
        clearInterval(pipeInterval);
        pipeInterval= setInterval(pipePlace, delayPipe);
        animationID=animate();
    }else{
        gameOver();
    }
}
// Inizializzazione del gioco quando la finestra Ã¨ caricata
// Quando la finestra viene caricata, esegue la funzione di inizializzazione
function caricaDati(){
    bestEasyPoints = datiGioco.bestScoreEasy;
    bestNormalPoints = datiGioco.bestScoreNormal;
    bestHardPoints = datiGioco.bestScoreHard;
    
    bestEasy.innerHTML = bestEasyPoints;
    bestNormal.innerHTML = bestNormalPoints;
    bestHard.innerHTML = bestHardPoints;
    
    gameMusicVolume = datiGioco.musicVolume;
    effectVolume = datiGioco.effectVolume;

    themeSong.volume = gameMusicVolume;
    jumpSound.volume = effectVolume;
    deathSound.volume = effectVolume;

    rangeGameSounds.value=effectVolume;
    rangeGameMusic.value=gameMusicVolume;
    rangeGameSoundsNumber.value=effectVolume;
    rangeGameMusicNumber.value=gameMusicVolume;
}


window.onload = function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/4IB/Ismail/flappyBird/sw.js")
            .then(() => console.log("Service Worker registrato!"))
            .catch(err => console.log("Service Worker non registrato", err));
    }   
    
    const datiSalvati = localStorage.getItem("datiGioco");
    if (datiSalvati) {
        // Aggiorna l'oggetto globale datiGioco
        Object.assign(datiGioco, JSON.parse(datiSalvati));
        console.log("Dati caricati:", datiGioco);
        caricaDati();
    }
    board= document.getElementById("board");
    board.classList.add("boardEasy");
    document.body.classList.add("bodyEasy");
    jump=jumpEasy;//inizializzo jump a quella di easy
    gravity=gravityEasy; //inizalizzo gravita a quella di facile
    velocityXMultiplayer=velocityXMultiplayerEasyMode;
    // Posiziona 20 pezzi di terreno consecutivi per coprire la parte inferiore dello schermo
    
    
   
    // Recupera l'elemento <canvas> con id "board" e lo assegna alla variabile "board"
    
    // Imposta la larghezza e l'altezza della canvas
    board.width = boardWidth;
    board.height = boardHeight;
    // Ottiene il contesto 2D della canvas, necessario per disegnare gli elementi del gioco
    context = board.getContext("2d");
    // Posiziona la prima coppia di tubi nella schermata
    
    document.addEventListener("visibilitychange", function() {
        if(document.hidden){
            clearInterval(pipeInterval);
            pipeInterval=null;
            pipeArray= [];
        }else{
            pipeInterval= setInterval(pipePlace, delayPipe);
        }
    });
    pipePlace();
    // Genera nuove coppie di tubi ogni 2 secondi
    
    //disegno uccello all'inzio
    context.drawImage(birdImages[currentFrame], bird.x, bird.y, bird.width, bird.height);
    document.addEventListener("keydown",function(){
        if(event.code=="Escape"|| event.code=="Enter"){
            callOptionMenu();
        }
    })
    // Chiama il meni che pensera poi a avviare l'animazione del gioco
    callMenu();
    
}
