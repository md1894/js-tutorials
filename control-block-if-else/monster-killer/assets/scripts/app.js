const ATTACK_VALUE = 10;
const PLAYER_DAMAGE_VALUE = 14;
const STRONG_DAMAGE_VALUE = 18;
const HEAL_VALUE = 20;
let maxLifeValue = 100;
let currentMonsterHealth = maxLifeValue;
let currentPlayerHealth = maxLifeValue;

adjustHealthBars(maxLifeValue);

function endRound(){
    const playerDamage = dealPlayerDamage(PLAYER_DAMAGE_VALUE);
    currentPlayerHealth -= playerDamage;
    // player win situation
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('you won !!!');
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        // player loss situation
        alert('you lost !!!');
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        // draw situation
        alert('its a draw !!!');
    }
}

function attack_monster(mode){
    let maxDamage = 0;
    if(mode === 'attack'){
        maxDamage = ATTACK_VALUE;
    }else if(mode == 'strong_attack'){
        maxDamage = STRONG_DAMAGE_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler(){
    attack_monster('attack');
}

function strongAttackHandler(){
    attack_monster('strong_attack');
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healEventHandler);


/**
 * completed till section 17th of 4th part
 * 4.17 (heal functionality added)
 */