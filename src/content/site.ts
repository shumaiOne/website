export const SITE_URL = 'https://shumai.one';
export const GITHUB_URL = 'https://github.com/shumaiOne/shumai';
export const DOCS_URL = 'https://docs.shumai.one';
export const DEMO_URL = 'https://staging.shumai.one';
export const DISCORD_URL = 'https://discord.gg/sUzhujK6DD';
export const RELEASES_URL = 'https://github.com/shumaiOne/shumai/releases';
export const DOCKER_HUB_URL = 'https://hub.docker.com/r/shumaione/shumai';

export const docsLink = (path: string): string => `${DOCS_URL}/${path}`;

/** The full all-in-one Docker Compose file (embedding server, 3D renderer, Gotenberg). */
export const COMPOSE_FULL_URL =
  'https://raw.githubusercontent.com/shumaiOne/shumai/main/docker-compose/local/docker-compose.full.yaml';

export const INSTALL_STEPS = [
  `curl -o docker-compose.yaml ${COMPOSE_FULL_URL}`,
  'docker compose up -d',
];

export const INSTALL_COMMAND = INSTALL_STEPS.join(' && ');
