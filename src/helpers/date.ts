export const stringToDate = (dateString: string): Date => {
    const splitted: string[] = dateString.split("/");
    return new Date(
        `${splitted[2]}-${splitted[1].padStart(2, "0")}-${splitted[0].padStart(2, "0")}`
    );
};

export const dateToUnixTimestamp = (date: Date) => {
    return Math.floor(date.getTime() / 1000);
};

export const stringToDateV2 = (dateString?: string | null): Date | null => {
    if (!dateString) return null
    try {
        const splitted: string[] = dateString.split("/");
        const year = splitted[0];
        const month = splitted[1].padStart(2, "0");
        const date = splitted[2].padStart(2, "0");

        if (year.length < 4) throw new Error();
        if (month.length > 2) throw new Error();
        if (date.length > 2) throw new Error();

        return new Date(`${year}-${month}-${date}`);
    } catch (err) {
        throw new Error(err);
    }
};

export const dateToStringV2 = (dateParam: Date): string => {
    try {
        const year = dateParam.getFullYear().toString();
        const month = (dateParam.getMonth() + 1).toString().padStart(2, "0");
        const date = dateParam.getDate().toString().padStart(2, "0");

        return `${year}/${month}/${date}`;
    } catch (err) {
        throw new Error(err);
    }
};
