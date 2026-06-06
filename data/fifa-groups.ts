export interface GroupDefinition {
  group: string;
  teams: string[];
}

export const FIFA_GROUPS: GroupDefinition[] = [
  {
    group: "A",
    teams: [
      "Mexico",
      "South Africa",
      "South Korea",
      "Czechia",
    ],
  },
  {
    group: "B",
    teams: [
      "Canada",
      "Switzerland",
      "Qatar",
      "Bosnia and Herzegovina",
    ],
  },
  {
    group: "C",
    teams: [
      "Brazil",
      "Morocco",
      "Scotland",
      "Haiti",
    ],
  },
  {
    group: "D",
    teams: [
      "USA",
      "Paraguay",
      "Australia",
      "Turkey",
    ],
  },
  {
    group: "E",
    teams: [
      "Germany",
      "Ecuador",
      "Ivory Coast",
      "Curaçao",
    ],
  },
  {
    group: "F",
    teams: [
      "Netherlands",
      "Japan",
      "Sweden",
      "Tunisia",
    ],
  },
  {
    group: "G",
    teams: [
      "Belgium",
      "Egypt",
      "Iran",
      "New Zealand",
    ],
  },
  {
    group: "H",
    teams: [
      "Spain",
      "Uruguay",
      "Saudi Arabia",
      "Cape Verde",
    ],
  },
  {
    group: "I",
    teams: [
      "France",
      "Senegal",
      "Norway",
      "Iraq",
    ],
  },
  {
    group: "J",
    teams: [
      "Argentina",
      "Austria",
      "Algeria",
      "Jordan",
    ],
  },
  {
    group: "K",
    teams: [
      "Portugal",
      "Colombia",
      "DR Congo",
      "Uzbekistan",
    ],
  },
  {
    group: "L",
    teams: [
      "England",
      "Croatia",
      "Ghana",
      "Panama",
    ],
  },
];

export function getGroupByTeam(teamName: string) {
  return FIFA_GROUPS.find((group) =>
    group.teams.includes(teamName)
  );
}