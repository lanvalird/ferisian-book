import { useState } from "react";
import { dictionary } from "../assets/placeholders/dictionary";

export interface IWord {
  word: string;
  part_of_speech:
    | "Эмотикы"
    | "Существительное"
    | "Предлог"
    | "Глагол"
    | "Глагол (вспомогательная часть)"
    | "Прилагательное"
    | "Наречие"
    | "Неопределённость"
    | "Числительное";
  gategory?: string;
  translate: string;
  status: string;
}

export default function Dictionary({ lang }: { lang: string }) {
  if (!lang) lang = "ru";
  const translate = [
    {
      lang: "ru",
      word: "Слово",
      part_of_speech: "Часть речи",
      translate: "Перевод и/или значение",
      gategory: "Категория",
      status: "Статус",
      count_words: "Всего слов",
    },
    {
      lang: "fe",
      word: "Ворд",
      part_of_speech: "Парт оф Яßато",
      translate: "Пiрiвод i/iль значiт",
      gategory: "Катiка",
      status: "Статус",
      count_words: "Мiлене Ворды",
    },
  ];
  const [dictionaryFiltered, setDictionaryFiltered] = useState<IWord[] | []>(
    dictionary
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.word}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.gategory}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.part_of_speech}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.translate}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.status}
            </th>
          </tr>
        </thead>
        <tbody>
          {dictionaryFiltered
            .sort((a, b) => {
              const pss = [
                "Эмотикы",
                "Существительное",
                "Предлог",
                "Глагол",
                "Глагол (вспомогательная часть)",
                "Прилагательное",
                "Наречие",
                "Неопределённость",
                "Числительное",
              ];
              let res =
                pss.indexOf(a.part_of_speech) - pss.indexOf(b.part_of_speech);
              if (res === 0) {
                res = a.word.localeCompare(b.word);
              }
              return res;
            })
            .sort((a, b) => {
              if (!a.gategory) return 1;
              if (!b.gategory) return -1;
              return a.gategory.localeCompare(b.gategory);
            })
            .map((word) => (
              <tr key={word.word}>
                <td>{word.word}</td>
                <td>{word.gategory ?? ""}</td>
                <td>{word.part_of_speech}</td>
                <td>{word.translate}</td>
                <td>{word.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>
        {translate.find((el) => el.lang === lang)?.count_words}:{" "}
        {dictionaryFiltered.length}
      </p>
    </>
  );
}
