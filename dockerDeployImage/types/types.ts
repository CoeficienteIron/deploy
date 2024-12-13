export type GENRES = 'MALE' | 'FEMALE'

export type EXERCISES = 'PRESS_MILITAR' | 'PRESS_BANCA' | 'PESO_MUERTO' | 'SENTADILLA' | 'DOMINADAS' | 'RUNNING' | 'POTENCIA'

export type CI_GENRE = {
  [key in GENRES]: object;
};

export type CI_BY_GENRE = {
  [key in EXERCISES]: number
}

export type QUARTERS_TYPES = 'FIRST' | 'SECOND' | 'THIRD' | 'FOUR' | 'ALL'


export type STRENGTH_TRAIN_TYPE = '5X5' | '5X3'

export type Quarters = {
  [key in QUARTERS_TYPES]: number[];
};

export type Train = { training: { name: string, type: STRENGTH_TRAIN_TYPE, weight: number } }
