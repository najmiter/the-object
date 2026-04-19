export function deepThink(flana: any, dheenga: any): boolean {
    if (Array.isArray(flana)) {
        if (!Array.isArray(dheenga)) return false;
        if (flana.length !== dheenga.length) return false;

        for (const [i, el] of flana.entries()) {
            if (!deepThink(el, dheenga[i])) {
                return false;
            }
        }
    } else if (typeof flana === 'object' && typeof dheenga === 'object') {
        // bcz javascript
        if (flana === null || dheenga === null) {
            return dheenga === null && flana === null;
        }

        // URLSearchParams
        if (flana instanceof URLSearchParams) {
            if (dheenga instanceof URLSearchParams) {
                return deepThink(Object.fromEntries(flana.entries()), Object.fromEntries(dheenga.entries()));
            } else {
                return false;
            }
        }

        // FormData - wesy ye b same e h to koi itna khas mza ni aya kr k pr chlo
        if (flana instanceof FormData) {
            if (dheenga instanceof FormData) {
                return deepThink(Object.fromEntries(flana.entries()), Object.fromEntries(dheenga.entries()));
            } else {
                return false;
            }
        }

        const flania = Object.entries(flana);
        const dheengia = Object.entries(dheenga);
        if (flania.length !== dheengia.length) return false;

        for (const [flaniKey, flaniValue] of flania) {
            if (!(flaniKey in dheenga)) return false; // wo bt e ni

            const dheengiValue = dheenga[flaniKey];
            if (!deepThink(flaniValue, dheengiValue)) {
                return false;
            }
        }
    } else {
        return flana === dheenga;
    }
    return true; // pass
}
