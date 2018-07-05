export default class Highscore {
    static save(difference: number) {
        const lastDiff = localStorage.getItem('bestDifference');
        if ((lastDiff && parseInt(lastDiff, 0) < difference) || !lastDiff) {
            localStorage.setItem('bestDifference', <string>difference);
        }
    }

    static load(): number {
        const lastDiff = localStorage.getItem('bestDifference');
        return lastDiff ? parseInt(lastDiff, 10) : undefined;
    }
}
