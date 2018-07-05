import Team from './Team';

export default class Belgium implements Team {

    private flag: string = 'data:image/png;base64,iVBORw0KGgoAAAANS' +
        'UhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAACXBIWXMAAC4jAAAuIwF4' +
        'pT92AAAAB3RJTUUH4gcEEBkQMItBYgAAABl0RVh0Q29tbWVudABD' +
        'cmVhdGVkIHdpdGggR0lNUFeBDhcAAAAxSURBVEjHY2TACz5fkMIj+' +
        'ydXGY8sEwPNwKjRo0aPGj1q9KjRo0aPGj1q9KjRw99oABClA' +
        '6WLyq6gAAAAAElFTkSuQmCC';

    getFlag(): string {
        return this.flag;
    }

    getTeamColor(): string {
        return '#f3d01a';
    }

    getTeamName(): string {
        return 'Belgien';
    }

    getTeamNameId(): string {
        return 'bel';
    }

    getSpeed(defaultSpeed: number): number {
        return defaultSpeed + 1;
    }

    getKeeperHeight(defaultWidth: number): number {
        return defaultWidth;
    }

    getBallSmashMultiplier(): number {
        return 0.9;
    }

    getBallPhiDivisor(defaultDivisor: number): number {
        return defaultDivisor;
    }

    getSpecialAbilityText(): string {
        return 'Die Keeper Geschwindigkeit ist 14% höher, die Abspielgeschwindigkeit jedoch um 10% reduziert';
    }
}
