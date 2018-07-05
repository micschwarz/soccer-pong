import Team from './Team';

export default class Japan implements Team {

    private flag: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA' +
        'AB4AAAAeCAIAAAC0Ujn1AAAACXBIWXMAAC4jAAAuIwF4pT92AA' +
        'AAB3RJTUUH4gcEEB4X4a5CBgAAABl0RVh0Q29tbWVudABDcmVh' +
        'dGVkIHdpdGggR0lNUFeBDhcAAAA6SURBVEjHY/z//z8DbQATA8' +
        '3AqNGjRg9Ho1nwS2+3tMQj63n8+GhYjxo9ajS1AONo3Thq9KjRg' +
        '8RoAIcyCTdQrjiHAAAAAElFTkSuQmCC';

    getFlag(): string {
        return this.flag;
    }

    getTeamColor(): string {
        return '#b63838';
    }

    getTeamName(): string {
        return 'Japan';
    }

    getTeamNameId(): string {
        return 'jap';
    }

    getSpeed(defaultSpeed: number): number {
        return defaultSpeed;
    }

    getKeeperHeight(defaultWidth: number): number {
        return defaultWidth;
    }

    getBallSmashMultiplier(): number {
        return 1;
    }

    getBallPhiDivisor(defaultDivisor: number): number {
        return defaultDivisor - 0.4;
    }

    getSpecialAbilityText(): string {
        return 'Der maximale Rückschlagwinkel liegt bei 50° statt 45°';
    }
}
