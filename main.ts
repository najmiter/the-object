import { deepThink } from './deep';

class O {
    private static DeepCompare(one: any, two: any) {
        return deepThink(one, two);
    }

    private static CompareEnteries(one: any, two: any) {
        for (const [i, el] of Object.entries(one)) {
            if (!this.DeepCompare(el, two[i])) {
                return false;
            }
        }
        return true;
    }

    static IsThisEqualSubsetOfThat(child: any, padre: any) {
        if (child === null || child === undefined) {
            return padre === child;
        }

        if (typeof child !== 'object' || typeof padre !== 'object') {
            return false;
        }

        if (Array.isArray(child)) {
            if (!Array.isArray(padre)) return false;
        }

        return this.CompareEnteries(child, padre);
    }
}

// const pops = { a: 12, b: 14, c: 15 };
// const kid = { a: 12, b: 14 };

const pops = [1, 2, 3];
const kid = [1, 2];

console.log(O.IsThisEqualSubsetOfThat(kid, pops));
