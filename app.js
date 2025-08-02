function randomAttackNumber(max, min) {
    const value = Math.floor(Math.random() * (max - min)) + min;
    return value;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logs : []
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logs = [];
        },
        attackMonster() {
            this.currentRound++
            this.monsterHealth -=  randomAttackNumber(12, 5);
            this.attackPlayer();
            this.logs.push("Monster attacked");
        },
        spacialAttack() {
            this.currentRound++;
            this.monsterHealth -= randomAttackNumber(25, 10)
            this.attackPlayer();
            this.logs.push("Spacial attacked");
        },
        attackPlayer() {
            this.playerHealth -= randomAttackNumber(15, 8);
            this.logs.push("Player attacked");
        },
        heal() {
                this.currentRound++;
                const healValue = randomAttackNumber(20, 8);
                if (this.playerHealth + healValue > 100) {
                    this.playerHealth = 100;
                } else {
                    this.playerHealth += healValue;
                }
                this.attackPlayer();
            this.logs.push("Player healed");

        },
        surrender() {
            this.winner = "Monster";
            this.logs.push("Player surrender");
        }
    },
    computed: {
        monsterBarStyle(){
            if (this.monsterHealth < 0) {
                return {width: "0%"}
            }
            return {width: this.monsterHealth + '%'};

        },
        playerBarStyle(){
            if (this.playerHealth < 0) {
                return {width: "0%"}
            }
            return {width: this.playerHealth + '%'};
        }
    },
    watch: {
        monsterHealth(value) {
            if (value <= 0) {
                this.winner = "Player";
            }
        },
        playerHealth(value) {
            if (value <= 0) {
                this.winner = "Monster";
            }
        }
    }
});
app.mount("#game");