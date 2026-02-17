export default async function getCharacters(
  urlPage,
  name,
  setCharacters,
  setInfo,
  setTotalPages,
  statusFilter,
  genderFilter,
  speciesFilter,
) {
  const urlPage1 = urlPage * 2 - 1;
  const urlPage2 = urlPage * 2;

  const urls = [
    `https://rickandmortyapi.com/api/character?page=${urlPage1}&name=${name}&status=${statusFilter === "All status" ? "" : statusFilter}&gender=${genderFilter === "All gender" ? "" : genderFilter}&species=${speciesFilter === "All species" ? "" : speciesFilter}`,
    `https://rickandmortyapi.com/api/character?page=${urlPage2}&name=${name}&status=${statusFilter === "All status" ? "" : statusFilter}&gender=${genderFilter === "All gender" ? "" : genderFilter}&species=${speciesFilter === "All species" ? "" : speciesFilter}`,
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((res) => res.json()));
  const allCharacters = data.flatMap((page) => (page.results ? page.results : []));
  const allInfo = data[0].info;

  setCharacters(allCharacters);
  setInfo(allInfo);

  setTotalPages(Math.ceil(allInfo?.count / 40));
}
