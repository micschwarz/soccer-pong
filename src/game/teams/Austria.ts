import Team from './Team';

export default class Austria implements Team {

    private flag: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAI' +
        'AAAC0Ujn1AAAACXBIWXMAAC4jAAAuIwF' +
        '4pT92AAAAB3RJTUUH4gcEDjUMCwP4+QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdp' +
        'dGggR0lNUFeBDhcAAAAzSURBVEjHY3xva8tAG8DEQDMwavSo0cPR' +
        'aMb///+PBsio0aNGD4rcOFo3jho9avQgMRoAg8wGCZmjKFAAAAAASUV' +
        'ORK5CYII=';

    getFlag(): string {
        return this.flag;
    }

    getTeamColor(): string {
        return '#ef3d3d';
    }

    getTeamName(): string {
        return 'Österreich';
    }

    getTeamNameId(): string {
        return 'aus';
    }

    getSpeed(defaultSpeed: number): number {
        return defaultSpeed;
    }

    getKeeperHeight(defaultWidth: number): number {
        return defaultWidth;
    }

    getBallSmashMultiplier(): number {
        return 1.08;
    }

    getBallPhiDivisor(defaultDivisor: number): number {
        return defaultDivisor + 0.5;
    }

    getSpecialAbilityText(): string {
        return 'Der Ball wird 8% schneller zurückgespielt, allerdings ' +
            'ist der Refletionswinkel bei maximal 40°';
    }
}
