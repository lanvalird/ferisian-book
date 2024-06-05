import { names } from "../assets/placeholders/names";

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
  return (
    <>
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
          {names
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((name) => (
              <tr key={name.name}>
                <td>{name.name}</td>
                <td>
                  {
                    translate
                      .find((el) => el.lang === lang)
                      ?.genders.find((g) => g.gender === name.gender)?.value
                  }
                  <td>{name.origin}</td>
                  <td>{name.variants.join(", ")}</td>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
