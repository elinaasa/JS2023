interface Menu {
    courses: Course[],

}
interface Course {
    name: string,
    diets: string[],
    price: number,
}

export type {Menu};
