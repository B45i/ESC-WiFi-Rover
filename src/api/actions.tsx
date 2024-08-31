export enum joystickActions {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
  x = "x",
  y = "y",
}

export const joystickAction = (action: joystickActions) => {
  const url = `/${action}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("Success:", json))
    .catch((error) => console.error("Error:", error));
};
