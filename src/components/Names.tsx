const names = [
  {
    name: "Асеул[а]",
    gender: "all",
    origin: "Аса + Ула",
    variants: ["Аселя"],
  },
  {
    name: "Мiлен[а]",
    gender: "all",
    origin: "Мiлене",
    variants: ["Мiлана, Мiлена"],
  },
  {
    name: "Лайнтер",
    gender: "male",
    origin: "Лайна + Фетер",
    variants: ["Лайнфето, Лайнфетер"],
  },
  {
    name: "Скаярст",
    gender: "male",
    origin: "Скайо + Ярст",
    variants: ["Скай, Скаяст, Кайа"],
  },
  {
    name: "Скайо",
    gender: "male",
    origin: "Скайо",
    variants: ["Скай, Айё"],
  },
  {
    name: "Мiголia",
    gender: "female",
    origin: "Амiгорiа",
    variants: ["Мiга, Голiа, Лiа, Мiлiа, Мiля"],
  },
  {
    name: "Калiн[а]",
    gender: "all",
    origin: "Калiна",
    variants: ["Калiна, Кален, Каль, Каля, Кля"],
  },
  {
    name: "Лайвалайн[а]",
    gender: "all",
    origin: "Лайва + Лайна",
    variants: ["Лайя, Лайвн, Лаван"],
  },
  {
    name: "Iрiс",
    gender: "female",
    origin: "",
    variants: ["Iрс, Рiс, Iрена, Iрi"],
  },
  {
    name: "Вайлепв",
    gender: "all",
    origin: "Вайл, Лепв, Валпв",
    variants: [],
  },
  {
    name: "Ейдж",
    gender: "male",
    origin: "Ейдж",
    variants: ["Ейд"],
  },
  {
    name: "Вiсел[а]",
    gender: "all",
    origin: "Вiселе",
    variants: ["Вiс, Ел, Ель, Вiсi, Iсi"],
  },
  {
    name: "Настiа",
    gender: "female",
    origin: "",
    variants: ["Настя, Стiа, Сiа, Настя, Натiа"],
  },
  {
    name: "Нiколан[а]",
    gender: "all",
    origin: "Нiк, Нiкi, Колан[iа], Ан[iа]",
    variants: [],
  },
  {
    name: "Ремел[iа]",
    gender: "all",
    origin: "Рем, Мел[iа]",
    variants: [],
  },
];

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
        { value: "Женское и Мужское", gender: "all" },
      ],
      origin: "Происхождение",
      variants: "Вариации",
      count_words: "Всего имён",
    },
    {
      lang: "fe",
      name: "Неiм",
      gender: "Генус",
      genders: [
        { value: "Мiзднö", gender: "male" },
        { value: "Девнä", gender: "female" },
        { value: "Девнä i Мiзднö", gender: "all" },
      ],
      origin: "Нюßiно",
      variants: "Варiанты",
      count_words: "Мiлене Неiмы",
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
      <p>
        {translate.find((el) => el.lang === lang)?.count_words}: {names.length}
      </p>
    </>
  );
}
