import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

export const handlers = [
  http.get(`${URL}/ingredients`, () =>
    HttpResponse.json([
      {
        id: '1',
        _id: '111',
        name: 'Слойка',
        type: 'souce',
        proteins: 11,
        fat: 31,
        carbohydrates: 21,
        calories: 31,
        price: 121,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: '222',
        name: 'Булка',
        type: 'top',
        proteins: 12,
        fat: 32,
        carbohydrates: 22,
        calories: 32,
        price: 122,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '333',
        name: 'Икра',
        type: 'greens',
        proteins: 13,
        fat: 33,
        carbohydrates: 23,
        calories: 33,
        price: 123,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ])
  )
];
