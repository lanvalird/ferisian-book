import { useState } from "react";
import { names, type IName } from "../assets/placeholders/names";

export default function Names({ lang }: { lang: string }) {
  if (!lang) lang = "ru";
  const translate = [
    {
      lang: "ru",
      name: "Имя",
      gender: "Пол",
      genders: [
        { value: "Мужское", gender: "male" },
        { value: "Женское", gender: "female" },
        { value: "Нейтральное", gender: "neutral" },
      ],
      origin: "Происхождение",
      variants: "Вариации",
      count_words: {
        all: "Всего имён",
        neutral: "Нейтральные",
        male: "Мужских",
        female: "Женских",
      },
    },
    {
      lang: "fe",
      name: "Неiм",
      gender: "Генус",
      genders: [
        { value: "Мiзднü", gender: "male" },
        { value: "Девнü", gender: "female" },
        { value: "Нейтральнü", gender: "neutral" },
      ],
      origin: "Нюßiно",
      variants: "Варiанты",
      count_words: {
        all: "Ненißе Неiмы",
        neutral: "Нейтральны",
        male: "Мiздны",
        female: "Девны",
      },
    },
  ];

  const [namesFiltered, setNamesFiltered] = useState<IName[] | []>(names);

  const [findFilters, setFindFilters] = useState<{
    filter: "name" | "variants" | "all" | string;
  }>({ filter: "all" });

  const find = (v: string) => {
    const replaceSymbols = (s: string) => {
      const rs: { symbol: string; replace: string }[] = [
        { symbol: "ß", replace: "сс" },
        { symbol: "ш", replace: "сс" },
        { symbol: "ф", replace: "пв" },
        { symbol: "и", replace: "i" },
        { symbol: "ж", replace: "зз" },
        { symbol: "[", replace: "" },
        { symbol: "]", replace: "" },
      ];

      rs.forEach((rs) => (s = s.replaceAll(rs.symbol, rs.replace)));
      return s;
    };
    v = replaceSymbols(v.toLocaleLowerCase());

    switch (findFilters.filter) {
      case "name":
        setNamesFiltered(
          names.filter((w) =>
            replaceSymbols(w.name.toLocaleLowerCase()).includes(v)
          )
        );
        break;

      case "variants":
        setNamesFiltered(
          names.filter((w) =>
            w.variants.some((vw) =>
              replaceSymbols(vw.toLocaleLowerCase()).includes(v)
            )
          )
        );
        break;

      case "all":
        setNamesFiltered(
          names.filter(
            (w) =>
              replaceSymbols(w.name.toLocaleLowerCase()).includes(v) ||
              w.variants.some((vw) =>
                replaceSymbols(vw.toLocaleLowerCase()).includes(v)
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
          placeholder={translate.find((el) => el.lang === lang)?.name + "…"}
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
          name={translate.find((el) => el.lang === lang)?.name}
          onChange={(el) => setFindFilters({ filter: el.currentTarget.value })}
        >
          <option value="all">
            {translate.find((el) => el.lang === lang)?.name}+
            {translate.find((el) => el.lang === lang)?.variants}
          </option>
          <option value="name">
            {translate.find((el) => el.lang === lang)?.name}
          </option>
          <option value="variants">
            {translate.find((el) => el.lang === lang)?.variants}
          </option>
        </select>
      </form>
      <p>
        {translate.find((el) => el.lang === lang)?.count_words.all}:{" "}
        {namesFiltered.length} / {names.length}
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.name}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.gender}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.origin}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.variants}
            </th>
          </tr>
        </thead>
        <tbody>
          {namesFiltered
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((name, i, arr) => (
              <>
                {(i === 0 || arr[i].name[0] !== arr[i - 1].name[0]) && (
                  <tr
                    style={{
                      backgroundColor: "var(--sl-color-bg)",
                    }}
                    key={arr[i].name[0]}
                  >
                    <td
                      colSpan={4}
                      style={{
                        color: "var(--sl-color-gray-3)",
                        fontWeight: "bold",
                      }}
                    >
                      {arr[i].name[0]}
                    </td>
                  </tr>
                )}
                <tr key={name.name}>
                  <td>{name.name}</td>
                  <td>
                    {
                      translate
                        .find((el) => el.lang === lang)
                        ?.genders.find((g) => g.gender === name.gender)?.value
                    }
                  </td>
                  <td>{name.origin}</td>
                  <td>{name.variants.join(", ")}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      {namesFiltered.length !== names.length && (
        <p>
          {translate.find((el) => el.lang === lang)?.count_words.all}:{" "}
          {namesFiltered.length} / {names.length}
        </p>
      )}
      <table>
        <thead>
          <tr>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.count_words.all}:{" "}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.count_words.neutral}:{" "}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.count_words.male}:{" "}
            </th>
            <th scope="col">
              {translate.find((el) => el.lang === lang)?.count_words.female}:{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{names.length}</td>
            <td>{names.filter((n) => n.gender === "neutral").length}</td>
            <td>{names.filter((n) => n.gender === "male").length}</td>
            <td>{names.filter((n) => n.gender === "female").length}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
