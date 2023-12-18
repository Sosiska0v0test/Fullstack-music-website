//supportfunctions.js
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";


export const filters = [
  { id: 1, name: "Джаз", value: "jazz" },
  { id: 2, name: "Рок", value: "rock" },
  { id: 3, name: "Мелодія", value: "melody" },
  { id: 4, name: "Караоке", value: "karoke" },
  { id: 5, name: "Поп", value: "pop" },
  { id: 6, name: "Реп", value: "rap" },
  { id: 7, name: "Хіп-хоп", value: "hip-hop" },
  { id: 8, name: "R&B/Soul", value: "r&b/soul" },
  { id: 9, name: "Класика", value: "classical" },
  { id: 10, name: "Дитячі", value: "children's" },
  { id: 11, name: "Панк", value: "punk" },
  { id: 12, name: "Інді", value: "indie rock" },
  { id: 13, name: "Аніме", value: "anime" },
  { id: 14, name: "Романтичні", value: "romantic" },
  { id: 15, name: "Диско", value: "disco" },
  { id: 16, name: "Хаус", value: "House" },
  { id: 17, name: "Діп-хаус", value: "Deep-House " },
  { id: 18, name: "Тропікал-хаус", value: "tropikal-house" },
  { id: 19, name: "Pитм-н-блюз", value: "Rhythm and blues" },
];

export const filterByLanguage = [
  { id: 1, name: "Українська💙💛", value: "ukrainian" },
  { id: 2, name: "Грузинська", value: "georgian" },
  { id: 3, name: "Польська", value: "polish" },
  { id: 4, name: "Англійська", value: "english" },
  { id: 5, name: "Іспанська", value: "spanish" },
  { id: 6, name: "Французька", value: "french" },
  { id: 7, name: "Турецька", value: "turkish" },
  { id: 8, name: "Естонська ", value: "estonian" },
  { id: 9, name: "Німецька", value: "german" },
  { id: 10, name: "Грецька", value: "greek" },
  { id: 11, name: "Китайська", value: "chinese" },
  { id: 12, name: "Казахська", value: "kazakh" },
  { id: 13, name: "Італійська", value: "italian" },
  { id: 14, name: "Японська", value: "japanese" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
