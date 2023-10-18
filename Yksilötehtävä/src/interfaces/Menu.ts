interface Menu {
  courses: Course[],
}

interface Course {
  price: string;
  name: string;
  diets: string[];
}

export type {Menu}


interface MenuWeekly {
  days: Array<{ courses: Course[], day: string }>
}


export type {MenuWeekly}
