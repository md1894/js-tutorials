const ATTACK_VALUE = 10;
const PLAYER_DAMAGE_VALUE = 14;
const STRONG_DAMAGE_VALUE = 18;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'attack';
const MODE_STRONG_ATTACK = 'strong_attack';

const EVENT_PLAYER_ATTACK = 'player_attack';
const EVENT_PLAYER_STRONG_ATTACK = 'player_strong_attack';
const EVENT_MONSTER_ATTACK = 'monster_attack';
const EVENT_PLAYER_HEAL = 'player_heal';
const EVENT_PLAYER_WON = 'player_won';
const EVENT_PLAYER_LOST = 'player_lost';
const EVENT_DRAW = 'draw';

let maxLifeValue = prompt('enter max life value', '100');

if(isNaN(parseInt(maxLifeValue)) || parseInt(maxLifeValue) <= 0){
    maxLifeValue = 100;
}

let currentMonsterHealth = maxLifeValue;
let currentPlayerHealth = maxLifeValue;
let hasBonusLife = true;

let log_entries = [];

adjustHealthBars(maxLifeValue);

function reset(){
    currentPlayerHealth = maxLifeValue;
    currentMonsterHealth = maxLifeValue;
    resetGame(maxLifeValue);
}

function write_log(Event, playerDamage, monsterDamage){
    logEntry = {
        'Event' : Event,
        'PlayerStatus' : playerDamage,
        'MonsterStatus' : monsterDamage,
    };
    if(Event === EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER'
    }else if(Event === EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER'
    }else if(Event === EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER'
    }else if(Event === EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER'
    }else if(Event === EVENT_PLAYER_LOST){
        logEntry.PlayerStatus = 'LOST !';
        logEntry.MonsterStatus = 'WON !';
    }else if(Event === EVENT_PLAYER_WON){
        logEntry.PlayerStatus = 'WON !';
        logEntry.MonsterStatus = 'LOST !';
    }else{
        logEntry.PlayerStatus = 'Nothing';
        logEntry.MonsterStatus = 'Nothing';
    }
    log_entries.push(logEntry);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(PLAYER_DAMAGE_VALUE);
    currentPlayerHealth -= playerDamage;
    let resetFlag = false;
    write_log(EVENT_MONSTER_ATTACK, currentPlayerHealth, currentMonsterHealth);
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you have got the bonus life !!!')
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('you won !!!');
        resetFlag = true;
        write_log(EVENT_PLAYER_WON, '', '');
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        // player loss situation
        alert('you lost !!!');
        resetFlag = true;
        // WRITE_LOG
        write_log(EVENT_PLAYER_LOST, '', '');
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        // draw situation
        alert('its a draw !!!');
        resetFlag = true;
        // WRITE_LOG
        write_log(EVENT_DRAW, '', '');
    }

    if(resetFlag){
        reset();
    }
}

function attack_monster(mode){
    let maxDamage = 0;
    let event = 0;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        event = EVENT_PLAYER_ATTACK;
    }else if(mode == MODE_STRONG_ATTACK){
        maxDamage = STRONG_DAMAGE_VALUE;
        event = EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    // WRITE_LOG
    write_log(event, currentPlayerHealth, currentMonsterHealth);
    endRound();
}

function attackHandler(){
    attack_monster(MODE_ATTACK);
}

function strongAttackHandler(){
    attack_monster(MODE_STRONG_ATTACK);
}

function healEventHandler(){
    let healValue;
    if(currentPlayerHealth >= maxLifeValue - HEAL_VALUE){
        alert('ALREADY HEALTH IS ENOUGH');
        healValue = maxLifeValue - currentPlayerHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

function showLogHandler(){
    console.log(log_entries);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healEventHandler);
logBtn.addEventListener('click', showLogHandler);

/**
 * completed till section 22th of 4th part
 * 4.17 (heal functionality added)
 */