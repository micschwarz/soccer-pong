import Game from './Game';
import Team from './teams/Team';

export default class GameManager {
    private currentGame: Game;
    private team: Team;
    private teamAi: Team;
    private lastGameMulti: boolean = false;

    private gameRunning: boolean = false;
    private mouseTimeout: number;

    constructor() {
        const finishPopup = document.getElementById('gameFinish');

        document.addEventListener('mousemove', () => {

            if (this.gameRunning) {
                const canvas = document.getElementsByTagName('canvas')[0];
                clearTimeout(this.mouseTimeout);
                (<HTMLElement>canvas).style.cursor = 'default';
                this.mouseTimeout = setTimeout(
                    () => {
                        (<HTMLElement>canvas).style.cursor = 'none';
                    },
                    1000);
            }
        });

        document.addEventListener('gameDestroyed', (e) => {
            this.gameRunning = false;
            this.currentGame = null;
            const data = e['detail'];
            if (data['popup']) {
                this.renderFinishPopup(data['score'], data['teams'], data['multiplayer']);
            }
        });

        finishPopup.querySelector('.buttons .button.menu').addEventListener('click', () => {
            this.removeCanvas();
            this.removePopup();
        });

        finishPopup.querySelector('.buttons .button.retry').addEventListener('click', () => {
            this.removeCanvas();
            this.removePopup(false);
            this.initNewGame(this.team, this.teamAi, this.lastGameMulti);
        });

        document.querySelector('#ui .buttons .button.menu').addEventListener('click', () => {
            this.currentGame.destroy(false);
            this.removeCanvas();
            this.removePopup();
        });
    }

    renderFinishPopup(score: {}, teams: {}, multiplayer: boolean) {
        let winner = score['ai'] < score['user'] ? 'user' : 'ai';
        winner = score['ai'] === score['user'] ? 'middle' : winner;

        const finishPopup = document.getElementById('gameFinish');

        if (multiplayer && winner !== 'middle') {
            const multi = finishPopup.querySelector('.winner .multiplayer');
            (<HTMLElement>multi.getElementsByClassName('team')[0]).innerText = teams[winner];
            (<HTMLElement>multi).style.display = 'block';
        } else {
            (<HTMLElement>finishPopup.querySelector(`.winner .${winner}`)).style.display = 'block';
        }

        finishPopup.querySelector('.score').innerHTML = `${score['user']}:${score['ai']}`;
        finishPopup.style.display = 'flex';

    }

    private removeCanvas(): void {
        const canvas = document.getElementsByTagName('canvas')[0];
        document.body.removeChild(canvas);
        document.querySelector('#ui #score .flagAi').innerHTML = '';
        document.querySelector('#ui #score .flagUser').innerHTML = '';
    }

    private removePopup(showMenu: boolean = true): void {
        if (showMenu) {
            document.getElementById('menu').style.display = 'flex';
        }
        document.getElementById('gameFinish').style.display = 'none';
        document.getElementById('ui').style.display = 'none';

        this.cleanPopup();
    }

    private cleanPopup(): void {
        const gameFinish = document.querySelector('#gameFinish .popup');
        (<HTMLElement>gameFinish.querySelector('.winner .ai')).style.display = 'none';
        (<HTMLElement>gameFinish.querySelector('.winner .middle')).style.display = 'none';
        (<HTMLElement>gameFinish.querySelector('.winner .user')).style.display = 'none';
        const multi = (<HTMLElement>gameFinish.querySelector('.winner .multiplayer'));
        multi.style.display = 'none';
        multi.querySelector('.team').innerHTML = 'Team';
        gameFinish.querySelector('.score').innerHTML = '0:0';
    }

    initNewGame(team: Team, teamAi: Team, multiPlayer: boolean = false): void {
        this.team = team;
        this.teamAi = teamAi;

        this.gameRunning = true;

        this.lastGameMulti = multiPlayer;
        this.currentGame = new Game(this, team, teamAi, multiPlayer);
    }
}
