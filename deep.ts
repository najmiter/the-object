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

        for (const Class of specialClasses) {
            if (flana instanceof Class) {
                if (dheenga instanceof Class) {
                    return deepThink(Object.fromEntries(flana.entries()), Object.fromEntries(dheenga.entries()));
                } else {
                    return false;
                }
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

const specialClasses = [URLSearchParams, FormData, Map, Set];
