import { useState } from "react";
import { dictionary, type IWord } from "../assets/placeholders/dictionary";
import { replaceSymbolsToFerisian as rs } from "../utils/replaceSymbolsToFerisian";

const i18n = [
  {
    lang: "ru",
    word: "Слово",
    part_of_speech: "Часть речи",
    translate: "Перевод и/или значение",
    gategory: "Категория",
    variants: "Вариации",
    status: "Статус",
    count_words: "Всего базовых слов",
  },
  {
    lang: "fe",
    word: "Ворд",
    part_of_speech: "Парт опв Яßато",
    translate: "Пiрiвод i/iль значiт",
    gategory: "Катiка",
    variants: "Варiанты",
    status: "Статус",
    count_words: "Ненißе стайкны Ворды",
  },
];

export default function Dictionary({ lang }: { lang: string }) {
  if (!lang) lang = "ru";

  const [dictionaryFiltered, setDictionaryFiltered] = useState<IWord[] | []>(
    dictionary
  );

  const [findFilters, setFindFilters] = useState<{
    filter: "word" | "translate" | "gategory" | string;
  }>({ filter: "word" });

  const find = (v: string) => {
    v = v.toLocaleLowerCase();

    switch (findFilters.filter) {
      case "word":
        setDictionaryFiltered(
          dictionary.filter(
            (w) =>
              rs(w.word.toLocaleLowerCase()).includes(rs(v)) ||
              w.variants?.some((vw) =>
                rs(vw.word.toLocaleLowerCase()).includes(v)
              )
          )
        );
        break;

      case "translate":
        setDictionaryFiltered(
          dictionary.filter(
            (w) =>
              rs(w.translate.toLocaleLowerCase()).includes(rs(v)) ||
              w.variants?.some((vw) =>
                rs(vw.translate.toLocaleLowerCase()).includes(v)
              )
          )
        );
        break;

      case "gategory":
        setDictionaryFiltered(
          dictionary.filter(
            (w) =>
              rs(w.gategory?.toLocaleLowerCase() ?? "").includes(rs(v)) ||
              w.variants?.some((vw) =>
                rs(vw.gategory?.toLocaleLowerCase() ?? "").includes(v)
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
          placeholder={i18n.find((el) => el.lang === lang)?.word + "…"}
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
          name={i18n.find((el) => el.lang === lang)?.gategory}
          onChange={(el) => setFindFilters({ filter: el.currentTarget.value })}
        >
          <option value="word">
            {i18n.find((el) => el.lang === lang)?.word}
          </option>
          <option value="translate">
            {i18n.find((el) => el.lang === lang)?.translate}
          </option>
          <option value="gategory">
            {i18n.find((el) => el.lang === lang)?.gategory}
          </option>
        </select>
      </form>
      <p>
        {i18n.find((el) => el.lang === lang)?.count_words}:{" "}
        {dictionaryFiltered.length} /{" "}
        {dictionary.flatMap((w) => w.variants).length}
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">{i18n.find((el) => el.lang === lang)?.word}</th>
            <th scope="col">{i18n.find((el) => el.lang === lang)?.gategory}</th>
            <th scope="col">
              {i18n.find((el) => el.lang === lang)?.part_of_speech}
            </th>
            <th scope="col">
              {i18n.find((el) => el.lang === lang)?.translate}
            </th>
            <th scope="col">{i18n.find((el) => el.lang === lang)?.variants}</th>
            <th scope="col">{i18n.find((el) => el.lang === lang)?.status}</th>
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
              if (!a.prioritySort) return 1;
              if (!b.prioritySort) return -1;

              if (a.prioritySort > b.prioritySort) return 1;
              if (a.prioritySort < b.prioritySort) return -1;

              return 1;
            })
            .sort((a, b) => {
              if (!a.gategory) return 1;
              if (!b.gategory) return -1;
              return a.gategory.localeCompare(b.gategory);
            })
            .map((word) => (
              <RowTable key={word.word} word={word} />
            ))}
        </tbody>
      </table>
      <p>
        {i18n.find((el) => el.lang === lang)?.count_words}:{" "}
        {dictionaryFiltered.length} /
        {dictionary.flatMap((w) => w.variants).length}
      </p>
    </>
  );
}

function RowTable({ word }: { word: IWord }) {
  const [visibleChild, setVisibleChild] = useState(false);

  const Head = () => (
    <tr>
      <td
        colSpan={6}
        style={{
          backgroundColor: "var(--sl-color-accent-low)",
        }}
      >
        <button
          onClick={() => setVisibleChild(!visibleChild)}
          style={{
            width: "100%",
            height: "100%",
            paddingInlineStart: "0.5rem",
            paddingInlineEnd: "0.5rem",
            backgroundColor: "rgba(255,255,255,0)",
            border: "none",
            color: "var(--sl-color-bg-accent)",
            textAlign: "left",
          }}
        >
          <strong>{word.word}</strong> – {(word.variants?.length || 0) + 1}
        </button>
      </td>
    </tr>
  );

  return (
    <>
      {visibleChild && <Head />}
      <tr>
        <td>{word.word}</td>
        <td>{word.gategory ?? ""}</td>
        <td>{word.part_of_speech}</td>
        <td>{word.translate}</td>
        <td style={{ padding: "0" }}>
          {(word.variants?.length || 0) !== 0 && (
            <button
              onClick={() => setVisibleChild(!visibleChild)}
              style={{
                width: "100%",
                height: "100%",
                paddingInlineStart: "0.5rem",
                paddingInlineEnd: "0.5rem",
                backgroundColor: "rgba(255,255,255,0)",
                border: "none",
              }}
            >
              {!visibleChild && "+" + word.variants?.length}
            </button>
          )}
        </td>
        <td>{word.status}</td>
      </tr>
      {visibleChild && (
        <>
          {word.variants?.map((word) => (
            <RowTable key={word.word} word={word} />
          ))}
          <Head />
        </>
      )}
    </>
  );
}
