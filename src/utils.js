export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function shuffle(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let isSleepPrevented = false;
export function preventSleep() {
  if ("wakeLock" in navigator && !isSleepPrevented) {
    isSleepPrevented = true;
    document.addEventListener(
      "click",
      () => {
        navigator.wakeLock.request("screen");
      },
      { once: true },
    );
  }
}

export function today() {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
