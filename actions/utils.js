const isInRangeOf = (a, b, gap = 0.00009) => {
    return a < b + gap || a > b - gap;
};

export const spaceLongitudeAndLatitude = (els, spaceGap = 0.00005) => {
    const elements = [...els];
    const results = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let updatedElementCount = 0;

        if (element.done) continue;

        if (!element.coords) {
            element.done = true;
            results[i] = element;
            continue;
        }

        for (let j = i + 1; j < elements.length; j++) {
            const otherElement = elements[j];

            if (!otherElement.coords) {
                otherElement.done = true;
                results[j] = otherElement;
                continue;
            }

            if (
                element.coords.latitude !== otherElement.coords.latitude ||
                element.coords.longitude !== otherElement.coords.longitude
            )
                continue;

            otherElement.done = true;

            const gap = spaceGap * (Math.floor(updatedElementCount / 8) + 1);

            switch (updatedElementCount % 8) {
                case 0:
                    otherElement.coords.latitude += gap;
                    break;
                case 1:
                    otherElement.coords.longitude += gap;
                    break;
                case 2:
                    otherElement.coords.latitude -= gap;
                    break;
                case 3:
                    otherElement.coords.longitude -= gap;
                    break;
                case 4:
                    otherElement.coords.latitude += gap;
                    otherElement.coords.longitude += gap;
                    break;
                case 5:
                    otherElement.coords.latitude -= gap;
                    otherElement.coords.longitude -= gap;
                    break;
                case 6:
                    otherElement.coords.latitude += gap;
                    otherElement.coords.longitude -= gap;
                    break;
                case 7:
                    otherElement.coords.latitude -= gap;
                    otherElement.coords.longitude += gap;
                    break;
            }

            updatedElementCount++;
            results[j] = otherElement;
        }

        element.done = true;

        results[i] = element;
    }

    for (let i = 0; i < results.length; i++) {
        delete results[i].done;
    }

    return results;
};
