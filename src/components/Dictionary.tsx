import { useState } from "react";
import { dictionary } from "../assets/placeholders/dictionary";

export interface IWord {
  word: string;
  part_of_speech:
    | "Эмотикы"
    | "Местоимение"
    | "Существительное"
    | "Предлог"
    | "Глагол"
    | "Глагол (вспомогательная часть)"
    | "Прилагательное"
    | "Наречие"
    | "Неопределённость"
    | "Числительное";
  variants?: IWord[];
  gategory?: string;
  sort?: number;
  translate: string;
  status: "Актуально" | "Винтаж" | "Не актуально";
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
      variants: "Вариации",
      status: "Статус",
      count_words: "Всего слов",
    },
    {
      lang: "fe",
      word: "Ворд",
      part_of_speech: "Парт опв Яßато",
      translate: "Пiрiвод i/iль значiт",
      gategory: "Катiка",
      variants: "Варiанты",
      status: "Статус",
      count_words: "Ненißе Ворды",
    },
  ];
  const [dictionaryFiltered, setDictionaryFiltered] = useState<IWord[] | []>(
    dictionary
  );

  const [findFilters, setFindFilters] = useState<{
    filter: "word" | "translate" | "gategory" | string;
  }>({ filter: "word" });

  const find = (v: string) => {
    const replaceSymbols = (s: string) => {
      const rs: { symbol: string; replace: string }[] = [
        { symbol: "ß", replace: "сс" },
        { symbol: "ф", replace: "пв" },
        { symbol: "и", replace: "i" },
      ];

      rs.forEach((rs) => (s = s.replaceAll(rs.symbol, rs.replace)));
      return s;
    };
    v = v.toLocaleLowerCase();

    switch (findFilters.filter) {
      case "word":
        setDictionaryFiltered(
          dictionary.filter((w) =>
            replaceSymbols(w.word.toLocaleLowerCase()).includes(
              replaceSymbols(v)
            )
          )
        );
        break;

      case "translate":
        setDictionaryFiltered(
          dictionary.filter((w) =>
            replaceSymbols(w.translate.toLocaleLowerCase()).includes(
              replaceSymbols(v)
            )
          )
        );
        break;

      case "gategory":
        setDictionaryFiltered(
          dictionary.filter((w) =>
            replaceSymbols(w.gategory?.toLocaleLowerCase() ?? "").includes(
              replaceSymbols(v)
            )
          )
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <input
          type="text"
          onChange={(el) => find(el.currentTarget.value)}
          placeholder={translate.find((el) => el.lang === lang)?.word + "…"}
          style={{
            marginRight: "1rem",

            border: "1px solid var(--sl-color-gray-5)",
            borderRadius: "0.5rem",
            paddingInlineStart: "0.75rem",
            paddingInlineEnd: "1rem",
            backgroundColor: "var(--sl-color-black)",
            color: "var(--sl-color-gray-2)",
            fontSize: "var(--sl-text-sm)",
            width: "100%",
            // maxWidth: "22rem",
          }}
        />
        <select
          style={{
            border: "1px solid var(--sl-color-gray-5)",
            borderRadius: "0.5rem",
            paddingInlineStart: "0.75rem",
            paddingInlineEnd: "1rem",
            backgroundColor: "var(--sl-color-black)",
            color: "var(--sl-color-gray-2)",
            fontSize: "var(--sl-text-sm)",
            width: "100%",
            maxWidth: "12rem",
          }}
          name={translate.find((el) => el.lang === lang)?.gategory}
          onChange={(el) => setFindFilters({ filter: el.currentTarget.value })}
        >
          <option value="word">
            {translate.find((el) => el.lang === lang)?.word}
          </option>
          <option value="translate">
            {translate.find((el) => el.lang === lang)?.translate}
          </option>
          <option value="gategory">
            {translate.find((el) => el.lang === lang)?.gategory}
          </option>
        </select>
      </form>
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
            {/* <th scope="col">
              {translate.find((el) => el.lang === lang)?.variants}
            </th> */}
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
                "Местоимение",
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
              if (!a.sort) return 1;
              if (!b.sort) return -1;

              if (a.sort > b.sort) return 1;
              if (a.sort < b.sort) return -1;

              return 1;
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
                {/* <td>{word.variants?.map((v) => v.word) ?? ""}</td> */}
                <td>{word.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>
        {translate.find((el) => el.lang === lang)?.count_words}:{" "}
        {dictionaryFiltered.length} / {dictionary.length}
      </p>
    </>
  );
}
