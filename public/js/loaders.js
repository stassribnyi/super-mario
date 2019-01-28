export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.src = url;
  });
}

export function loadLevel(lvlName) {
  return fetch(`/levels/${lvlName}.json`).then(result => result.json());
}
